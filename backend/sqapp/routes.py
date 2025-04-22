from flask import Blueprint, jsonify, g, session, request, Response
from sqlalchemy import inspect
from sqlalchemy.orm import sessionmaker, scoped_session

from sqapp  import DB, LOG
from sqapp.db import sql_many, sql_one, sql_response
from sqapp.src.uploads import quest_submission, get_upload_url

from sqapp.src.auth import register_user, login_user, logout_user, process_invite

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
- /groups/search/<query>
- /groups/my_groups
- /groups_user/<int:group_id>/<int:user_id>
- /groups_user
- /bought_bets/<int:bet_id>/<int:buyer_id>
- /bought_bets
- /quest_submissions/<int:submission_id>
- /quest_submissions
- /quest_submit/<int:quest_id>
- /register
- /login
- /logout
- /whoami
- /debug
"""

@main_bp.route("/")
def home():
    return "<h1>Sidequest API</h1>"

@main_bp.before_request
def start_session():
    g.db_session = DB_session()

    user_id = session.get('sq_user_id')
    if user_id:
        g.user = user_id
    else:
        g.user = None

@main_bp.teardown_request
def cleanup_session(exception):
    try:
        if exception:
            LOG.error(f"Exception occurred, rolling back: {exception}")
            g.db_session.rollback()
        else:
            g.db_session.commit()
    finally:
        g.db_session.close()

@main_bp.route("/quests/<int:quest_id>", methods=["GET"])
def get_quest_id(quest_id):
    return sql_response(sql_one(g.db_session, "SELECT * FROM QUESTS WHERE quest_id = :quest_id", {"quest_id": quest_id}))

@main_bp.route("/quests", methods=["GET"])
def get_quest():
    return sql_response(sql_many(g.db_session, "SELECT * FROM QUESTS", None))

@main_bp.route("/quests/accepted/<int:user_id>", methods=["GET"])
def get_quest_accepted_user(user_id):
    return sql_response(sql_many(g.db_session, "SELECT * FROM QUESTS q, QUEST_SUBMISSIONS qs WHERE qs.user_id = :user_id AND qs.status = 'Accepted' AND q.quest_id = qs.quest_id", {"user_id": user_id}))

@main_bp.route("/quests/accepted", methods=["GET"])
def get_quest_accepted():
    return sql_response(sql_many(g.db_session, "SELECT * FROM QUESTS q, QUEST_SUBMISSIONS qs WHERE qs.status = 'Accepted' AND q.quest_id = qs.quest_id", None))

# deprecated in favor of /quests/my_quests
#@main_bp.route("/quests/author_id/<int:author_id>", methods=["GET"])
#def get_quest_user(author_id):
#    return sql_response(sql_many(g.db_session, "SELECT * FROM QUESTS q WHERE q.author_id = :author_id", {"author_id": author_id}))

@main_bp.route("/quests/my_quests", methods=["GET"])
def get_my_quest():
    return sql_response(sql_many(g.db_session, "SELECT * FROM QUESTS q WHERE q.author_id = :author_id", {"author_id": g.user}))

@main_bp.route("/quests/open", methods=["GET"])
def get_quest_open():
    return sql_response(sql_many(g.db_session, "SELECT * FROM QUESTS WHERE quest_status = 'Open'", None))

# deprecated in favor of /users/my_user
#@main_bp.route("/users/<int:user_id>", methods=["GET"])
#def get_user_id(user_id):
#    return sql_response(sql_one(g.db_session, "SELECT user_id, username FROM USERS WHERE user_id = :user_id", {"user_id": user_id}))

@main_bp.route("/users/my_user", methods=["GET"])
def get_my_user():
    return sql_response(sql_one(g.db_session, "SELECT user_id, username FROM USERS WHERE user_id = :user_id", {"user_id": g.user}))

# will be disabled in prod
@main_bp.route("/users", methods=["GET"])
def get_users():
    return sql_response(sql_many(g.db_session, "SELECT user_id, username FROM USERS", None))

@main_bp.route("/groups/<int:group_id>", methods=["GET"])
def get_group_id(group_id):
    return sql_response(sql_one(g.db_session, "SELECT * FROM GROUPS WHERE group_id = :group_id", {"group_id": group_id}))

@main_bp.route("/groups", methods=["GET"])
def get_groups():
    return sql_response(sql_many(g.db_session, "SELECT * FROM GROUPS WHERE public = 'Y'", None))

@main_bp.route("/groups/search/<query>", methods=["GET"])
def search_groups(query):
    pattern = f"%{query}%"
    return sql_response(sql_many(g.db_session, "SELECT * FROM GROUPS WHERE public = 'Y' AND (group_name LIKE :pattern OR group_desc LIKE :pattern)", {"pattern": pattern}))

@main_bp.route("/groups/my_groups", methods=["GET"])
def get_my_groups():
    return sql_response(sql_many(g.db_session, "SELECT * FROM GROUPS NATURAL JOIN GROUPS_USER WHERE user_id = :user_id", {"user_id": g.user}))

@main_bp.route("/groups_user/<int:group_id>/<int:user_id>", methods=["GET"])
def get_group_user(user_id, group_id):
    sql = "SELECT user_id, username, currency, group_id FROM GROUPS_USER gu, USERS u WHERE gu.user_id = :user_id AND gu.group_id = :group_id AND gu.user_id = u.user_id"
    return sql_response(sql_one(g.db_session, sql, {"user_id": user_id, "group_id": group_id}))

@main_bp.route("/groups_user", methods=["GET"])
def get_all_groups_user():
    return sql_response(sql_many(g.db_session, "SELECT user_id, username, currency, group_id FROM GROUPS_USER gu, USERS u WHERE gu.user_id = u.user_id", None))

@main_bp.route("/bets/<int:bet_id>", methods=["GET"])
def get_bet_id(bet_id):
    return sql_response(sql_one(g.db_session, "SELECT bet_id, group_id, seller_id, username, question  FROM AVAILABLE_BETS b, USERS u WHERE bet_id = :bet_id AND b.seller_id = u.user_id", {"bet_id": bet_id}))

@main_bp.route("/bets", methods=["GET"])
def get_bets():
    return sql_response(sql_many(g.db_session, "SELECT bet_id, group_id, seller_id, username, question FROM AVAILABLE_BETS b, USERS u WHERE b.seller_id = u.user_id", None))

@main_bp.route("/bought_bets/<int:bet_id>/<int:buyer_id>", methods=["GET"])
def get_bought_bet(buyer_id, bet_id):
    sql = "SELECT buyer_id, username, bet_id, quantity, result, date_bought, date_resolved FROM BOUGHT_BETS AND USERS WHERE buyer_id = :buyer_id AND bet_id = :bet_id AND buyer_id = user_id"
    return sql_response(sql_one(g.db_session, sql, {"buyer_id": buyer_id, "bet_id": bet_id}))

# needs to be modified to use user_id
@main_bp.route("/bets/accepted", methods=["GET"])
def get_bet_accepted():
    return sql_response(sql_many(g.db_session, "SELECT * FROM AVAILABLE_BETS ab, BOUGHT_BETS bb WHERE AND ab.bet_id = bb.bet_id", None))

# needs to be modified to use user_id
@main_bp.route("/bets/my_bets", methods=["GET"])
def get_bet_mybets():
    return sql_response(sql_many(g.db_session, "SELECT * FROM AVAILABLE_BETS ab, BOUGHT_BETS bb WHERE AND ab.bet_id = bb.bet_id AND ab.seller_id = :user_id", {"user_id": g.user}))


@main_bp.route("/bought_bets", methods=["GET"])
def get_all_bought_bets():
    return sql_response(sql_many(g.db_session, "SELECT buyer_id, username, bet_id, quantity, result, date_bought, date_resolved FROM BOUGHT_BETS, USERS WHERE buyer_id = user_id", None))

@main_bp.route("/quest_submissions/<int:submission_id>", methods=["GET"])
def get_quest_submission_id(submission_id):
    result = sql_one(g.db_session, "SELECT submission_id, u.user_id, username, quest_id, submission_photo, submission_date_time, status FROM QUEST_SUBMISSIONS q, USERS u WHERE submission_id = :submission_id AND q.user_id = u.user_id", {"submission_id": submission_id})
    if result and result['submission_photo']:
        result['photo_url'] = get_upload_url(result['submission_photo'])
    return sql_response(result)

@main_bp.route("/quest_submissions", methods=["GET"])
def get_all_quest_submissions():
    return sql_response(sql_many(g.db_session, "SELECT submission_id, u.user_id, username, quest_id, submission_photo, submission_date_time, status FROM QUEST_SUBMISSIONS q, USERS u WHERE q.user_id = u.user_id", None))

@main_bp.route('/quest_submit/<int:quest_id>', methods=['POST'])
def quest_submit(quest_id):
    if not g.user:
        return jsonify({"message": "User not logged in"}), 401
    return  quest_submission(request, quest_id)

@main_bp.route("/register", methods=["POST"])
def register():
    return register_user(request)
    
@main_bp.route("/login", methods=["POST"])
def login():
    return login_user(request)

@main_bp.route("/logout", methods=["POST", "GET"])
def logout():
    return logout_user()

@main_bp.route("/invite/<invite_code>", methods=["POST", "GET"])
def post_invite(invite_code):
    return process_invite(invite_code)

@main_bp.route("/whoami", methods=["GET"])
def whoami():
    if g.user:
        sql = "SELECT user_id, username FROM USERS WHERE user_id = :user_id"
        LOG.info(f"User {g.user} is logged in")
        result = sql_one(g.db_session, sql, {"user_id": g.user})
        if result:
            return sql_response(result)
        else:
            return jsonify({"message": f"Session logged in for {g.user}, but user doesn't exist in database"}), 200
    return jsonify({"message": "User not logged in"}), 200

@main_bp.route("/debug")
def test_db():
    inspector = inspect(DB)
    return jsonify({"tables": inspector.get_table_names()})
