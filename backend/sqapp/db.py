import sqapp
from sqlalchemy import text, create_engine
from flask import Response, jsonify, g
from dotenv import load_dotenv
import os

load_dotenv()

def db_connect():

    rdms = os.getenv("RDMS", "sqlite")

    if rdms == "oracle":
        engine = create_engine("oracle+oracledb://guest:guest@localhost:1539/xe")

    else:
        engine = create_engine("sqlite:///example.db")
        init_example_db(engine)

    


    return engine

def init_example_db(engine):
    print("Initializing database...")


    with engine.connect() as conn:
        with open('db/tables.sql', 'r') as file:
            sql_commands = file.read().split(";")  
        
        for command in sql_commands:
            command = command.strip()
            if command: 
                conn.execute(text(command))

        conn.commit()
        
        with open('db/fake_data.sql', 'r') as file:
            sql_commands = file.read().split(";")  
        
        for command in sql_commands:
            command = command.strip()
            if command: 
                conn.execute(text(command))

        conn.commit()

def sql_one(db_session, query, params):
    sqapp.LOG.debug(f"Executing SQL: {query} with params: {params}")
    result = db_session.execute(text(query), params)
    row = result.fetchone()

    if row:
        return dict(row._mapping)
    else:
        return None

def sql_many(db_session, query, params):
    sqapp.LOG.debug(f"Executing SQL: {query} with params: {params}")
    result = db_session.execute(text(query), params)
    row_dict = [dict(row._mapping) for row in result]
    if result:
        return row_dict
    else:
        return None
    
def sql_response(value, public=False):

    if not g.user and not public:
        return jsonify({"error": "Unauthorized"}), 401
    
    if value is None:
        return Response(status=204)
    else:
        return jsonify(value), 200

