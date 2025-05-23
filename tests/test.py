import requests

BASE_URL = "https://sq.jdolak.com"

def test_full_user_flow():
    session = requests.Session()

    # 1. Login
    login_payload = {
        "username": "test",
        "password": "test"
    }
    login_response = session.post(f"{BASE_URL}/login", json=login_payload)
    assert login_response.status_code == 200

    # 2. Make a group
    make_group_payload = {
        "groupname": "test",
        "groupdesc": "test",
        "groupvisibility" : 'Y',
        "groupcoins" : 1000,
    }
    join_response = session.post(f"{BASE_URL}/groups/create", json=make_group_payload)
    assert join_response.status_code == 201

    # 3. Get Quests

    group_id = 21
    quests_response = session.get(f"{BASE_URL}/quests/all/{group_id}")
    assert quests_response.status_code == 200
    print("Existing Quests:", quests_response.json())

    # 4. Create Quest
    create_quest_payload = {
        "group_id": group_id,
        "quest_title": "Test Quest",
        "quest_desc": "Complete the test quest",
        "reward_amount": 100,
        "due_date": "2025-06-01"
    }
    create_quest_resp = session.post(f"{BASE_URL}/quests", json=create_quest_payload)
    assert create_quest_resp.status_code == 201

    # 5. Get Bets
    bets_response = session.get(f"{BASE_URL}/bets/all/{group_id}")
    assert bets_response.status_code == 200
    print("Existing Bets:", bets_response.json())

    # 6. Create Bet
    create_bet_payload = {
        "group_id": group_id,
        "question": "Will it rain tomorrow?",
        "description": "Weather bet",
        "odds": 2,
        "side": "Y",
        "max_quantity": 10
    }
    create_bet_resp = session.post(f"{BASE_URL}/bets", json=create_bet_payload)
    assert create_bet_resp.status_code == 201

    print("Test Flow Completed Successfully")
