import React, {useEffect,useState} from "react";
import "./betdashboard.css"; // Updated to use standard CSS import
import Sidebar from "../Sidebar/Sidebar";
import backIcon from '../../assets/images/chevron.svg';
import BetCard from "../Cards/BetCard";
import { Link } from "react-router-dom";

const BetDashboard = () => {
  const [openBets, setOpenBets] = useState([]);
  const [acceptedBets, setAcceptedBets] = useState([]);
  const [myBets, setMyBets] = useState([]);

  const [activeTab, setActiveTab] = React.useState("myBets");
  const tabs = [
        { id: "myBets", label: "My Bets" },
        { id: "acceptedBets", label: "Accepted Bets" },
        { id: "openBets", label: "Open Bets" },
  ];
  
  // useEffect(() => {
  //     if (activeTab === "openBets" && openBets.length === 0) {
  //       getOpenBets().then((response) => {
  //         console.log("OpenBets:", response);
  //         setOpenBets(response);
  //       }).catch((error) => {
  //         console.error("Error fetching Bets:", error);
  //       });
  //     }
  //     else if (activeTab === "myBets" && myBets.length === 0) {
  //       getMyBets().then((response) => {
  //         console.log("myBets:", response);
  //         setMyBets(response);
  //       }).catch((error) => {
  //         console.error("Error fetching Bets:", error);
  //       });
  //     }
  //     else if (activeTab === "acceptedBets" && acceptedBets.length === 0) {
  //       getAcceptedBetsByUser().then((response) => {
  //         console.log("acceptedBets:", response);
  //         setAcceptedBets(response);
  //       }).catch((error) => {
  //         console.error("Error fetching Bets:", error);
  //       });
  //     }
  //   }, [activeTab]);

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
                <Link to="/bets/1" className="bet-card-link">
                  <BetCard />
                </Link>
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