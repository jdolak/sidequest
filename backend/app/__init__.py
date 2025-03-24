from flask import Flask
import os
from dotenv import load_dotenv

load_dotenv()


def create_app():

    PROJECT = os.getenv('PROJECT')
    sq_app = Flask(PROJECT)

    from app import routes
    sq_app.register_blueprint(routes.main_bp)

    return sq_app

