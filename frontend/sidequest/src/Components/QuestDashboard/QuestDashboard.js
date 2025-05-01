import React, { useEffect, useState } from "react";
import "./questdashboard.css"; // Updated to use standard CSS import
import Sidebar from "../Sidebar/Sidebar";
import backIcon from '../../assets/images/chevron.svg';
import Card from "../Cards/Card";
import { data, Link, useNavigate } from "react-router-dom";
import { getOpenQuests, getAcceptedQuestsByUser, getMyQuests } from "../../Services/Quests";
import { useGlobalStore } from '../../stores/globalStore.js';
import NewQuestModal from "../Modals/NewQuest.js";
import { getLoggedInUser } from "../../Services/Users";

const QuestDashboard = () => {
  const [openQuests, setOpenQuests] = useState([]);
  const [acceptedQuests, setAcceptedQuests] = useState([]);
  const [myQuests, setMyQuests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const groupID = useGlobalStore((state) => state.currGroupID);

  const [activeTab, setActiveTab] = React.useState("myQuests");
  const tabs = [
    { id: "myQuests", label: "My Quests" },
    { id: "acceptedQuests", label: "Accepted Quests" },
    { id: "openQuests", label: "Open Quests" },
  ];

  const activeTabLabel = tabs.find(tab => tab.id === activeTab)?.label;

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
}

  useEffect(() => {
    console.log("Group ID:", groupID); // Log the groupID to check its value
    getLoggedInUser().then((user) => {
        if (user.status === "false") {
            navigate("/login");
            return
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
    if (activeTab === "openQuests" && openQuests.length === 0) {
      getOpenQuests().then((response) => {
        console.log("OpenQuests:", response);
        setOpenQuests(response);
      }).catch((error) => {
        console.error("Error fetching quests:", error);
      });
    } else if (activeTab === "myQuests" && myQuests.length === 0) {
      getMyQuests().then((response) => {
        console.log("myQuests:", response);
        setMyQuests(response);
      }).catch((error) => {
        console.error("Error fetching quests:", error);
      });
    } else if (activeTab === "acceptedQuests" && acceptedQuests.length === 0) {
      getAcceptedQuestsByUser().then((response) => {
        console.log("acceptedQuests:", response);
        setAcceptedQuests(response);
      }).catch((error) => {
        console.error("Error fetching quests:", error);
      });
    }
  }, [activeTab, groupID]); // Ensure groupID is included in the dependency array

  return (
    <div className="quest-dashboard-main-container">
      <Sidebar />
      <div className="quest-dashboard-content-container">
        <div className="dashboardHeader">
          <Link onClick={goBack} className="backButton">
            <img src={backIcon} />
            <div className="backText">Back</div>
          </Link>
          <div className="headerContents">
            <div className="questTabs">
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
              <button className="open-quest-button" onClick={() => setShowModal(true)}>Open a quest</button>
            </div>
          </div>
        </div>
        <div className="quests">
              <div className="quest-row">
                {activeTab === "myQuests" &&
                myQuests.map((quest) => (
                  <Link to={`/quests/${quest.quest_id}`} state={{ sourceTab: activeTab }} className="quest-card-link" key={quest.quest_id}>
                    <Card
                      title={quest.quest_title}
                      creator={quest.username}
                      coins={quest.reward_amount}
                      date={quest.due_date}
                    />
                  </Link>
                ))}
              {activeTab === "acceptedQuests" &&
                acceptedQuests.map((quest) => (
                  <Link to={`/quests/${quest.quest_id}`} state={{ sourceTab: activeTab }} className="quest-card-link" key={quest.quest_id}>
                    <Card
                      title={quest.quest_title}
                      creator={quest.username}
                      coins={quest.reward_amount}
                      date={quest.due_date}
                    />
                  </Link>
                ))}
              {activeTab === "openQuests" &&
                openQuests.map((quest) => (
                  <Link to={`/quests/${quest.quest_id}`} state={{ sourceTab: activeTab }} className="quest-card-link" key={quest.quest_id}>
                    <Card
                      title={quest.quest_title}
                      creator={quest.username}
                      coins={quest.reward_amount}
                      date={quest.due_date}
                    />
                  </Link>
                ))}
              </div>
        </div>
      </div>

    {showModal && <NewQuestModal onClose={() => setShowModal(false)} />}

    </div>
  )
}

// function InputDesign() {
//   

//   const tabs = [
//     { id: "myQuests", label: "My Quests" },
//     { id: "acceptedQuests", label: "Accepted Quests" },
//     { id: "openQuests", label: "Open Quests" },
//   ];

//   const quests = Array(8).fill({
//     title: "Read 50 Pages By Sunday",
//     creator: "csuwita",
//     coins: "100",
//   });

//   return (
//     <main className="mainContainer">
//       <div className="contentWrapper">
//         <header className="dashboardHeader">
//           <img
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/6cd6f55de12b126ccbaea183ff2be563d1842724?placeholderIfAbsent=true&apiKey=3d8cc3c677d843f3b683e43ca9c35c9d"
//             alt="Dashboard Icon"
//             className="dashboardIcon"
//           />
//           <h2 className="myquests-dashboard">Dashboard</h2>
//         </header>

//         <nav className="navigationSection">
//           <div className="tabsContainer" role="tablist">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 role="tab"
//                 aria-selected={activeTab === tab.id}
//                 aria-controls={`${tab.id}-panel`}
//                 className={activeTab === tab.id ? "tab" : "tab2"}
//                 onClick={() => setActiveTab(tab.id)}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>

//           <section className="questHeaderSection">
//             <h1 className="myQuests">My Quests</h1>
//             <div
//               className="coins"
//               role="status"
//               aria-label="Available coins"
//             >
//               100 coins
//             </div>
//           </section>
//         </nav>

//         <section className="questsSection">
//           <div className="questsGrid">
//             <div className="questRow">
//               {quests.slice(0, 4).map((quest, index) => (
//                 <Card
//                   key={index}
//                   title={quest.title}
//                   creator={quest.creator}
//                   coins={quest.coins}
//                 />
//               ))}
//             </div>
//             <div className="questRow">
//               {quests.slice(4, 8).map((quest, index) => (
//                 <Card
//                   key={index + 4}
//                   title={quest.title}
//                   creator={quest.creator}
//                   coins={quest.coins}
//                 />
//               ))}
//             </div>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }

export default QuestDashboard;
