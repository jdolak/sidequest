from flask import g
from sqapp.db import sql_one

def can_afford(group_id, amount):
    """
    Check if the user is broke in the given group.
    """
    result = sql_one(g.db_session, "SELECT currency FROM SQ_GROUPS_USER WHERE group_id = :group_id AND user_id = :user_id", {"group_id": group_id, "user_id": g.user})
    if result["currency"] - int(amount) > 0:
        return True
    return False