import "./betdetails.css";
import React, {useEffect,useState} from "react";
import Sidebar from "../Sidebar/Sidebar.js";
import backIcon from '../../assets/images/chevron.svg';
import { Link } from "react-router-dom";
import { getBet } from "../../Services/Bets.js";
import { useParams } from "react-router-dom";


const BetDetails = () => {
    const { betID } = useParams();
    const [bet, setBet] = useState(null);

    // useEffect(() => {
    //     getBet(betID).then((response) => {
    //         console.log("bet:", response);
    //         setBet(response);
    //     }).catch((error) => {
    //         console.error("Error fetching bet:", error);
    //     });
    // }, [betID]);

  return (
    <div className="page-layout">
        <div className="main-container">
            <Sidebar />
            <div className="bet-detail-container">
                <div className="bet-header">
                    <Link to="/" className="back-button">
                        <img src={backIcon} />
                        <div className="back-text">Back</div>
                    </Link>
                    <div className="header-contents"> 
                        <div className="bet-title">Is Notre Dame Winning the Fencing Championship?</div>
                        <div>Created by csuwita</div>
                        <div>Bet closes on March 30, 2025</div>
                    </div>
                </div>
                <div className="bet-detail-body">
                    <div className="bet-details">
                        <div className="bet-text">
                            <div className="bet-subheading">Description</div>
                            <div>Place your bets on whether Notre Dame will win the Final Championship.</div>
                        </div>
                        <div className="bet-text">
                            <div className="bet-subheading">Odds</div>
                            <div>64-36</div>
                        </div>
                        <div className="bet-text">
                            <div className="bet-subheading">Number of bets you'd like to place</div>
                            <input type="number" placeholder="Value" />
                        </div>
                    </div>

                    <div className="button-group">
                      <div className="yes-button">
                          Buy yes
                      </div>
                      <div className="no-button">
                          Buy no
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BetDetails;

// "use client";
// import * as React from "react";
// import "./styles.css";

// function BettingPage() {
//   const handleBack = () => {
//     // Handle back navigation
//   };

//   const handleBetYes = () => {
//     // Handle yes bet
//   };

//   const handleBetNo = () => {
//     // Handle no bet
//   };

//   return (
//     <main className="pageContainer">
//       <section className="headerSection">
//         <nav className="navigation">
//           <button
//             onClick={handleBack}
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
//         </nav>
//         <article className="betInfo">
//           <h1 className="betTitle">
//             Is Notre Dame Winning the WBB Championship?
//           </h1>
//           <p className="creator">Created by csuwita</p>
//           <p className="closingDate">Bet closes on March 30, 2025</p>
//         </article>
//       </section>

//       <section className="betContent">
//         <div className="betDetails">
//           <article className="descriptionSection">
//             <h2 className="sectionTitle">Description</h2>
//             <p className="descriptionText">
//               Place your bets on whether Notre Dame will win the Final
//               Championship.
//             </p>
//           </article>

//           <article className="oddsSection">
//             <h2 className="sectionTitle">Odds</h2>
//             <p className="oddsText">64-36</p>
//           </article>

//           <article className="betAmountSection">
//             <h2 className="sectionTitle">
//               Number of bets you'd like to place
//             </h2>
//             <input
//               type="number"
//               className="betInput"
//               aria-label="Enter number of bets"
//               min="1"
//               placeholder="Value"
//             />
//           </article>
//         </div>

//         <div className="actionButtons">
//           <button
//             onClick={handleBetYes}
//             className="betYesButton"
//             aria-label="Place bet for Yes"
//           >
//             Buy yes
//           </button>
//           <button
//             onClick={handleBetNo}
//             className="betNoButton"
//             aria-label="Place bet for No"
//           >
//             Buy no
//           </button>
//         </div>
//       </section>
//     </main>
//   );
// }

// export default BettingPage;
