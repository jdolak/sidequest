"use client";
import React from "react";
import "./styles.css"; 
import Holder from "./CardHolder/Holder.js";
import Card from "../Card/Card.js";

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
    <main className="dashboard">
      <header className="header">
        <h1 className="title">Flaherty Hall</h1>
        <p className="members">20 members</p>
        <div
          className="coinsContainer"
          role="status"
          aria-label="100 coins available"
        >
          100 coins
        </div>
      </header>

      <Holder
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
      </Holder>

      <Holder title="Bets" actionText="View all" onActionClick={() => {}}>
        {bets.map((bet, index) => (
          <Card key={index} title={bet.title} creator={bet.creator} />
        ))}
      </Holder>
    </main>
  );
};

export default Dashboard;
