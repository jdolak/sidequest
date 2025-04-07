import React from "react";
import styles from "./Card.module.css";

const Card = ({ title, creator, coins }) => {
  return (
    <article className={styles.card} role="listitem">
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.details}>
        <p className={styles.creator}>Created by {creator}</p>
        {coins && <p className={styles.coins}>{coins} coins</p>}
      </div>
    </article>
  );
};

export default Card;
