INSERT INTO USERS (user_id, user_name, email, password_hash) VALUES
(1, 'Alice', 'alice@example.com', 'hash1'),
(2, 'Bob', 'bob@example.com', 'hash2'),
(3, 'Charlie', 'charlie@example.com', 'hash3');

INSERT INTO GROUPS (group_id, group_name, group_desc, group_visibility) VALUES
(1, 'Sports Fans', 'A group for sports enthusiasts', 'Y'),
(2, 'Gamers United', 'For people who love gaming', 'N'),
(3, 'Book Club', 'A place to discuss books', 'Y');

INSERT INTO GROUPS_USER (user_id, group_id, currency) VALUES
(1, 1, 100),
(2, 2, 200),
(3, 3, 300);

INSERT INTO AVAILABLE_BETS (bet_id, group_id, seller_id, question) VALUES
(1, 1, 1, 'Will Team A win the match?'),
(2, 2, 2, 'Will the new game be released this year?'),
(3, 3, 3, 'Will this book become a bestseller?');

INSERT INTO BOUGHT_BETS (buyer_id, bet_id, quantity, result, date_bought, date_resolved) VALUES
(1, 1, 10, NULL, '2025-03-01', NULL),
(2, 2, 5, NULL, '2025-03-02', NULL),
(3, 3, 20, NULL, '2025-03-03', NULL);

INSERT INTO QUESTS (quest_id, group_id, quest_desc, reward_amount, due_date, quest_status) VALUES
(1, 1, 'Complete a sports trivia quiz', 50, '2025-04-01', 'Open'),
(2, 2, 'Win a gaming tournament', 100, '2025-04-05', 'Open'),
(3, 3, 'Read and review a book', 75, '2025-04-10', 'Open');

INSERT INTO QUEST_SUBMISSIONS (submission_id, user_id, quest_id, submission_photo, submission_date_time, status) VALUES
(1, 1, 1, 'photo1.jpg', CURRENT_TIMESTAMP, 'Pending'),
(2, 2, 2, 'photo2.jpg', CURRENT_TIMESTAMP, 'Pending'),
(3, 3, 3, 'photo3.jpg', CURRENT_TIMESTAMP, 'Pending');
