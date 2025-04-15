from sqapp import create_app
from dotenv import load_dotenv
import os

load_dotenv()

sq_app = create_app()

sq_app.config['SECRET_KEY'] = os.getenv('FLASK_SECRET_KEY')

if __name__ == "__main__":
    sq_app.run(debug=True, host="0.0.0.0", port=5000, use_reloader=False)
