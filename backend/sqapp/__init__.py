from flask import Flask
import os
from dotenv import load_dotenv
import logging
from sqapp.db import db_connect

load_dotenv()

DB = db_connect()

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(name)s - %(levelname)s - %(funcName)s() - %(message)s')
LOG = logging.getLogger()
global sq_app

def create_app():

    PROJECT = os.getenv('PROJECT')
    sq_app = Flask(PROJECT)

    from sqapp.routes import main, users, bets, quests

    main.init_app(sq_app)

    sq_app.register_blueprint(main.main_bp)
    sq_app.register_blueprint(users.user_bp)
    sq_app.register_blueprint(bets.bet_bp)
    sq_app.register_blueprint(quests.quest_bp)

    return sq_app