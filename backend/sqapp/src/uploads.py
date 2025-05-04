import boto3
from PIL import Image
import io
import magic
from flask import g, jsonify
from dotenv import load_dotenv
import os
from sqlalchemy import text
from time import time
from sqapp import LOG
from urllib.parse import urlparse, urlunparse
import secrets
from sqapp.db import sql_many


load_dotenv()

S3_CLIENT = boto3.client(
    's3',
    endpoint_url='http://sidequest-sq-s3-1:9000', 
    aws_access_key_id=os.getenv('S3_ACCESS_KEY'),
    aws_secret_access_key=os.getenv('S3_SECRET_KEY',),
)

ALLOWED_MIME = {'image/jpeg', 'image/png', 'image/webp', 'image/heic'}


def get_upload_url(filename):

    if not filename:
        return None
    
    url = S3_CLIENT.generate_presigned_url(
        'get_object',
        Params={'Bucket': 'uploads', 'Key': filename},
        ExpiresIn=3600  # 1 hour
    )
    return rewrite_url_host(url)

def allowed_file(file):
    mime = magic.from_buffer(file.read(2048), mime=True)
    file.seek(0)
    return mime in ALLOWED_MIME

def upload_file(file, id, name=None):

    try:
        if not allowed_file(file):
            LOG.error("File type not allowed")
            return None
        
        img = Image.open(file.stream)
        img = img.convert('RGB')
        img.thumbnail((720, 720))
        buffer = io.BytesIO()
        img.save(buffer, format='JPEG', quality=85)
        buffer.seek(0)

        # Create safe filename
        internal_filename = f"{g.user}-{id}{name}.jpg"

        S3_CLIENT.upload_fileobj(buffer, 'uploads', internal_filename, ExtraArgs={'ContentType': 'image/jpeg'})

    except Exception as e:
        LOG.error(f"Error uploading file: {e}")
        return None
    
    return internal_filename

def quest_submission(rq, quest_id):
    image = None
    if 'file' in rq.files:
        image = upload_file(rq.files['file'], quest_id)
        
    sql = "INSERT INTO quest_submissions (quest_id, user_id, submission_photo, submission_date_time, comments, status) VALUES (:quest_id, :user_id, :submission_photo, :submission_date_time, :comments, :status)"
    g.db_session.execute(text(sql), {
        'quest_id': quest_id,
        'user_id': g.user,
        'submission_photo': image,
        'submission_date_time': time(),
        'comments': rq.form['comment'],
        'status': 'submitted'
    })

    if 'file' in rq.files and not image:
        return jsonify({"message": "submission created, error uploading file"}), 500
    
    return jsonify({"message": "submission created"}), 201


def rewrite_url_host(url):
    parsed = urlparse(url)
    new_url = urlunparse(parsed._replace(netloc="sq.jdolak.com", scheme='https'))
    return new_url

def create_quest(rq):
    try:
        data = rq.get_json()

        group_id = data['groupID']
        quest_title = data['questname']
        quest_desc = data['questdesc']
        reward_amount = data['questreward']
        due_date = data['questdate']
        
        if not group_id or not quest_title or not reward_amount:
            return jsonify({"message": "missing parameters"}), 400

        if not g.user:
            return jsonify({"message": "User not logged in"}), 401

        sql = "INSERT INTO quests (group_id, author_id, quest_title, quest_desc, reward_amount, due_date, quest_status) VALUES (:group_id, :author_id, :quest_title, :quest_desc, :reward_amount, TO_DATE(:due_date, 'yyyy-mm-dd'), :quest_status)"
        g.db_session.execute(text(sql), {
            'group_id': group_id,
            'author_id': g.user,
            'quest_title': quest_title,
            'quest_desc': quest_desc,
            'reward_amount': reward_amount,
            'due_date': due_date,
            'quest_status': 'Open'
        })
        return jsonify({"message": "quest created"}), 201
    
    except Exception as e:
        LOG.error(f"Error creating quest: {e}")
        g.db_session.rollback()
        return jsonify({"message": "error creating quest"}), 500
    

def create_bet(rq):
    try:
        data = rq.get_json()

        group_id = data['groupID']
        question = data['betname']
        description = data['betdesc']
        max_quantity = data['betquantity']
        odds = data['betodds']
        if data['betposition'] == 'yes':
            side = 'Y'
        else:
            side = 'N'

        if not group_id or not question or not max_quantity or not side or not odds:
            LOG.error(f"Missing parameters: {group_id}, {question}, {description}, {max_quantity}, {side}, {odds}")
            return jsonify({"message": "missing parameters"}), 400

        if not g.user:
            LOG.error("User not logged in")
            return jsonify({"message": "User not logged in"}), 401

        sql = "INSERT INTO available_bets (group_id, seller_id, max_quantity, side, odds, question, description, status) VALUES (:group_id, :seller_id, :max_quantity, :side, :odds, :question, :description, :status)"
        g.db_session.execute(text(sql), {
            'group_id': group_id,
            'seller_id': g.user,
            'max_quantity': max_quantity,
            'side': side,
            'odds': odds,
            'question': question,
            'description': description,
            'status': 'Open'
        })

        LOG.info(f"Bet created: {question}, {description}, {max_quantity}, {side}, {odds}")
        return jsonify({"message": "bet created"}), 201
    
    except Exception as e:
        LOG.error(f"Error creating bet: {e}")
        g.db_session.rollback()
        return jsonify({"message": "error creating bet"}), 500
    
def create_group(rq):
    try:
        data = rq.get_json()

        group_name = data['groupname']
        group_desc = data['groupdesc']
        public = data.get('groupvisibility', 'Y')
        default_currency = data.get('groupcoins', '1000')

        if not group_name or not group_desc or not public:
            LOG.error(f"Missing parameters: {group_name}, {group_desc}, {public}")
            return jsonify({"message": "missing parameters"}), 400

        if not g.user:
            LOG.error("User not logged in")
            return jsonify({"message": "User not logged in"}), 401
        
        invite_code = secrets.token_urlsafe(24)

        sql = "INSERT INTO SQ_GROUPS (group_name, group_desc, is_public, invite_code, default_currency) VALUES (:group_name, :group_desc, :public, :invite_code, :default_currency)"
        g.db_session.execute(text(sql), {
            'group_name': group_name,
            'group_desc': group_desc,
            'public': public,
            'invite_code': invite_code,
            'default_currency': default_currency
        })
        LOG.info(f"Group created: {group_name}, {group_desc}, {public}, {invite_code}")

        sql = "INSERT INTO SQ_GROUPS_USER (user_id, group_id, currency) VALUES (:user_id, (SELECT group_id FROM SQ_GROUPS WHERE group_name = :group_name), :currency)"
        g.db_session.execute(text(sql), {
            'user_id': g.user,
            'group_name': group_name,
            'currency': default_currency
        })
        LOG.info(f"User {g.user} added to group {group_name}")
        return jsonify({"message": "group created"}), 201
    
    except Exception as e:
        LOG.error(f"Error creating group: {e}")
        g.db_session.rollback()
        return jsonify({"message": "error creating group"}), 500
    
def bet_resolve(rq):
    try:

        data = rq.get_json()

        if not data:
            return jsonify({"message": "missing parameters"}), 400
        if not g.user:
            return jsonify({"message": "User not logged in"}), 401
        if 'bet_id' not in rq.form or 'winning_side' not in rq.form:
            return jsonify({"message": "missing parameters"}), 400
        
        bet_id = data['bet_id']
        winning_side = data['winning_side']
        #bet_id = rq.form['bet_id']
        #winning_side = rq.form['winning_side']
        sql = "SELECT * FROM available_bets ab JOIN BOUGHT_BETS bb ON ab.bet_id = bb.bet_id WHERE bet_id = :bet_id"
        data = sql_many(g.db_session, sql, {'bet_id': bet_id})
        if not data:
            return jsonify({"message": "bet not found"}), 404
        
        coins = data[0]["bb.quantity"] * 100

        if data[0]["ab.side"] == winning_side:
            winner = data[0]["ab.seller_id"]
        else:
            winner = data[0]["bb.buyer_id"]

        sql = "UPDATE SQ_GROUPS_USER SET currency = currency + :coins WHERE user_id = :user_id AND group_id = :group_id"
        g.db_session.execute(text(sql), {
            'coins': coins,
            'user_id': winner,
            'group_id': data[0]["ab.group_id"]
        })
            
        sql = "UPDATE available_bets SET status = 'Resolved' WHERE bet_id = :bet_id"
        g.db_session.execute(text(sql), {'bet_id': bet_id})

        LOG.info(f"Bet {bet_id} resolved. Winner: {winner}, Coins: {coins}")

        return jsonify({"message": "bet resolved"}), 200
    
    except Exception as e:
        LOG.error(f"Error resolving bet: {e}")
        g.db_session.rollback()
        return jsonify({"message": "error resolving bet"}), 500

def accept_bet(rq):
    try:
        data = rq.get_json()
        bet_id = data['bet_id']
        quantity = data['quantity']
        side = data['side']
        status = data['status']

        sql = "INSERT INTO BOUGHT_BETS (buyer_id, bet_id, quantity, side, status) VALUES (:buyer_id, :bet_id, :quantity, :side, :status)"
        g.db_session.execute(text(sql), {
            'buyer_id': g.user,
            'bet_id': bet_id,
            'quantity': quantity,
            'side': side,
            'status': status
        })

        sql = "UPDATE available_bets SET max_quantity = max_quantity - :quantity WHERE bet_id = :bet_id"
        g.db_session.execute(text(sql), {
            'quantity': quantity,
            'bet_id': bet_id
        })

        LOG.info(f"Bet {bet_id} accepted. Buyer: {g.user}, Quantity: {quantity}, Side: {side}")

        return jsonify({"message": "bet accepted"}), 200
    
    except Exception as e:
        LOG.error(f"Error accepting bet: {e}")
        g.db_session.rollback()
        return jsonify({"message": "error accepting bet"}), 500


