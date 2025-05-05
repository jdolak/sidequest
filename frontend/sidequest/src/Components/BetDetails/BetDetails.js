import "./betdetails.css";
import React, {useEffect,useState} from "react";
import Sidebar from "../Sidebar/Sidebar.js";
// import backIcon from '../../assets/images/chevron.svg';
import { Link } from "react-router-dom";
import { getBet, buyBet, getBoughtBet } from "../../Services/Bets.js";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getUsersGroupProfile } from "../../Services/Users.js";

const BetDetails = () => {
    const location = useLocation();
    const [bet, setBet] = useState(null);
    const [myProfile, setMyProfile] = useState(null);
    const [boughtBets, setBoughtBets] = useState(null);
    // const [seller, setSeller] = useState({});
    // const sourceTab = location.state?.sourceTab;
    const navigate = useNavigate();
    const [needsRefresh, setNeedsRefresh] = useState(false);
    
    const goBack = () => {
        navigate(-1);
    }
    
    const betID = useParams().id;

    useEffect(() => {
        if (betID) {
          getBet(betID)
            .then((response) => {
              setBet(response);
            })
            .catch((error) => {
              console.error("Error fetching bet:", error);
            });
        
            getBoughtBet(betID)
                .then((response) => {
                console.log("Bought bets:", response);
                setBoughtBets(response);
            })
            .catch((error) => {
                console.error("Error fetching bought bets:", error);
            });
        }
      
        // Fetch the logged-in user's group profile
        getUsersGroupProfile()
          .then((response) => {
            setMyProfile(response);
          })
          .catch((error) => {
            console.error("Error fetching user profile:", error);
          });
      }, [betID, needsRefresh]);

    function getBuyCost(quantity) {
        console.log(bet)
        if (bet?.side.toLowerCase() === 'yes' || bet?.side.toLowerCase() === "y") {
            return (100 - bet?.odds) * quantity;
        } if (bet?.side.toLowerCase() === 'no' || bet?.side.toLowerCase() === "n") {
            return bet?.odds * quantity;
        }
        else{
            alert("Error: Bet side is not valid.");
            return -1;
        }
    };

    function handleBuyBet() {
        const buyQuantity = document.querySelector("input[type='number']").value;
        if (buyQuantity === null || buyQuantity <= 0 || buyQuantity > bet?.max_quantity) {
            alert("Please enter a valid quantity.");
            return;
        }
        const cost = getBuyCost(buyQuantity);
        if (cost < 0) {
            console.error("invalid bet "+bet);
            return;
        }
        if (window.confirm("Are you sure you want to buy this bet? It will cost you " + cost + " coins.")) {
            const user = getUsersGroupProfile().then((user) => {
                if (user?.currency >= cost && user?.user_id && betID) {
                    const buyerSide = bet?.side.toLowerCase() === "yes" || bet?.side.toLowerCase() === "y" ? "no" : "yes";
                    buyBet(betID, buyQuantity, buyerSide, bet?.status).then((response) => {
                        setNeedsRefresh((prev) => !prev);
                    }).catch((error) => {
                        console.error("Error buying bet:", error);
                    });
                } else if (user?.currency < cost) {
                    alert("You do not have enough coins to buy this bet.");
                } else {
                    console.error("invalid user:", user);
                    navigate("/");
                }
            }).catch((error) => {
                console.error("Error fetching user:", error);
            });
        };
    };

    const OpenBetContent = () => {
        return (
            <div>
                <div className="bet-text">
                    <div className="bet-subheading">Number of bets you'd like to place</div>
                    <input type="number" placeholder="Value" />
                </div>
                <div className="button-group">
                    {bet?.side.toLowerCase() === "no" || bet?.side.toLowerCase() === "n" ? (
                    <div className="yes-button" onClick={handleBuyBet}>
                        Buy Yes
                    </div>
                    ) : null}
                    {bet?.side.toLowerCase() === "yes" || bet?.side.toLowerCase() === "y" ? (
                    <div className="no-button" onClick={handleBuyBet}>
                        Buy No
                    </div>
                    ) : null}
                </div>
            </div>
        )
    }

    const AcceptedBetContent = () => {

        const isCreator = myProfile?.username === bet?.username; 

        if (!boughtBets || boughtBets.length === 0) {
            return (
                <div className="bet-text">
                    <div className="bet-subheading">Bets Bought</div>
                    <div>No bets bought yet.</div>
                </div>
            );
        }
    
        const quantity = boughtBets[0]?.quantity;
    
        if (bet?.status.toLowerCase() === 'accepted' && !isCreator) {
            return (
                <div className="bet-text">
                    <div className="bet-subheading">Bets Bought</div>
                    <div>{quantity} bet{quantity!=1 ? "s" : ""}</div>
                </div>
            );

        }
    };

    const MyBetContent = () => {
        const isCreator = myProfile?.username === bet?.username;
    
        const hasBoughtBets = Array.isArray(boughtBets) && boughtBets.length > 0;
        const buyer = hasBoughtBets ? boughtBets[0] : null;
    
        if (bet?.status?.toLowerCase() === 'accepted' && isCreator && buyer) {
            return (
                <div className="mybet-content">
                    <div>
                        {buyer.quantity} bet{buyer.quantity !== 1 ? "s" : ""} accepted by {buyer.username}
                    </div>
                    <div className="button-group">
                        <button className="yes-button">Resolve Yes</button>
                        <button className="no-button">Resolve No</button>
                    </div>
                </div>
            );
        }
    
        if (bet?.status === 'resolved') {
            return (
                <div className="mybet-content">
                    <div>{bet?.buyer_id} {bet?.result}!</div>
                </div>
            );
        }
    
        return null;
    };

  return (
    <div className="bet-details-main-container">
        <Sidebar />
        <div className="bet-details-content-container">
            <div className="bet-header">
                <Link onClick={goBack} className="back-button">
                    <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 19L1.5 10L10.5 1" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div className="back-text">Back</div>
                </Link>
                <div className="header-contents"> 
                    <div className="bet-title">{bet?.question}</div>
                    <div>Created by {bet?.username}</div>
                    {/* <div>Bet closes on </div> */}
                </div>
            </div>
            <div className="bet-detail-body">
                <div className="bet-details">
                    <div className="bet-text">
                        <div className="bet-subheading">Status</div>
                        <div>{bet?.status?.charAt(0).toUpperCase() + bet?.status?.slice(1)}</div>
                    </div>
                    <div className="bet-text">
                        <div className="bet-subheading">Description</div>
                        <div>{bet?.description}</div>
                    </div>
                    <div className="bet-text">
                        <div className="bet-subheading">Odds</div>
                        <div>{bet?.odds}%</div>
                    </div>
                    <div className="bet-text">
                        <div className="bet-subheading">{bet?.status?.toLowerCase() === 'accepted' ? 'Quantity' : 'Bets Available'}</div>
                        <div>{bet?.max_quantity}</div>
                    </div>
                    {bet?.status?.toLowerCase() === 'accepted' && <AcceptedBetContent />}
                </div>
                {bet?.status?.toLowerCase() === 'open' && myProfile?.username !== bet?.username && <OpenBetContent />}
                <MyBetContent />
            </div>
        </div>
    </div>
  )
}

export default BetDetails;