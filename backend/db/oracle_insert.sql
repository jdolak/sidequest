INSERT INTO USERS (user_id, username, password_hash) VALUES
(1, 'Alice', 'hash1'),
(2, 'Bob', 'hash2'),
(3, 'Charlie', 'hash3');

INSERT INTO GROUPS (group_id, group_name, group_desc, public, invite_code) VALUES
(1, 'Sports Fans', 'A group for sports enthusiasts', 'Y', '123'),
(2, 'Gamers United', 'For people who love gaming', 'N', '456'),
(3, 'Book Club', 'A place to discuss books', 'Y', '789');

INSERT INTO GROUPS_USER (user_id, group_id, currency) VALUES
(1, 1, 100),
(2, 2, 200),
(3, 3, 300);

INSERT INTO AVAILABLE_BETS (bet_id, group_id, seller_id, question) VALUES
(1, 1, 1, 'Will Team A win the match?'),
(2, 2, 2, 'Will the new game be released this year?'),
(3, 3, 3, 'Will this book become a bestseller?');

INSERT INTO BOUGHT_BETS (buyer_id, bet_id, quantity, result, date_bought, date_resolved) VALUES
(1, 1, 10, NULL, TO_DATE('2025-03-01', 'YYYY-MM-DD'), NULL),
(2, 2, 5, NULL, TO_DATE('2025-03-02', 'YYYY-MM-DD'), NULL),
(3, 3, 20, NULL, TO_DATE('2025-03-03', 'YYYY-MM-DD'), NULL);

INSERT INTO QUESTS (quest_id, author_id, group_id, quest_desc, reward_amount, due_date, quest_status) VALUES
(1, 1, 1, 'Complete a sports trivia quiz', 50, TO_DATE('2025-04-01', 'YYYY-MM-DD'), 'Open'),
(2, 2, 2, 'Win a gaming tournament', 100, TO_DATE('2025-04-05', 'YYYY-MM-DD'), 'Open'),
(3, 3, 3, 'Read and review a book', 75, TO_DATE('2025-04-10', 'YYYY-MM-DD'), 'Closed');

INSERT INTO QUEST_SUBMISSIONS (submission_id, user_id, quest_id, submission_photo, submission_date_time, comments, status) VALUES
(1, 1, 1, 'photo1.jpg', CURRENT_TIMESTAMP, '', 'Pending'),
(2, 2, 2, 'photo2.jpg', CURRENT_TIMESTAMP, '', 'Pending'),
(3, 3, 3, 'photo3.jpg', CURRENT_TIMESTAMP, '', 'Pending'),
(4, 1, 2, 'photo4.jpg', CURRENT_TIMESTAMP, '', 'Accepted'),
(5, 2, 3, 'photo5.jpg', CURRENT_TIMESTAMP, '', 'Accepted'),
(6, 3, 1, 'photo6.jpg', CURRENT_TIMESTAMP, '', 'Accepted');
