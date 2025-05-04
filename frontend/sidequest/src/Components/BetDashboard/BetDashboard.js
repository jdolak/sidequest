import React, {useEffect,useState} from "react";
import "./betdashboard.css"; // Updated to use standard CSS import
import Sidebar from "../Sidebar/Sidebar";
import backIcon from '../../assets/images/chevron.svg';
import Card from "../Cards/Card";
import { Link, useNavigate } from "react-router-dom";
import { getAllBets, getAcceptedBets, getMyBets } from "../../Services/Bets";
import NewBetModal from "../Modals/NewBet.js";
import { getLoggedInUser } from "../../Services/Users.js";

const BetDashboard = () => {

  const [openBets, setOpenBets] = useState([]);
  const [acceptedBets, setAcceptedBets] = useState([]);
  const [myBets, setMyBets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const groupID = sessionStorage.getItem("groupID");

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

  const refreshBets = () => {
    if (activeTab === "openBets") {
      getAllBets().then((response) => {
        if (typeof(response) !== "list") {
          setOpenBets([response]);
        } else {
          setOpenBets(response);
        }
      }).catch(console.error);
    } else if (activeTab === "myBets") {
      getMyBets().then(setMyBets).catch(console.error);
    } else if (activeTab === "acceptedBets") {
      getAcceptedBets().then(setAcceptedBets).catch(console.error);
    }
  };
  
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
          if (typeof(response) !== "list") {
            setOpenBets([response]);
          } else {
            setOpenBets(response);
          }
        }).catch((error) => {
          console.error("Error fetching Bets:", error);
        });
      }
      else if (activeTab === "myBets" && myBets.length === 0) {
        getMyBets().then((response) => {
          setMyBets(response);
        }).catch((error) => {
          console.error("Error fetching Bets:", error);
        });
      }
      else if (activeTab === "acceptedBets" && acceptedBets.length === 0) {
        getAcceptedBets().then((response) => {
          setAcceptedBets(response);
        }).catch((error) => {
          console.error("Error fetching Bets:", error);
        });
      }
    }, [activeTab, groupID]);

  return (
    <div className="bet-dashboard-main-container">
      <Sidebar />
      <div className="bet-dashboard-content-container">
        <div className="dashboardHeader">
          <Link onClick={goBack} className="backButton">
            <img src={backIcon} />
            <div className="backText">Back</div>
          </Link>
          <div className="headerContents">
            <div className="betTabs">
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
            <div className="tabHeader">
              <div>{activeTabLabel}</div>
              <button className="open-bet-button" onClick={() => setShowModal(true)}>Open a bet</button>
            </div>
          </div>
        </div>
        <div className="bets">
              <div className="bet-row">
              {activeTab === "myBets" &&
                myBets.map((bet) => (
                  <Link to={`/bets/${bet.bet_id}`} className="bet-card-link" key={bet.bet_id}>
                    <Card
                      title={bet.question}
                      creator={bet.username}
                      bet_desc={bet.description}
                      odds={bet.odds}
                    />
                  </Link>
                ))}
              {activeTab === "acceptedBets" &&
                acceptedBets.map((bet) => (
                  <Link to={`/bets/${bet.bet_id}`} className="bet-card-link" key={bet.bet_id}>
                    <Card
                      title={bet.question}
                      creator={bet.username}
                      bet_desc={bet.description}
                      odds={bet.odds}
                    />
                  </Link>
                ))}
              {activeTab === "openBets" &&
                openBets.map((bet) => ( 
                  <Link to={`/bets/${bet.bet_id}`} className="bet-card-link" key={bet.bet_id}>
                    <Card
                      title={bet.question}
                      creator={bet.username}
                      bet_desc={bet.description}
                      odds={bet.odds}
                    />
                  </Link>
                ))}
              </div>
        </div>
      </div>
    
    {showModal && <NewBetModal onClose={() => setShowModal(false)} onSuccess={refreshBets} />}

    </div>
  )
}

export default BetDashboard;