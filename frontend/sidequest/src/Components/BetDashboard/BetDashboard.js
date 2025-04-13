"use client";
import React, {useState} from "react";
import "./betdashboard.css"; // Updated to use standard CSS import
import Sidebar from "../Sidebar/Sidebar";
import backIcon from '../../assets/images/chevron.svg';
import BetCard from "../Cards/BetCard";
import { Link } from "react-router-dom";

const BetDashboard = () => {

  const [activeTab, setActiveTab] = React.useState("myBets");
  const tabs = [
        { id: "myBets", label: "My Bets" },
        { id: "acceptedBets", label: "Accepted Bets" },
        { id: "openBets", label: "Open Bets" },
  ];

  return (
    <div class="mainContainer">
      <Sidebar />
      <div class="questDashboard">
        <div class="dashboardHeader">
          <Link to="/" className="backButton">
            <img src={backIcon} />
            <div className="backText">Dashboard</div>
          </Link>
          <div class="headerContents">
            <div class="betTabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`${tab.id}-panel`}
                  className={activeTab === tab.id ? "tab" : "tab2"}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div class="tabHeader">
              <div>My Bets</div>
            </div>
          </div>
        </div>
        <div class="bets">
              <div class="bet-row">
                <BetCard />
                <BetCard />
                <BetCard />
                <BetCard />
              </div>
        </div>
      </div>
    </div>
  )
}

export default BetDashboard;