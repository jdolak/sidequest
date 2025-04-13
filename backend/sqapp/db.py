import sqapp
from sqlalchemy import text
from flask import Response, jsonify

def db_connect():
    from sqlalchemy import create_engine

    engine = create_engine("sqlite:///example.db")#create_engine("sqlite:///sidequest/data.db")
    init_example_db(engine)
    return engine

def init_example_db(engine):
    print("Initializing database...")
    from sqlalchemy import text

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

def sql_one(session, query, params):
    sqapp.LOG.debug(f"Executing SQL: {query} with params: {params}")
    result = session.execute(text(query), params)
    row = result.fetchone()

    if row:
            row_dict = dict(row._mapping)
            return jsonify(row_dict)

    return Response(status=204)

def sql_many(session, query, params):
    sqapp.LOG.debug(f"Executing SQL: {query} with params: {params}")
    result = session.execute(text(query), params)
    row_dict = [dict(row._mapping) for row in result]
    if result:
        return jsonify(row_dict)
    else:
        return Response(status=204)

