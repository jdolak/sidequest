import React from "react";
import styles from "./styles.css";

const Section = ({ title, actionText, onActionClick, children }) => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <button
          className={styles.action}
          onClick={onActionClick}
          aria-label={`${actionText} for ${title}`}
        >
          {actionText}
        </button>
      </div>
      <div className={styles.content} role="list">
        {children}
      </div>
    </section>
  );
};

export default Section;
