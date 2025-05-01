import React from "react";
import "./card.css";

const Card = ({ title, creator, coins, date, odds }) => {
  console.log("Card component props:", { title, creator, coins, date, odds });
  return (

    <article class="card" role="listitem">
       <div class="card-title">{title}</div>
       <div class="card-desc">
        {date && <div>Closes on {date}</div>}
         <div>Created by {creator}</div>
         {coins && <div>{coins} coins</div>}
         {odds && <div>Odds: {odds}</div>}
       </div>
     </article>
  );
};

export default Card;
