from flask import Flask, Blueprint
import os
from dotenv import load_dotenv
import logging

load_dotenv()
from sqapp.db import db_connect

DB = db_connect()

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(name)s - %(levelname)s - %(funcName)s() - %(message)s')
LOG = logging.getLogger()

main_bp = Blueprint("main", __name__)

def create_app():

    PROJECT = os.getenv('PROJECT')
    sq_app = Flask(PROJECT)

    from sqapp import routes
    sq_app.register_blueprint(routes.main_bp)

    return sq_app