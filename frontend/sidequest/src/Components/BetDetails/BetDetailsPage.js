"use client";
import * as React from "react";
import styles from "./BettingPage.module.css";

function BettingPage() {
  const handleBack = () => {
    // Handle back navigation
  };

  const handleBetYes = () => {
    // Handle yes bet
  };

  const handleBetNo = () => {
    // Handle no bet
  };

  return (
    <main className={styles.pageContainer}>
      <section className={styles.headerSection}>
        <nav className={styles.navigation}>
          <button
            onClick={handleBack}
            className={styles.backButton}
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
        </nav>
        <article className={styles.betInfo}>
          <h1 className={styles.betTitle}>
            Is Notre Dame Winning the WBB Championship?
          </h1>
          <p className={styles.creator}>Created by csuwita</p>
          <p className={styles.closingDate}>Bet closes on March 30, 2025</p>
        </article>
      </section>

      <section className={styles.betContent}>
        <div className={styles.betDetails}>
          <article className={styles.descriptionSection}>
            <h2 className={styles.sectionTitle}>Description</h2>
            <p className={styles.descriptionText}>
              Place your bets on whether Notre Dame will win the Final
              Championship.
            </p>
          </article>

          <article className={styles.oddsSection}>
            <h2 className={styles.sectionTitle}>Odds</h2>
            <p className={styles.oddsText}>64-36</p>
          </article>

          <article className={styles.betAmountSection}>
            <h2 className={styles.sectionTitle}>
              Number of bets you'd like to place
            </h2>
            <input
              type="number"
              className={styles.betInput}
              aria-label="Enter number of bets"
              min="1"
              placeholder="Value"
            />
          </article>
        </div>

        <div className={styles.actionButtons}>
          <button
            onClick={handleBetYes}
            className={styles.betYesButton}
            aria-label="Place bet for Yes"
          >
            Buy yes
          </button>
          <button
            onClick={handleBetNo}
            className={styles.betNoButton}
            aria-label="Place bet for No"
          >
            Buy no
          </button>
        </div>
      </section>
    </main>
  );
}

export default BettingPage;
