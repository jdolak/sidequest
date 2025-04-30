from flask import Blueprint, jsonify, g, session, request, Response
from sqlalchemy import inspect
from sqlalchemy.orm import sessionmaker, scoped_session

from sqapp import DB, LOG
from sqapp.db import sql_many, sql_one, sql_response

main_bp = Blueprint("main", __name__)

SessionFactory = sessionmaker(bind=DB)
DB_session = scoped_session(SessionFactory)

"""
API endpoints:
- /quests/<int:quest_id>
- /quests
- /quests/open/<int:group_id>
- /quests/author_id/<int:author_id> * will be depreciated in favor of account variable
- /quests/accepted/<int:group_id>
- /quests/my_quests/<int:group_id>
- /users/<int:user_id>
- /users
- /users/my_user
- /groups/<int:group_id> 
- /groups
- /groups/search/<query>
- /groups/my_groups
- /groups_user/<int:group_id>/<int:user_id>
- /groups_user
- /bets/<int:bet_id> 
- /bets
- /bets/accepted
- /bets/my_bets
- /bought_bets/<int:bet_id>/<int:buyer_id>
- /bought_bets
- /quest_submissions/<int:submission_id>
- /quest_submissions
- /quest_submit/<int:quest_id>
- /register
- /login
- /logout
- /invite/<invite_code>
- /whoami
- /debug
"""


@main_bp.route("/")
def home():
    return "<h1>Sidequest API</h1>"

def init_app(sq_app):
    @sq_app.before_request
    def start_session():
        g.db_session = DB_session()

        user_id = session.get("sq_user_id")
        if user_id:
            g.user = user_id
        else:
            g.user = None


    @sq_app.teardown_request
    def cleanup_session(exception):
        try:
            if exception:
                LOG.error(f"Exception occurred, rolling back: {exception}")
                g.db_session.rollback()
            else:
                g.db_session.commit()
        finally:
            g.db_session.close()


@main_bp.route("/whoami", methods=["GET"])
def whoami():
    if g.user:
        sql = "SELECT user_id, username FROM SQ_USERS WHERE user_id = :user_id"
        LOG.info(f"User {g.user} is logged in")
        result = sql_one(g.db_session, sql, {"user_id": g.user})
        if result:
            result["status"] = "true"
            return sql_response(result)
        else:
            return (
                jsonify(
                    {
                        "message": f"Session logged in for {g.user}, but user doesn't exist in database",
                        "status": "false",
                    }
                ),
                200,
            )
    return jsonify({"message": "User not logged in", "status" : "false"}), 200


@main_bp.route("/debug")
def test_db():
    inspector = inspect(DB)
    return jsonify({"tables": inspector.get_table_names()})
