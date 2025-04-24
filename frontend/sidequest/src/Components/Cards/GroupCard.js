import React from "react";
import "./groupcard.css";
import { joinGroup } from "../../Services/Groups";
import { useNavigate } from "react-router-dom";

const GroupCard = (group) => {
  // data is in group.group
  const navigate = useNavigate();

  const handleJoinGroup = () => {
    joinGroup(group.group.invite_code).then((response) => {
        alert(response?.message);
        navigate(`/groups/${group.group.group_id}`);
      }).catch((error) => {
        console.error("Error joining group:", error);
        alert("Error joining group. Please try again later.");
      });
  }

  return (
    <div className="card">
        <div className="card-desc">
            <div className="card-title">{group.group.group_name}</div>
            <div>{group.group.group_members} members</div>
        </div>
        <button className="join-btn" onClick={() => {handleJoinGroup()}}>Join group</button>
    </div>
  )
}

export default GroupCard;