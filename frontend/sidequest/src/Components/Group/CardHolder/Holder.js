import React from "react";
import "./styles.css";

const Section = ({ title, actionText, onActionClick, children }) => {
  return (
    <section className="section">
      <div className="header">
        <h2 className="title">{title}</h2>
        <button
          className="action"
          onClick={onActionClick}
          aria-label={`${actionText} for ${title}`}
        >
          {actionText}
        </button>
      </div>
      <div className="content" role="list">
        {children}
      </div>
    </section>
  );
};

export default Section;
