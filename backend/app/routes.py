from flask import Flask, render_template, request, redirect, url_for, flash, Blueprint, jsonify
from sqlalchemy import text, inspect

from app import DB

main_bp = Blueprint('main', __name__)

@main_bp.route("/")
def home():
    return "<h1>Sidequest API</h1>"

@main_bp.route("/quests/<int:quest_id>", methods=["GET"])
def get_quest_id(quest_id):
    inspector = inspect(DB)
    print(inspector.get_table_names())
    with DB.connect() as connection:
        result = connection.execute(text("SELECT * FROM QUESTS WHERE quest_id = :quest_id"), {"quest_id": quest_id})
        row = result.fetchone()
    if row:
            row_dict = dict(row._mapping)
            return jsonify(row_dict)
    return (jsonify({"error": "User not found"}), 404)

@main_bp.route("/quests", methods=["GET"])
def get_quest():
    inspector = inspect(DB)
    print(inspector.get_table_names())
    with DB.connect() as connection:
        result = connection.execute(text("SELECT * FROM QUESTS"))
        row_dict = [dict(row._mapping) for row in result]
        return jsonify(row_dict)
    return (jsonify({"error": "User not found"}), 404)

@main_bp.route("/debug")
def test_db():
    inspector = inspect(DB)
    return jsonify({"tables": inspector.get_table_names()})
