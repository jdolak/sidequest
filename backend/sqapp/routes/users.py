from flask import Blueprint, g, request

from sqapp.db import sql_many, sql_one, sql_response

from sqapp.src.auth import (
    register_user,
    login_user,
    logout_user,
    process_invite,
    group_member_count,
)
from sqapp.src.uploads import create_group

# deprecated in favor of /users/my_user
# @user_bp.route("/users/<int:user_id>", methods=["GET"])
# def get_user_id(user_id):
#    return sql_response(sql_one(g.db_session, "SELECT user_id, username FROM SQ_USERS WHERE user_id = :user_id", {"user_id": user_id}))

user_bp = Blueprint("user_bp", __name__)


@user_bp.route("/users/my_user", methods=["GET"])
def get_my_user():
    return sql_response(
        sql_one(
            g.db_session,
            "SELECT user_id, username FROM SQ_USERS WHERE user_id = :user_id",
            {"user_id": g.user},
        )
    )


# will be disabled in prod
@user_bp.route("/users", methods=["GET"])
def get_users():
    return sql_response(
        sql_many(g.db_session, "SELECT user_id, username FROM SQ_USERS", None)
    )


@user_bp.route("/groups/<int:group_id>", methods=["GET"])
def get_group_id(group_id):
    sql = "SELECT * FROM SQ_GROUPS WHERE group_id = :group_id"
    group = sql_one(g.db_session, sql, {"group_id": group_id})
    group["size"] = group_member_count(group["group_id"])
    return sql_response(group)


@user_bp.route("/groups", methods=["GET"])
def get_groups():
    sql = "SELECT * FROM SQ_GROUPS WHERE is_public = 'Y'"
    result = sql_many(g.db_session, sql, None)
    for group in result:
        group["size"] = group_member_count(group["group_id"])
    return sql_response(result)


@user_bp.route("/groups/search/<query>", methods=["GET"])
def search_groups(query):
    pattern = f"%{query}%"
    sql = "SELECT * FROM SQ_GROUPS WHERE is_public = 'Y' AND (group_name LIKE :pattern OR group_desc LIKE :pattern)"
    result = sql_many(g.db_session, sql, {"pattern": pattern})
    for group in result:
        group["size"] = group_member_count(group["group_id"])
    return sql_response(result)


@user_bp.route("/groups/my_groups", methods=["GET"])
def get_my_groups():
    sql = "SELECT * FROM SQ_GROUPS NATURAL JOIN SQ_GROUPS_USER WHERE user_id = :user_id"
    result = sql_many(g.db_session, sql, {"user_id": g.user})
    for i in range(len(result)):
        result[i]["size"] = group_member_count(result[i]["group_id"])
    return sql_response(result)


@user_bp.route("/groups_user/<int:group_id>", methods=["GET"])
def get_group_user(group_id):
    sql = "SELECT u.user_id, username, currency, group_id, role FROM SQ_GROUPS_USER gu, SQ_USERS u WHERE gu.user_id = :user_id AND gu.group_id = :group_id AND gu.user_id = u.user_id"
    return sql_response(
        sql_one(g.db_session, sql, {"user_id": g.user, "group_id": group_id})
    )


@user_bp.route("/groups_user", methods=["GET"])
def get_all_groups_user():
    return sql_response(
        sql_many(
            g.db_session,
            "SELECT u.user_id, username, currency, group_id FROM SQ_GROUPS_USER gu, SQ_USERS u WHERE gu.user_id = u.user_id",
            None,
        )
    )


@user_bp.route("/register", methods=["POST"])
def register():
    return register_user(request)


@user_bp.route("/login", methods=["POST"])
def login():
    return login_user(request)


@user_bp.route("/logout", methods=["POST", "GET"])
def logout():
    return logout_user()


@user_bp.route("/invite/<invite_code>", methods=["POST", "GET"])
def post_invite(invite_code):
    return process_invite(invite_code)


@user_bp.route("/groups/create", methods=["POST"])
def post_create_group():
    return create_group(request)


@user_bp.route("/quests/delete/<int:group_id>", methods=["POST"])
def delete_quest(group_id):
    sql = "DELETE FROM QUESTS WHERE group_id = :group_id RETURNING group_id"
    result = sql_one(g.db_session, sql, {"group_id": group_id})
    return sql_response(result)
