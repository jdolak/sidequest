from flask import Blueprint, jsonify, g, session, request, Response

from sqapp.db import sql_many, sql_one, sql_response
from sqapp.src.uploads import create_bet

bet_bp = Blueprint("bet_bp", __name__)


@bet_bp.route("/bets/<int:bet_id>", methods=["GET"])
def get_bet_id(bet_id):
    return sql_response(
        sql_one(
            g.db_session,
            "SELECT bet_id, group_id, seller_id, username, max_quantity, side, odds, question, description, status FROM AVAILABLE_BETS b, SQ_USERS u WHERE bet_id = :bet_id AND b.seller_id = u.user_id",
            {"bet_id": bet_id},
        )
    )


@bet_bp.route("/bets/all/<int:group_id>", methods=["GET"])
def get_bets(group_id):
    return sql_response(
        sql_many(
            g.db_session,
            "SELECT bet_id, group_id, seller_id, username, max_quantity, side, odds, question, description, status FROM AVAILABLE_BETS b, SQ_USERS u WHERE b.seller_id = u.user_id AND group_id = :group_id",
            {"group_id": group_id},
        )
    )


@bet_bp.route("/bought_bets/<int:bet_id>/<int:buyer_id>", methods=["GET"])
def get_bought_bet(buyer_id, bet_id):
    sql = "SELECT buyer_id, username, bet_id, quantity, side, status, date_bought, date_resolved, submission_photo FROM BOUGHT_BETS AND SQ_USERS WHERE buyer_id = :buyer_id AND bet_id = :bet_id AND buyer_id = user_id"
    return sql_response(
        sql_one(g.db_session, sql, {"buyer_id": buyer_id, "bet_id": bet_id})
    )


# needs to be modified to use user_id
@bet_bp.route("/bets/accepted/<int:group_id>", methods=["GET"])
def get_bet_accepted(group_id):
    return sql_response(
        sql_many(
            g.db_session,
            "SELECT * FROM AVAILABLE_BETS ab, BOUGHT_BETS bb WHERE ab.bet_id = bb.bet_id AND ab.seller_id = :user_id AND ab.group_id = :group_id",
            {"user_id": g.user, "group_id": group_id},
        )
    )


# needs to be modified to use user_id
@bet_bp.route("/bets/my_bets/<int:group_id>", methods=["GET"])
def get_bet_mybets(group_id):
    return sql_response(
        sql_many(
            g.db_session,
            "SELECT * FROM AVAILABLE_BETS ab, BOUGHT_BETS bb WHERE ab.bet_id = bb.bet_id AND ab.seller_id = :user_id AND ab.group_id = :group_id",
            {"user_id": g.user, "group_id": group_id},
        )
    )


@bet_bp.route("/bought_bets", methods=["GET"])
def get_all_bought_bets():
    return sql_response(
        sql_many(
            g.db_session,
            "SELECT buyer_id, username, bet_id, quantity, side, date_bought, date_resolved, status FROM BOUGHT_BETS, SQ_USERS WHERE buyer_id = user_id",
            None,
        )
    )

@bet_bp.route("/bets/create", methods=["POST"])
def post_create_bet():
    return create_bet(request)

@bet_bp.route("/bets/accept/<int:bet_id>", methods=["POST"])
def post_accept_bet(bet_id):
    sql = "INSERT INTO BOUGHT_BETS (buyer_id, bet_id, quantity, side, status) VALUES (:buyer_id, :bet_id, :quantity, :side, :status)"
    return sql_response(
        sql_one(
            g.db_session,
            sql,
            {"bet_id": bet_id, "buyer_id": g.user},
        )
    )



