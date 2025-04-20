from flask import jsonify, g
from flask_bcrypt import Bcrypt
from sqlalchemy import text

from sqapp.db import sql_many, sql_one
from sqapp import LOG

BCRYPT = Bcrypt()

def register_user(data):
    """
    Register a new user.
    """

    required_fields = ["username", "password"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400
        
    # Check if the user already exists
    sql = "SELECT * FROM USERS WHERE username = :username"
    existing_user = sql_one(g.db_session, sql, {"username": data["username"]})
    
    if existing_user is not None:
        LOG.error(f"User already exists: {data['username']}")
        return 0

    # Hash the password
    hashed_password = BCRYPT.generate_password_hash(data["password"]).decode('utf-8')
    if not BCRYPT.check_password_hash(hashed_password, data["password"]):
        LOG.error(f"Password hashing failed for {data['username']}")
        return 0


    # Insert the new user into the database
    sql = "INSERT INTO USERS (username, password_hash) VALUES (:username, :password_hash)"
    result = g.db_session.execute(text(sql), {"username": data["username"], "password_hash": hashed_password})

    result = sql_one(g.db_session, "SELECT user_id FROM USERS WHERE username = :username", {"username": data["username"]})

    if result is None:
        LOG.error(f"User registration failed for {data['username']}")
        return 0
    
    LOG.info(f"User registered successfully: {data['username']}")
    
    return result["user_id"]


