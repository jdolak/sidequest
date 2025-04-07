

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
