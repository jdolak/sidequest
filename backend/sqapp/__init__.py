from flask import Flask
import os
from dotenv import load_dotenv
import logging

load_dotenv()
from sqapp.db import db_connect

DB = db_connect()

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(name)s - %(levelname)s - %(funcName)s() - %(message)s')
LOG = logging.getLogger()

def create_app():

    PROJECT = os.getenv('PROJECT')
    sq_app = Flask(PROJECT)

    from sqapp.routes import main, users, bets, quests

    sq_app.register_blueprint(main.main_bp)
    sq_app.register_blueprint(users.user_bp)
    sq_app.register_blueprint(bets.bet_bp)
    sq_app.register_blueprint(quests.quest_bp)

    return sq_app