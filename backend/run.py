from app import create_app

sq_app = create_app()

if __name__ == "__main__":
    sq_app.run(debug=True, host="0.0.0.0", port=5000, use_reloader=False)
