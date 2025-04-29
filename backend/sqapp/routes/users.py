from sqapp import main_bp

from flask import Blueprint, jsonify, g, session, request, Response

from sqapp.db import sql_many, sql_one, sql_response

from sqapp.src.auth import register_user, login_user, logout_user, process_invite
from sqapp.src.uploads import create_group

# deprecated in favor of /users/my_user
# @main_bp.route("/users/<int:user_id>", methods=["GET"])
# def get_user_id(user_id):
#    return sql_response(sql_one(g.db_session, "SELECT user_id, username FROM USERS WHERE user_id = :user_id", {"user_id": user_id}))


@main_bp.route("/users/my_user", methods=["GET"])
def get_my_user():
    return sql_response(
        sql_one(
            g.db_session,
            "SELECT user_id, username FROM USERS WHERE user_id = :user_id",
            {"user_id": g.user},
        )
    )


# will be disabled in prod
@main_bp.route("/users", methods=["GET"])
def get_users():
    return sql_response(
        sql_many(g.db_session, "SELECT user_id, username FROM USERS", None)
    )


@main_bp.route("/groups/<int:group_id>", methods=["GET"])
def get_group_id(group_id):
    return sql_response(
        sql_one(
            g.db_session,
            "SELECT * FROM GROUPS WHERE group_id = :group_id",
            {"group_id": group_id},
        )
    )


@main_bp.route("/groups", methods=["GET"])
def get_groups():
    return sql_response(
        sql_many(g.db_session, "SELECT * FROM GROUPS WHERE public = 'Y'", None)
    )


@main_bp.route("/groups/search/<query>", methods=["GET"])
def search_groups(query):
    pattern = f"%{query}%"
    return sql_response(
        sql_many(
            g.db_session,
            "SELECT * FROM GROUPS WHERE public = 'Y' AND (group_name LIKE :pattern OR group_desc LIKE :pattern)",
            {"pattern": pattern},
        )
    )


@main_bp.route("/groups/my_groups", methods=["GET"])
def get_my_groups():
    return sql_response(
        sql_many(
            g.db_session,
            "SELECT * FROM GROUPS NATURAL JOIN GROUPS_USER WHERE user_id = :user_id",
            {"user_id": g.user},
        )
    )


@main_bp.route("/groups_user/<int:group_id>/<int:user_id>", methods=["GET"])
def get_group_user(user_id, group_id):
    sql = "SELECT user_id, username, currency, group_id FROM GROUPS_USER gu, USERS u WHERE gu.user_id = :user_id AND gu.group_id = :group_id AND gu.user_id = u.user_id"
    return sql_response(
        sql_one(g.db_session, sql, {"user_id": user_id, "group_id": group_id})
    )

@main_bp.route("/groups_user", methods=["GET"])
def get_all_groups_user():
    return sql_response(
        sql_many(
            g.db_session,
            "SELECT user_id, username, currency, group_id FROM GROUPS_USER gu, USERS u WHERE gu.user_id = u.user_id",
            None,
        )
    )

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

@main_bp.route("groups/create", methods=["POST"])
def post_create_group():
    return create_group(request)
