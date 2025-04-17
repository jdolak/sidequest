from sqapp import create_app
from dotenv import load_dotenv
from sqapp.src.auth import BCRYPT
from flask_cors import CORS


import os

load_dotenv()

sq_app = create_app()

sq_app.config['SECRET_KEY'] = os.getenv('FLASK_SECRET_KEY')

HOST_PORT = os.getenv('HOST_PORT', 80)

BCRYPT.init_app(sq_app)

allowed_origins = [
    "http://localhost:{HOST_PORT}",
]

CORS(sq_app)



if __name__ == "__main__":
    sq_app.run(debug=True, host="0.0.0.0", port=5000, use_reloader=False)
