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

const Card = () => {
  return (
    <div class="card">
      <div class="card-title">Read 50 pages by Sunday</div>
      <div class="card-desc">
        <div>Created by csuwita</div>
        <div>100 coins</div>
      </div>
    </div>
  )
}

export default Card;
