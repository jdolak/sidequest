"use client";
import React from "react";
import styles from "styles.css";
import "./CardHolder/Section.js";
import "../Card/Card.js";
import Menu from "../Menu/Menu.js";


const Dashboard = () => {
  const quests = [
    { title: "Read 50 Pages By Sunday", creator: "csuwita", coins: 100 },
    { title: "Read 50 Pages By Sunday", creator: "csuwita", coins: 100 },
    { title: "Read 50 Pages By Sunday", creator: "csuwita", coins: 100 },
    { title: "Read 50 Pages By Sunday", creator: "csuwita", coins: 100 },
  ];

  const bets = [
    {
      title: "Is Notre Dame Winning the WBB Championship?",
      creator: "csuwita",
    },
    { title: "Read 50 Pages By Sunday", creator: "csuwita" },
    { title: "Read 50 Pages By Sunday", creator: "csuwita" },
    { title: "Read 50 Pages By Sunday", creator: "csuwita" },
  ];

  return (
    <main className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>Flaherty Hall</h1>
        <p className={styles.members}>20 members</p>
        <div
          className={styles.coinsContainer}
          role="status"
          aria-label="100 coins available"
        >
          100 coins
        </div>
      </header>

      <Section
        title="Quests"
        actionText="View all quests"
        onActionClick={() => {}}
      >
        {quests.map((quest, index) => (
          <Card
            key={index}
            title={quest.title}
            creator={quest.creator}
            coins={quest.coins}
          />
        ))}
      </Section>

      <Section title="Bets" actionText="View all" onActionClick={() => {}}>
        {bets.map((bet, index) => (
          <Card key={index} title={bet.title} creator={bet.creator} />
        ))}
      </Section>
    </main>
  );
};

export default Dashboard;
