from sqapp import create_app
from dotenv import load_dotenv
from sqapp.src.auth import BCRYPT
from werkzeug.middleware.proxy_fix import ProxyFix


import os

load_dotenv()

sq_app = create_app()

sq_app.config['SECRET_KEY'] = os.getenv('FLASK_SECRET_KEY')

HOST_PORT = os.getenv('HOST_PORT', 80)

BCRYPT.init_app(sq_app)

sq_app.config.update(
    SESSION_COOKIE_SAMESITE='None',
    SESSION_COOKIE_SECURE=True,
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_NAME='session'
)

sq_app.wsgi_app = ProxyFix(sq_app.wsgi_app, x_proto=1, x_host=1)


if __name__ == "__main__":
    sq_app.run(debug=False, host="0.0.0.0", port=5000, use_reloader=False)
