import "./questdetails.css";
import React, {useEffect,useState} from "react";
import Sidebar from "../Sidebar/Sidebar.js";
import backIcon from '../../assets/images/chevron.svg';
import { Link } from "react-router-dom";
import { getQuest } from "../../Services/Quests.js";
import { useParams } from "react-router-dom";

const QuestDetails = () => {
    const { questID } = useParams();
    const [quest, setQuest] = useState(null);

    useEffect(() => {
        getQuest(questID).then((response) => {
            console.log("quest:", response);
            setQuest(response);
        }).catch((error) => {
            console.error("Error fetching quest:", error);
        });
    }, [questID]);

  return (
    <div className="quest-details-main-container">
        {/* <div className="quest-details-main-container"> */}
        <Sidebar />
        <div className="quest-details-content-container">
            <div className="quest-details-header">
                <Link to="/quests/" className="back-button">
                    <img src={backIcon} />
                    <div className="back-text">Back</div>
                </Link>
                <div className="quest-details-header-contents"> 
                    <div className="quest-details-title"></div>
                    <div>Created by</div>
                    <div>Quest closes on </div>
                </div>
            </div>
            <div className="quest-details-body">
                <div className="quest-details-content">
                    <div className="quest-details-text">
                        <div className="quest-details-subheading">Description</div>
                        <div></div>
                    </div>
                    <div className="quest-details-text">
                        <div className="quest-details-subheading">Incentive</div>
                        <div></div>
                    </div>
                </div>

                <div className="accept-button">
                    Accept quest
                </div>
            </div>
        </div>
        {/* </div> */}
    </div>
  )
}

export default QuestDetails;

// function QuestDetails() {
//   const handleBackClick = () => {
//     // Handle back navigation
//     window.history.back();
//   };

//   const handleAcceptQuest = () => {
//     // Handle quest acceptance
//     console.log("Quest accepted");
//   };

//   return (
//     <div className="layoutContainer">
//       <link
//         href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@700&family=Karla:wght@400;700&display=swap"
//         rel="stylesheet"
//       />
//       <Sidebar />
//       <div className="questContainer">
//         <header className="headerSection">
//           <button
//             onClick={handleBackClick}
//             className="backButton"
//             aria-label="Go back"
//           >
//             <svg
//               width="64"
//               height="21"
//               viewBox="0 0 64 21"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M10 19.5L1 10.5L10 1.5"
//                 stroke="#2F184B"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <text
//                 fill="#2F184B"
//                 xmlSpace="preserve"
//                 style={{ whiteSpace: "pre" }}
//                 fontFamily="Karla"
//                 fontSize="16"
//                 fontWeight="bold"
//               >
//                 <tspan x="26" y="15.82">
//                   Back
//                 </tspan>
//               </text>
//             </svg>
//           </button>
//         </header>

//         <section className="questHeader">
//           <h1 className="questTitle">Read 50 Pages by Sunday</h1>
//           <p className="questCreator">Created by csuwita</p>
//           <p className="questDueDate">Due Date: March 30, 2025</p>
//         </section>

//         <section className="questContent">
//           <div className="descriptionSection">
//             <h2 className="sectionTitle">Description</h2>
//             <p className="sectionText">
//               Read 50 pages of the following book and give me an accurate
//               summary. Winner gets 100 coins and a free dining hall meal swipe.
//             </p>
//           </div>

//           <div className="incentiveSection">
//             <h2 className="sectionTitle">Incentive</h2>
//             <p className="sectionText">Free dining hall meal swipe</p>
//           </div>

//           <button
//             className="acceptButton"
//             onClick={handleAcceptQuest}
//             aria-label="Accept quest to read 50 pages"
//           >
//             Accept quest
//           </button>
//         </section>
//       </div>
//     </div>
//   );
// }

