"use client";
import * as React from "react";
import styles from "styles.css";
import Card from "../Card/Card";

function InputDesign() {
  const [activeTab, setActiveTab] = useState("myQuests");

  const tabs = [
    { id: "myQuests", label: "My Quests" },
    { id: "acceptedQuests", label: "Accepted Quests" },
    { id: "openQuests", label: "Open Quests" },
  ];

  const quests = Array(8).fill({
    title: "Read 50 Pages By Sunday",
    creator: "csuwita",
    coins: "100",
  });

  return (
    <main className={styles.mainContainer}>
      <div className={styles.contentWrapper}>
        <header className={styles.dashboardHeader}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6cd6f55de12b126ccbaea183ff2be563d1842724?placeholderIfAbsent=true&apiKey=3d8cc3c677d843f3b683e43ca9c35c9d"
            alt="Dashboard Icon"
            className={styles.dashboardIcon}
          />
          <h2 className={styles.dashboard}>Dashboard</h2>
        </header>

        <nav className={styles.navigationSection}>
          <div className={styles.tabsContainer} role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`${tab.id}-panel`}
                className={activeTab === tab.id ? styles.tab : styles.tab2}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <section className={styles.questHeaderSection}>
            <h1 className={styles.myQuests}>My Quests</h1>
            <div
              className={styles.coins}
              role="status"
              aria-label="Available coins"
            >
              100 coins
            </div>
          </section>
        </nav>

        <section className={styles.questsSection}>
          <div className={styles.questsGrid}>
            <div className={styles.questRow}>
              {quests.slice(0, 4).map((quest, index) => (
                <Card
                  key={index}
                  title={quest.title}
                  creator={quest.creator}
                  coins={quest.coins}
                />
              ))}
            </div>
            <div className={styles.questRow}>
              {quests.slice(4, 8).map((quest, index) => (
                <Card
                  key={index + 4}
                  title={quest.title}
                  creator={quest.creator}
                  coins={quest.coins}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default InputDesign;
