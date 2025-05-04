import React from "react";
import "./card.css";

// const Card = ({ title, creator, coins }) => {
//   return (
//     <article className="card" role="listitem">
//       <h3 className="title">{title}</h3>
//       <div className="details">
//         <p className="creator">Created by {creator}</p>
//         {coins && <p className="coins">{coins} coins</p>}
//       </div>
//     </article>
//   );
// };

const BetCard = ({ title, creator, coins, date, odds }) => {
  return (
    <article className="card" role="listitem">
       <div className="card-title">{title}</div>
       <div className="card-desc">
         <div>Created by {creator}</div>
         {coins && <div>{coins} coins</div>}
         {odds && <div>Odds: {odds}</div>}
       </div>
     </article>
  )
}

export default BetCard;
