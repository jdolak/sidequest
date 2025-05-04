import React from "react";
import "./card.css";

const Card = ({ title, creator, coins, date, odds }) => {
  return (

    <article className="card" role="listitem">
       <div className="card-title">{title}</div>
       <div className="card-desc">
        {date && <div>Closes on {date}</div>}
         <div>Created by {creator}</div>
         {coins && <div>{coins} coins</div>}
         {odds && <div>Odds: {odds}</div>}
       </div>
     </article>
  );
};

export default Card;
