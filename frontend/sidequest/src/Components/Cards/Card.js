import React from "react";
import "./card.css";

const Card = ({ title, creator, coins, date, odds }) => {
  return (

    <article class="card" role="listitem">
       <div class="card-title">{title}</div>
       <div class="card-desc">
        <div>Quest closes on {date}</div>
         <div>Created by {creator}</div>
         {coins && <div>{coins} coins</div>}
         {odds && <div>Odds: {odds}</div>}
       </div>
     </article>

    /* <div className="card" role="listitem">
      <h3 className="card-title">{title}</h3>
      <p className="date">{date}</p>
      <div className="details">
        <p className="creator">Created by {creator}</p>
        {coins && <p className="coins">{coins} coins</p>}
      </div>
    </div> */
  );
};

export default Card;
