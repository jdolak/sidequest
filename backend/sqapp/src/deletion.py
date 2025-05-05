from sqlalchemy import text
from sqapp import LOG
from flask import g, jsonify
from sqapp.src.auth import group_member_count

def delete_bet(bet_id):
    try:
        sql = "DELETE FROM AVAILABLE_BETS WHERE bet_id = :bet_id"
        g.db_session.execute(text(sql), {"bet_id": bet_id})
        LOG.info(f"Bet with ID {bet_id} deleted successfully.")
        return jsonify({"message": "Bet deleted successfully"}), 200
    except Exception as e:
        LOG.error(f"Error deleting bet: {e}")
        g.db_session.rollback()
        return jsonify({"error": "Failed to delete bet"}), 500
    
def delete_quest(quest_id):
    try:
        sql = "DELETE FROM QUESTS WHERE quest_id = :quest_id"
        g.db_session.execute(text(sql), {"quest_id": quest_id})
        LOG.info(f"Quest with ID {quest_id} deleted successfully.")
        return jsonify({"message": "Quest deleted successfully"}), 200
    except Exception as e:
        LOG.error(f"Error deleting quest: {e}")
        g.db_session.rollback()
        return jsonify({"error": "Failed to delete quest"}), 500
    

def delete_group(group_id):
    try:
        sql = "DELETE FROM SQ_GROUPS WHERE group_id = :group_id"
        g.db_session.execute(text(sql), {"group_id": group_id})
        LOG.info(f"Group with ID {group_id} deleted successfully.")
        return jsonify({"message": "Group deleted successfully"}), 200
    except Exception as e:
        LOG.error(f"Error deleting group: {e}")
        g.db_session.rollback()
        return jsonify({"error": "Failed to delete group"}), 500
    
def leave_group(group_id):
    try:
        sql = "DELETE FROM SQ_GROUPS WHERE group_id = :group_id AND user_id = :user_id"
        g.db_session.execute(text(sql), {"group_id": group_id, "user_id": g.user})

        if not group_member_count(group_id):
            delete_group(group_id)
            
        LOG.info(f"User {g.user} left group with ID {group_id} successfully.")
        return jsonify({"message": "Left group successfully"}), 200
    except Exception as e:
        LOG.error(f"Error leaving group: {e}")
        g.db_session.rollback()
        return jsonify({"error": "Failed to leave group"}), 500


