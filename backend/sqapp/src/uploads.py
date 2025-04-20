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

def upload_file(file, quest_id):

    try:
        if not allowed_file(file):
            LOG.error(f"File type not allowed")
            return None
        
        img = Image.open(file.stream)
        img = img.convert('RGB')
        img.thumbnail((720, 720))
        buffer = io.BytesIO()
        img.save(buffer, format='JPEG', quality=85)
        buffer.seek(0)

        # Create safe filename
        internal_filename = f"{g.user}-{quest_id}.jpg"

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







