-- Insert Users
INSERT INTO USERS (username, password_hash) VALUES ('alice', 'hash1');
INSERT INTO USERS (username, password_hash) VALUES ('bob', 'hash2');
INSERT INTO USERS (username, password_hash) VALUES ('carol', 'hash3');
INSERT INTO USERS (username, password_hash) VALUES ('dave', 'hash4');
INSERT INTO USERS (username, password_hash) VALUES ('eve', 'hash5');

-- Insert Groups
INSERT INTO GROUPS (group_name, group_desc, public, invite_code) VALUES ('Hiking Club', 'A club for hiking enthusiasts.', 'Y', 'INV1234567890ABCDEFGH1234567890ABCDEFGH1234567890ABCDEFGH12345678');
INSERT INTO GROUPS (group_name, group_desc, public, invite_code) VALUES ('Cooking Squad', 'For those who love to cook!', 'N', 'INV2234567890ABCDEFGH1234567890ABCDEFGH1234567890ABCDEFGH12345678');
INSERT INTO GROUPS (group_name, group_desc, public, invite_code) VALUES ('Gamers Unite', 'All about gaming.', 'Y', 'INV3234567890ABCDEFGH1234567890ABCDEFGH1234567890ABCDEFGH12345678');
INSERT INTO GROUPS (group_name, group_desc, public, invite_code) VALUES ('Bookworms', 'Reading challenges and discussions.', 'Y', 'INV4234567890ABCDEFGH1234567890ABCDEFGH1234567890ABCDEFGH12345678');
INSERT INTO GROUPS (group_name, group_desc, public, invite_code) VALUES ('Fitness Freaks', 'Fitness and wellbeing community.', 'N', 'INV5234567890ABCDEFGH1234567890ABCDEFGH1234567890ABCDEFGH12345678');

-- Insert Group Memberships
INSERT INTO GROUPS_USER (user_id, group_id, currency, role) VALUES (1, 1, 1000, 'admin');
INSERT INTO GROUPS_USER (user_id, group_id, currency, role) VALUES (2, 1, 500, 'member');
INSERT INTO GROUPS_USER (user_id, group_id, currency, role) VALUES (3, 2, 750, 'admin');
INSERT INTO GROUPS_USER (user_id, group_id, currency, role) VALUES (4, 3, 300, 'admin');
INSERT INTO GROUPS_USER (user_id, group_id, currency, role) VALUES (5, 4, 400, 'member');
INSERT INTO GROUPS_USER (user_id, group_id, currency, role) VALUES (1, 5, 600, 'member');

-- Insert Quests (5 per group)
BEGIN
  FOR i IN 1..5 LOOP
    INSERT INTO QUESTS (author_id, group_id, quest_title, quest_desc, reward_amount, due_date, quest_status)
    VALUES (MOD(i,5)+1, 1, 'Quest ' || i || ' for Hiking', 'Complete hike #' || i, 100*i, SYSDATE+10*i, 'open');

    INSERT INTO QUESTS (author_id, group_id, quest_title, quest_desc, reward_amount, due_date, quest_status)
    VALUES (MOD(i+1,5)+1, 2, 'Quest ' || i || ' for Cooking', 'Cook dish #' || i, 200*i, SYSDATE+8*i, 'open');

    INSERT INTO QUESTS (author_id, group_id, quest_title, quest_desc, reward_amount, due_date, quest_status)
    VALUES (MOD(i+2,5)+1, 3, 'Quest ' || i || ' for Gaming', 'Win match #' || i, 150*i, SYSDATE+7*i, 'open');

    INSERT INTO QUESTS (author_id, group_id, quest_title, quest_desc, reward_amount, due_date, quest_status)
    VALUES (MOD(i+3,5)+1, 4, 'Quest ' || i || ' for Bookworms', 'Read book #' || i, 180*i, SYSDATE+9*i, 'open');

    INSERT INTO QUESTS (author_id, group_id, quest_title, quest_desc, reward_amount, due_date, quest_status)
    VALUES (MOD(i+4,5)+1, 5, 'Quest ' || i || ' for Fitness', 'Workout session #' || i, 120*i, SYSDATE+6*i, 'open');
  END LOOP;
END;
/

-- Insert Available Bets (5 per group)
BEGIN
  FOR i IN 1..5 LOOP
    INSERT INTO AVAILABLE_BETS (group_id, seller_id, max_quantity, side, odds, question, description, status)
    VALUES (1, MOD(i,5)+1, 100, 'Y', 2, 'Will it rain on hike #'||i||'?', 'Weather bet #'||i, 'open');

    INSERT INTO AVAILABLE_BETS (group_id, seller_id, max_quantity, side, odds, question, description, status)
    VALUES (2, MOD(i+1,5)+1, 50, 'N', 3, 'Will dish #'||i||' be spicy?', 'Cooking bet #'||i, 'open');

    INSERT INTO AVAILABLE_BETS (group_id, seller_id, max_quantity, side, odds, question, description, status)
    VALUES (3, MOD(i+2,5)+1, 70, 'Y', 4, 'Will player beat boss #'||i||'?', 'Gaming bet #'||i, 'open');

    INSERT INTO AVAILABLE_BETS (group_id, seller_id, max_quantity, side, odds, question, description, status)
    VALUES (4, MOD(i+3,5)+1, 60, 'N', 5, 'Will book #'||i||' have happy ending?', 'Book bet #'||i, 'open');

    INSERT INTO AVAILABLE_BETS (group_id, seller_id, max_quantity, side, odds, question, description, status)
    VALUES (5, MOD(i+4,5)+1, 80, 'Y', 2, 'Will workout session #'||i||' be under 30 minutes?', 'Fitness bet #'||i, 'open');
  END LOOP;
END;
/

-- Insert Bought Bets (5 examples)
INSERT INTO BOUGHT_BETS (buyer_id, bet_id, quantity, side, status, date_bought, date_resolved, submission_photo)
VALUES (1, 1, 2, 'Y', 'pending', SYSDATE, NULL, NULL);
INSERT INTO BOUGHT_BETS (buyer_id, bet_id, quantity, side, status, date_bought, date_resolved, submission_photo)
VALUES (2, 2, 1, 'N', 'pending', SYSDATE, NULL, NULL);
INSERT INTO BOUGHT_BETS (buyer_id, bet_id, quantity, side, status, date_bought, date_resolved, submission_photo)
VALUES (3, 3, 5, 'Y', 'pending', SYSDATE, NULL, NULL);
INSERT INTO BOUGHT_BETS (buyer_id, bet_id, quantity, side, status, date_bought, date_resolved, submission_photo)
VALUES (4, 4, 3, 'N', 'pending', SYSDATE, NULL, NULL);
INSERT INTO BOUGHT_BETS (buyer_id, bet_id, quantity, side, status, date_bought, date_resolved, submission_photo)
VALUES (5, 5, 4, 'Y', 'pending', SYSDATE, NULL, NULL);

-- Insert Quest Submissions (5 examples)
INSERT INTO QUEST_SUBMISSIONS (user_id, quest_id, submission_photo, comments, status)
VALUES (1, 1, 'photo1.jpg', 'Had fun!', 'submitted');
INSERT INTO QUEST_SUBMISSIONS (user_id, quest_id, submission_photo, comments, status)
VALUES (2, 2, 'photo2.jpg', 'It was tough!', 'submitted');
INSERT INTO QUEST_SUBMISSIONS (user_id, quest_id, submission_photo, comments, status)
VALUES (3, 3, 'photo3.jpg', 'Great experience!', 'submitted');
INSERT INTO QUEST_SUBMISSIONS (user_id, quest_id, submission_photo, comments, status)
VALUES (4, 4, 'photo4.jpg', 'Awesome!', 'submitted');
INSERT INTO QUEST_SUBMISSIONS (user_id, quest_id, submission_photo, comments, status)
VALUES (5, 5, 'photo5.jpg', 'Would do it again!', 'submitted');
