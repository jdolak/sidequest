"use client";
import React, {useState} from "react";
import "./questdashboard.css"; // Updated to use standard CSS import
import Sidebar from "../Sidebar/Sidebar";
import backIcon from '../../assets/images/chevron.svg';
import QuestCard from "../Cards/QuestCard";

const QuestDashboard = () => {

  const [activeTab, setActiveTab] = React.useState("myQuests");
  const tabs = [
        { id: "myQuests", label: "My Quests" },
        { id: "acceptedQuests", label: "Accepted Quests" },
        { id: "openQuests", label: "Open Quests" },
  ];

  return (
    <div class="mainContainer">
      <Sidebar />
      <div class="questDashboard">
        <div class="dashboardHeader">
          <div class="backButton">
            <img src={backIcon} />
            <div class="backText">Dashboard</div>
          </div>
          <div class="headerContents">
            <div class="questTabs">
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
            </div>
          </div>
        </div>
        <div class="quests">

        </div>
      </div>
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
