import os
from app import create_app
from dotenv import load_dotenv

load_dotenv()

PORT = os.getenv('APP_PORT')

sq_app = create_app()

if __name__ == "__main__":
    sq_app.run(debug=True, host="0.0.0.0", port=PORT)
