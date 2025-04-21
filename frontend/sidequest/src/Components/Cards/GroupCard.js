import React from "react";
import "./groupcard.css";


const GroupCard = () => {
  return (
    <div className="card">
        <div className="card-desc">
            <div className="card-title">Pickleball Club</div>
            <div>50 members</div>
        </div>
        <button className="join-btn">Join group</button>
    </div>
  )
}

export default GroupCard;