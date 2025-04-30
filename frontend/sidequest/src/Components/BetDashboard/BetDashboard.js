import React, {useEffect,useState} from "react";
import "./betdashboard.css"; // Updated to use standard CSS import
import Sidebar from "../Sidebar/Sidebar";
import backIcon from '../../assets/images/chevron.svg';
import Card from "../Cards/Card";
import { Link, useNavigate } from "react-router-dom";
import { getAllBets, getAcceptedBets, getMyBets } from "../../Services/Bets";
import { useGlobalStore } from '../../stores/globalStore.js';
import NewBetModal from "../Modals/NewBet.js";
import { getLoggedInUser } from "../../Services/Users.js";

const BetDashboard = () => {

  const [openBets, setOpenBets] = useState([]);
  const [acceptedBets, setAcceptedBets] = useState([]);
  const [myBets, setMyBets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const groupID = useGlobalStore((state) => state.currGroupID);

  const [activeTab, setActiveTab] = React.useState("myBets");
  const tabs = [
        { id: "myBets", label: "My Bets" },
        { id: "acceptedBets", label: "Accepted Bets" },
        { id: "openBets", label: "Open Bets" },
  ];

  const activeTabLabel = tabs.find(tab => tab.id === activeTab)?.label;

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }
  
  useEffect(() => {
    // double check user is logged in
    getLoggedInUser().then((user) => {
        if (user.status === "false") {
            navigate("/login");
            return;
        }
        if (groupID === null){
            navigate("/search");
            return;
        }
    }).catch((error) => {
        console.error("Error checking logged-in user:", error);
        navigate("/login");
        return;
    });
    // get bets data
      if (activeTab === "openBets" && openBets.length === 0) {
        getAllBets().then((response) => {
          console.log("OpenBets:", response);
          setOpenBets(response);
        }).catch((error) => {
          console.error("Error fetching Bets:", error);
        });
      }
      else if (activeTab === "myBets" && myBets.length === 0) {
        getMyBets().then((response) => {
          console.log("myBets:", response);
          setMyBets(response);
        }).catch((error) => {
          console.error("Error fetching Bets:", error);
        });
      }
      else if (activeTab === "acceptedBets" && acceptedBets.length === 0) {
        getAcceptedBets().then((response) => {
          console.log("acceptedBets:", response);
          setAcceptedBets(response);
        }).catch((error) => {
          console.error("Error fetching Bets:", error);
        });
      }
    }, [activeTab, groupID]);

  return (
    <div class="bet-dashboard-main-container">
      <Sidebar />
      <div class="bet-dashboard-content-container">
        <div class="dashboardHeader">
          <Link onClick={goBack} className="backButton">
            <img src={backIcon} />
            <div className="backText">Back</div>
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
              <div>{activeTabLabel}</div>
              <button className="open-bet-button" onClick={() => setShowModal(true)}>Open a bet</button>
            </div>
          </div>
        </div>
        <div class="bets">
              <div class="bet-row">
              {activeTab === "myBets" &&
                myBets.map((bet) => (
                  <Link to={`/bets/${bet.bet_id}`} className="card-link" key={bet.bet_id}>
                    <Card
                      author_id={bet.author_id}
                      bet_desc={bet.bet_desc}
                      due_date={bet.due_date}
                      reward_amount={bet.reward_amount}
                    />
                  </Link>
                ))}
              {activeTab === "acceptedBets" &&
                acceptedBets.map((bet) => (
                  <Link to={`/bets/${bet.bet_id}`} className="card-link" key={bet.bet_id}>
                    <Card
                      author_id={bet.author_id}
                      bet_desc={bet.bet_desc}
                      due_date={bet.due_date}
                      reward_amount={bet.reward_amount}
                    />
                  </Link>
                ))}
              {activeTab === "openBets" &&
                openBets.map((bet) => (
                  <Link to={`/bets/${bet.bet_id}`} className="card-link" key={bet.bet_id}>
                    <Card
                      author_id={bet.author_id}
                      bet_desc={bet.bet_desc}
                      due_date={bet.due_date}
                      reward_amount={bet.reward_amount}
                    />
                  </Link>
                ))}
              </div>
        </div>
      </div>
    
    {showModal && <NewBetModal onClose={() => setShowModal(false)} />}

    </div>
  )
}

export default BetDashboard;