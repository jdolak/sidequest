from flask import Blueprint, jsonify, g, session, request, Response
from sqlalchemy import inspect
from sqlalchemy.orm import sessionmaker, scoped_session

from sqapp  import DB, LOG
from sqapp.db import sql_many, sql_one
from sqapp.src.uploads import S3_CLIENT

main_bp = Blueprint('main', __name__)

SessionFactory = sessionmaker(bind=DB)
DB_session = scoped_session(SessionFactory)

"""
API endpoints:
- /quests/<int:quest_id>
- /quests
- /quests/open
- /quests/author_id/<int:author_id> * will be depreciated in favor of account variable
- /quests/accepted
- /quests/accepted/<int:user_id> * will be depreciated in favor of account variable
- /users/<int:user_id>
- /users
- /groups/<int:group_id> * will be depreciated in favor of account variable
- /groups
- /groups_user/<int:group_id>/<int:user_id>
- /groups_user
- /bought_bets/<int:bet_id>/<int:buyer_id>
- /bought_bets
- /quest_submissions/<int:submission_id>
- /quest_submissions
"""

@main_bp.route("/")
def home():
    return "<h1>Sidequest API</h1>"

@main_bp.before_request
def start_session():
    g.db_session = DB_session()

    user_id = session.get('user_id')
    if user_id:
        g.user = user_id
    else:
        g.user = None

@main_bp.teardown_request
def cleanup_session(exception):
    try:
        if exception:
            g.db_session.rollback()
        else:
            g.db_session.commit()
    finally:
        g.db_session.close()

@main_bp.route("/quests/<int:quest_id>", methods=["GET"])
def get_quest_id(quest_id):
    return sql_one(g.db_session, "SELECT * FROM QUESTS WHERE quest_id = :quest_id", {"quest_id": quest_id})

@main_bp.route("/quests", methods=["GET"])
def get_quest():
    return sql_many(g.db_session, "SELECT * FROM QUESTS", None)

@main_bp.route("/quests/accepted/<int:user_id>", methods=["GET"])
def get_quest_accepted_user(user_id):
    return sql_many(g.db_session, "SELECT * FROM QUESTS q, QUEST_SUBMISSIONS qs WHERE qs.user_id = :user_id AND qs.status = 'Accepted' AND q.quest_id = qs.quest_id", {"user_id": user_id})

@main_bp.route("/quests/accepted", methods=["GET"])
def get_quest_accepted():
    return sql_many(g.db_session, "SELECT * FROM QUESTS q, QUEST_SUBMISSIONS qs WHERE qs.status = 'Accepted' AND q.quest_id = qs.quest_id", None)

@main_bp.route("/quests/author_id/<int:author_id>", methods=["GET"])
def get_quest_user(author_id):
    return sql_many(g.db_session, "SELECT * FROM QUESTS q WHERE q.author_id = :author_id", {"author_id": author_id})

@main_bp.route("/quests/open", methods=["GET"])
def get_quest_open():
    return sql_many(g.db_session, "SELECT * FROM QUESTS WHERE quest_status = 'Open'", None)

@main_bp.route("/users/<int:user_id>", methods=["GET"])
def get_user_id(user_id):
    return sql_one(g.db_session, "SELECT * FROM USERS WHERE user_id = :user_id", {"user_id": user_id})

@main_bp.route("/users", methods=["GET"])
def get_users():
    return sql_many(g.db_session, "SELECT * FROM USERS", None)

@main_bp.route("/groups/<int:group_id>", methods=["GET"])
def get_group_id(group_id):
    return sql_one(g.db_session, "SELECT * FROM GROUPS WHERE group_id = :group_id", {"group_id": group_id})

@main_bp.route("/groups", methods=["GET"])
def get_groups():
    return sql_many(g.db_session, "SELECT * FROM GROUPS", None)

@main_bp.route("/groups_user/<int:group_id>/<int:user_id>", methods=["GET"])
def get_group_user(user_id, group_id):
    sql = "SELECT * FROM GROUPS_USER gu, USERS u WHERE gu.user_id = :user_id AND gu.group_id = :group_id AND gu.user_id = u.user_id"
    return sql_one(g.db_session, sql, {"user_id": user_id, "group_id": group_id})

@main_bp.route("/groups_user", methods=["GET"])
def get_all_groups_user():
    return sql_many(g.db_session, "SELECT * FROM GROUPS_USER gu, USERS u WHERE gu.user_id = u.user_id", None)

@main_bp.route("/bets/<int:bet_id>", methods=["GET"])
def get_bet_id(bet_id):
    return sql_one(g.db_session, "SELECT bet_id, group_id, seller_id, user_name, question  FROM AVAILABLE_BETS b, USERS u WHERE bet_id = :bet_id AND b.seller_id = u.user_id", {"bet_id": bet_id})

@main_bp.route("/bets", methods=["GET"])
def get_bets():
    return sql_many(g.db_session, "SELECT bet_id, group_id, seller_id, user_name, question FROM AVAILABLE_BETS b, USERS u WHERE b.seller_id = u.user_id", None)

@main_bp.route("/bought_bets/<int:bet_id>/<int:buyer_id>", methods=["GET"])
def get_bought_bet(buyer_id, bet_id):
    sql = "SELECT buyer_id, user_name, bet_id, quantity, result, date_bought, date_resolved FROM BOUGHT_BETS AND USERS WHERE buyer_id = :buyer_id AND bet_id = :bet_id AND buyer_id = user_id"
    return sql_one(g.db_session, sql, {"buyer_id": buyer_id, "bet_id": bet_id})

@main_bp.route("/bought_bets", methods=["GET"])
def get_all_bought_bets():
    return sql_many(g.db_session, "SELECT buyer_id, user_name, bet_id, quantity, result, date_bought, date_resolved FROM BOUGHT_BETS, USERS WHERE buyer_id = user_id", None)

@main_bp.route("/quest_submissions/<int:submission_id>", methods=["GET"])
def get_quest_submission_id(submission_id):
    return sql_one(g.db_session, "SELECT submission_id, u.user_id, user_name, quest_id, submission_photo, submission_date_time, status FROM QUEST_SUBMISSIONS q, USERS u WHERE submission_id = :submission_id AND q.user_id = u.user_id", {"submission_id": submission_id})

@main_bp.route("/quest_submissions", methods=["GET"])
def get_all_quest_submissions():
    return sql_many(g.db_session, "SELECT submission_id, u.user_id, user_name, quest_id, submission_photo, submission_date_time, status FROM QUEST_SUBMISSIONS q, USERS u WHERE q.user_id = u.user_id", None)

@main_bp.route('/quest-upload', methods=['POST'])
def upload():
    file = request.files['file']
    S3_CLIENT.upload_fileobj(file, 'quest-submissions', file.filename)
    return Response(status=201)

@main_bp.route("/debug")
def test_db():
    inspector = inspect(DB)
    return jsonify({"tables": inspector.get_table_names()})
