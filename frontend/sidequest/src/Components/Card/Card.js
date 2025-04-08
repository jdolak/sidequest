import React from "react";
import "./styles.css";

const Card = ({ title, creator, coins }) => {
  return (
    <article className="card" role="listitem">
      <h3 className="title">{title}</h3>
      <div className="details">
        <p className="creator">Created by {creator}</p>
        {coins && <p className="coins">{coins} coins</p>}
      </div>
    </article>
  );
};

export default Card;
