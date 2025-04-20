from flask import jsonify, g, session
from flask_bcrypt import Bcrypt
from sqlalchemy import text

from sqapp.db import sql_many, sql_one
from sqapp import LOG

BCRYPT = Bcrypt()

def register_user(data):
    """
    Register a new user.
    """
    if not data:
        return jsonify({"error": "Invalid input"}), 400

    user_id = register_user(data)
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
    
    user_id = result["user_id"]
    
    if user_id:
        session['user_id'] = user_id
        return jsonify({"message": "User registered successfully", "user_id": user_id}), 201
    else:
        return jsonify({"error": "Registration failed"}), 500

def login_user(data):

    if not data:
        return jsonify({"error": "Invalid input"}), 400
    
    if session.user_id:
        return jsonify({"message": "User already logged in", "user_id": session.user_id}), 200

    required_fields = ["username", "password"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    sql = "SELECT * FROM USERS WHERE username = :username"
    existing_user = sql_one(g.db_session, sql, {"username": data["username"]})

    if existing_user is None:
        LOG.warning(f"User not found: {data['username']}")
        return jsonify({"error": "User not found"}), 401
    
    # Check the password
    if not BCRYPT.check_password_hash(existing_user["password_hash"], data["password"]):
        LOG.warning(f"Invalid password for user: {data['username']}")
        return jsonify({"error": "Invalid password"}), 401
    
    # Store the user ID in the session
    session['user_id'] = existing_user["user_id"]
    LOG.info(f"User logged in successfully: {data['username']}")
    return jsonify({"message": "User logged in successfully", "user_id": existing_user["user_id"]}), 200

def logout_user():
    """
    Log out the user.
    """
    if 'user_id' in session:
        LOG.info(f"User logged out: {session['user_id']}")
        session.pop('user_id', None)
        return jsonify({"message": "User logged out successfully"}), 200
    else:
        LOG.warning("No user is currently logged in")
        return jsonify({"error": "No user is currently logged in"}), 400
     
    


