from flask import Blueprint, jsonify, g, session, request, Response

from sqapp.db import sql_many, sql_one, sql_response
from sqapp.src.uploads import quest_submission, get_upload_url, create_quest

quest_bp = Blueprint("quest_bp", __name__)


@quest_bp.route("/quests/<int:quest_id>", methods=["GET"])
def get_quest_id(quest_id):
    return sql_response(
        sql_one(
            g.db_session,
            "SELECT * FROM QUESTS WHERE quest_id = :quest_id",
            {"quest_id": quest_id},
        )
    )


@quest_bp.route("/quests/all/<int:group_id>", methods=["GET"])
def get_quest(group_id):
    return sql_response(sql_many(g.db_session, "SELECT * FROM QUESTS WHERE group_id = :group_id", {"group_id": group_id}))


#@quest_bp.route("/quests/accepted/<int:user_id>", methods=["GET"])
#def get_quest_accepted_user(user_id):
#    return sql_response(
#        sql_many(
#            g.db_session,
#            "SELECT * FROM QUESTS q, QUEST_SUBMISSIONS qs WHERE qs.user_id = :user_id AND qs.status = 'Accepted' AND q.quest_id = qs.quest_id",
#            {"user_id": user_id},
#        )
#    )


@quest_bp.route("/quests/accepted/<int:group_id>", methods=["GET"])
def get_quest_accepted(group_id):
    return sql_response(
        sql_many(
            g.db_session,
            "SELECT * FROM QUESTS q, QUEST_SUBMISSIONS qs WHERE qs.status = 'Accepted' AND q.quest_id = qs.quest_id AND q.group_id = :group_id",
            {"group_id": group_id},
        )
    )


# deprecated in favor of /quests/my_quests
# @quest_bp.route("/quests/author_id/<int:author_id>", methods=["GET"])
# def get_quest_user(author_id):
#    return sql_response(sql_many(g.db_session, "SELECT * FROM QUESTS q WHERE q.author_id = :author_id", {"author_id": author_id}))


@quest_bp.route("/quests/my_quests/<int:group_id>", methods=["GET"])
def get_my_quest(group_id):
    return sql_response(
        sql_many(
            g.db_session,
            "SELECT * FROM QUESTS q WHERE q.author_id = :author_id AND q.group_id = :group_id",
            {"author_id": g.user, "group_id": group_id},
        )
    )


@quest_bp.route("/quests/open/<int:group_id>", methods=["GET"])
def get_quest_open(group_id):
    return sql_response(
        sql_many(g.db_session, "SELECT * FROM QUESTS WHERE quest_status = 'Open' AND group_id = :group_id", {"group_id": group_id})
    )


@quest_bp.route("/quest_submissions/<int:submission_id>", methods=["GET"])
def get_quest_submission_id(submission_id):
    result = sql_one(
        g.db_session,
        "SELECT submission_id, u.user_id, username, quest_id, submission_photo, submission_date_time, status FROM QUEST_SUBMISSIONS q, SQ_USERS u WHERE submission_id = :submission_id AND q.user_id = u.user_id",
        {"submission_id": submission_id},
    )
    if result and result["submission_photo"]:
        result["photo_url"] = get_upload_url(result["submission_photo"])
    return sql_response(result)


@quest_bp.route("/quest_submissions", methods=["GET"])
def get_all_quest_submissions():
    return sql_response(
        sql_many(
            g.db_session,
            "SELECT submission_id, u.user_id, username, quest_id, submission_photo, submission_date_time, status FROM QUEST_SUBMISSIONS q, SQ_USERS u WHERE q.user_id = u.user_id",
            None,
        )
    )


@quest_bp.route("/quest_submit/<int:quest_id>", methods=["POST"])
def quest_submit(quest_id):
    if not g.user:
        return jsonify({"message": "User not logged in"}), 401
    return quest_submission(request, quest_id)

@quest_bp.route("/quests/create", methods=["POST"])
def post_create_quest():
    return create_quest(request)