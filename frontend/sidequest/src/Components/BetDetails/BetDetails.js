import "./betdetails.css";
import React, {useEffect,useState} from "react";
import Sidebar from "../Sidebar/Sidebar.js";
import backIcon from '../../assets/images/chevron.svg';
import { Link } from "react-router-dom";
import { getBet, buyBet } from "../../Services/Bets.js";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getUsersGroupProfile } from "../../Services/Users.js";

const BetDetails = () => {
    const location = useLocation();
    const [bet, setBet] = useState(null);
    // const [seller, setSeller] = useState({});
    // const sourceTab = location.state?.sourceTab;
    const navigate = useNavigate();
    
    const goBack = () => {
        navigate(-1);
    }
    
    const betID = useParams().id;

    useEffect(() => {
        if (betID){
            getBet(betID).then((response) => {
                setBet(response);
                // if (response?.seller_id) {
                //     getUser(response.seller_id).then((user) => {
                //         console.log("seller:", user);
                //         setBet(user);
                //     }).catch((error) => {
                //         console.error("Error fetching user:", error);
                //     });
                // }
            }).catch((error) => {
                console.error("Error fetching bet:", error);
            });
        } else {
            console.error("betID is null or undefined");
        }
    }, [betID]);

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
                    buyBet(user.user_id, betID).then((response) => {
                        console.log("Buy bet response:", response);
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
        return (
            <div className="bet-text">
                <div className="bet-subheading">Bets Bought</div>
                <div></div>
            </div>
        )
    }

    const MyBetContent = () => {
        if (bet?.status === 'accepted') {
            return (
                <div className="mybet-content">
                    <div>{bet?.quantity} bet(s) accepted by {bet?.buyer_id}</div>
                    <button>Win</button>
                    <button>Lose</button>
                </div>
            )
        }

        if (bet?.status === 'resolved') {
            return (
                <div className="mybet-content">
                    <div>{bet?.buyer_id} {bet.result}!</div>
                </div>
            )
        }
        
        return null;
    }

  return (
    <div className="bet-details-main-container">
        <Sidebar />
        <div className="bet-details-content-container">
            <div className="bet-header">
                <Link onClick={goBack} className="back-button">
                    <img src={backIcon} />
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
                        <div className="bet-subheading">Bets Available</div>
                        <div>{bet?.max_quantity}</div>
                    </div>
                    {bet?.status === 'accepted' && <AcceptedBetContent />}
                </div>
                {bet?.status === 'open' && <OpenBetContent />}
                <MyBetContent />
            </div>
        </div>
    </div>
  )
}

export default BetDetails;