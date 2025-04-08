import "./styles.css";
import * as React from "react";
import Sidebar from "../Sidebar/Sidebar.js";

function QuestDetails() {
  const handleBackClick = () => {
    // Handle back navigation
    window.history.back();
  };

  const handleAcceptQuest = () => {
    // Handle quest acceptance
    console.log("Quest accepted");
  };

  return (
    <div className="layoutContainer">
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@700&family=Karla:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <Sidebar />
      <div className="questContainer">
        <header className="headerSection">
          <button
            onClick={handleBackClick}
            className="backButton"
            aria-label="Go back"
          >
            <svg
              width="64"
              height="21"
              viewBox="0 0 64 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 19.5L1 10.5L10 1.5"
                stroke="#2F184B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text
                fill="#2F184B"
                xmlSpace="preserve"
                style={{ whiteSpace: "pre" }}
                fontFamily="Karla"
                fontSize="16"
                fontWeight="bold"
              >
                <tspan x="26" y="15.82">
                  Back
                </tspan>
              </text>
            </svg>
          </button>
        </header>

        <section className="questHeader">
          <h1 className="questTitle">Read 50 Pages by Sunday</h1>
          <p className="questCreator">Created by csuwita</p>
          <p className="questDueDate">Due Date: March 30, 2025</p>
        </section>

        <section className="questContent">
          <div className="descriptionSection">
            <h2 className="sectionTitle">Description</h2>
            <p className="sectionText">
              Read 50 pages of the following book and give me an accurate
              summary. Winner gets 100 coins and a free dining hall meal swipe.
            </p>
          </div>

          <div className="incentiveSection">
            <h2 className="sectionTitle">Incentive</h2>
            <p className="sectionText">Free dining hall meal swipe</p>
          </div>

          <button
            className="acceptButton"
            onClick={handleAcceptQuest}
            aria-label="Accept quest to read 50 pages"
          >
            Accept quest
          </button>
        </section>
      </div>
    </div>
  );
}

export default QuestDetails;
