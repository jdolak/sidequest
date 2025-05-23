from flask import Blueprint, jsonify, g, request

from sqapp.db import sql_many, sql_one, sql_response
from sqapp.src.uploads import quest_submission, get_upload_url, create_quest, quest_accept
from sqapp.src.deletion import delete_quest

quest_bp = Blueprint("quest_bp", __name__)


@quest_bp.route("/quests/<int:quest_id>", methods=["GET"])
def get_quest_id(quest_id):
    return sql_response(
        sql_one(
            g.db_session,
            "SELECT quest_id, group_id, author_id, quest_title, quest_desc, reward_amount, due_date, quest_status, username FROM QUESTS, SQ_USERS u WHERE quest_id = :quest_id AND author_id = u.user_id",
            {"quest_id": quest_id},
        )
    )


@quest_bp.route("/quests/all/<int:group_id>", methods=["GET"])
def get_quest(group_id):
    return sql_response(sql_many(g.db_session, "SELECT quest_id, group_id, author_id, quest_title, quest_desc, reward_amount, due_date, quest_status, username FROM QUESTS q, SQ_USERS u WHERE group_id = :group_id AND u.user_id = q.author_id", {"group_id": group_id}))


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
            "SELECT DISTINCT q.quest_id, group_id, author_id, quest_title, quest_desc, reward_amount, due_date, quest_status, username FROM QUESTS q, QUEST_SUBMISSIONS qs, SQ_USERS u WHERE (LOWER(q.quest_status) = 'accepted' OR LOWER(q.quest_status) = 'resolved') AND q.quest_id = qs.quest_id AND q.group_id = :group_id AND u.user_id = q.author_id AND qs.user_id = :user_id",
            {"user_id": g.user, "group_id": group_id},
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
            "SELECT quest_id, group_id, author_id, quest_title, quest_desc, reward_amount, due_date, quest_status, username FROM QUESTS q, SQ_USERS u WHERE q.author_id = :author_id AND q.group_id = :group_id AND u.user_id = q.author_id",
            {"author_id": g.user, "group_id": group_id},
        )
    )


@quest_bp.route("/quests/open/<int:group_id>", methods=["GET"])
def get_quest_open(group_id):
    return sql_response(
        sql_many(g.db_session, "SELECT quest_id, group_id, author_id, quest_title, quest_desc, reward_amount, due_date, quest_status, username FROM QUESTS q, SQ_USERS u WHERE LOWER(quest_status) = 'open' AND group_id = :group_id AND u.user_id = q.author_id AND u.user_id != :user_id", {"group_id": group_id, "user_id": g.user})
    )


@quest_bp.route("/quest_submissions/<int:submission_id>", methods=["GET"])
def get_quest_submission_id(submission_id):
    result = sql_one(
        g.db_session,
        "SELECT submission_id, u.user_id, username, quest_id, submission_photo, submission_date_time, status, comments FROM QUEST_SUBMISSIONS q, SQ_USERS u WHERE submission_id = :submission_id AND q.user_id = u.user_id",
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
            "SELECT submission_id, u.user_id, username, quest_id, submission_photo, submission_date_time, status, comments FROM QUEST_SUBMISSIONS q, SQ_USERS u WHERE q.user_id = u.user_id",
            None,
        )
    )

@quest_bp.route("/quests/submissions/<int:quest_id>", methods=["GET"])
def get_submissions_by_quest(quest_id):
    result = sql_many(g.db_session, "SELECT submission_id, u.user_id, username, quest_id, submission_photo, submission_date_time, status, comments FROM QUEST_SUBMISSIONS q, SQ_USERS u WHERE q.user_id = u.user_id AND quest_id = :quest_id", {"quest_id": quest_id})
    for submission in result:
        if submission["submission_photo"]:
            submission["photo_url"] = get_upload_url(submission["submission_photo"])
    return sql_response(result)


@quest_bp.route("/quest_submit/<int:quest_id>", methods=["POST"])
def quest_submit(quest_id):
    if not g.user:
        return jsonify({"message": "User not logged in"}), 401
    return quest_submission(request, quest_id)

@quest_bp.route("/quests/create", methods=["POST"])
def post_create_quest():
    return create_quest(request)


@quest_bp.route("/quests/accept/<int:quest_id>", methods=["POST"])
def post_accept_quest(quest_id):
    return quest_accept(quest_id)

@quest_bp.route("/quests/delete/<int:quest_id>", methods=["POST"])
def post_delete_quest(quest_id):
    return delete_quest(quest_id)