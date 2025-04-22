CREATE TABLE USERS (
    user_id INTEGER PRIMARY KEY,
    username VARCHAR2(255) NOT NULL,
    password_hash VARCHAR2(255) NOT NULL
);

CREATE TABLE GROUPS (
    group_id INTEGER PRIMARY KEY,
    group_name VARCHAR2(255) NOT NULL,
    group_desc VARCHAR2(4000),
    public CHAR(1) CHECK (public IN ('Y', 'N'))
);

CREATE TABLE GROUPS_USER (
    user_id INTEGER,
    group_id NUMBER,
    currency NUMBER,
    PRIMARY KEY (user_id, group_id),
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES GROUPS(group_id) ON DELETE CASCADE
);

CREATE TABLE AVAILABLE_BETS (
    bet_id INTEGER PRIMARY KEY,
    group_id NUMBER,
    seller_id NUMBER,
    question VARCHAR2(4000) NOT NULL,
    FOREIGN KEY (group_id) REFERENCES GROUPS(group_id) ON DELETE CASCADE,
    FOREIGN KEY (seller_id) REFERENCES USERS(user_id) ON DELETE CASCADE
);

CREATE TABLE BOUGHT_BETS (
    buyer_id INTEGER,
    bet_id NUMBER,
    quantity NUMBER NOT NULL,
    result VARCHAR2(255),
    date_bought DATE NOT NULL,
    date_resolved DATE,
    PRIMARY KEY (buyer_id, bet_id),
    FOREIGN KEY (buyer_id) REFERENCES USERS(user_id) ON DELETE CASCADE,
    FOREIGN KEY (bet_id) REFERENCES AVAILABLE_BETS(bet_id) ON DELETE CASCADE
);

CREATE TABLE QUESTS (
    quest_id INTEGER PRIMARY KEY,
    author_id NUMBER,
    group_id NUMBER,
    quest_desc VARCHAR2(4000) NOT NULL,
    reward_amount NUMBER NOT NULL,
    due_date DATE NOT NULL,
    quest_status VARCHAR2(255) NOT NULL,
    FOREIGN KEY (author_id) REFERENCES USERS(user_id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES GROUPS(group_id) ON DELETE CASCADE
);

CREATE TABLE QUEST_SUBMISSIONS (
    submission_id INTEGER PRIMARY KEY,
    user_id NUMBER,
    quest_id NUMBER,
    submission_photo VARCHAR2(4000),
    submission_date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    comments VARCHAR2(4000),
    status VARCHAR2(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE,
    FOREIGN KEY (quest_id) REFERENCES QUESTS(quest_id) ON DELETE CASCADE
);
