import React, {useEffect,useState} from "react";
import QuestSection from "./QuestSection/QuestSection";
import BetSection from "./BetSection/BetSection";
import "./dashboard.css";
import { getOpenQuests, getAllQuests } from "../../Services/Quests";
import { getAllBets } from "../../Services/Bets";
import { getGroup, getGroupUser, leaveGroup, getGroupLeaderboard } from "../../Services/Groups";
import { useGlobalStore } from '../../stores/globalStore.js';
import { getLoggedInUser } from "../../Services/Users.js";
import { useNavigate } from "react-router-dom";
import { getUsersGroupProfile } from "../../Services/Users.js";
import copyIcon from "../../assets/images/copy.svg";

const Dashboard = () => {
    const [openBets, setOpenBets] = useState([]);
    const [openQuests, setOpenQuests] = useState([]);
    const [group, setGroup] = useState({});
    const [myProfile, setMyProfile] = useState({});
    const [leaderboard, setLeaderboard] = useState([]);
    const globalGroupID = useGlobalStore((state) => state.currGroupID);
    const navigate = useNavigate();
    const [groupID, setGroupID] = useState(
        parseInt(sessionStorage.getItem("groupID"))
      );

    const handleCopyLink = () => {
        const groupLink = `sq.jdolak.com/api/invite/${group.invite_code}`;
        navigator.clipboard.writeText(groupLink).then(() => {
            alert("Group link copied successfully!");
        }).catch((error) => {
            console.error("Copy link failed:", error);
        });
    }

    const handleLeaveGroup = () => {
        if (!window.confirm("Are you sure you want to leave this group? This action cannot be undone.")) return;

        leaveGroup(groupID)
            .then(() => {
                sessionStorage.removeItem("groupID");
                useGlobalStore.getState().setGroup(null);
                navigate("/search");
            })
            .catch((error) => {
                console.error("Error leaving group:", error);
            });
    }

    useEffect(() => {
        setGroupID(sessionStorage.getItem("groupID"));
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
        // get group data
        getUsersGroupProfile(groupID).then((response) => {
            setMyProfile(response);
        }).catch((error) => {
            console.error("Error fetching my profile:", error);
        });
        getGroup(groupID).then((response) => {
            setGroup(response);
        }).catch((error) => {
            console.error("Error fetching group:", error);
        });
        getAllBets().then((response) => {
            if (!Array.isArray(response)) {
                    setOpenBets([response]);
                } else {
                    setOpenBets(response);
                }
            }).catch((error) => {
                setOpenBets([]);
                console.error("Error fetching Bets:", error);
        });
        getAllQuests().then((response) => {
            if (!Array.isArray(response)) {
                setOpenQuests([response]);
            } else {
                setOpenQuests(response);
            }
            }).catch((error) => {
            console.error("Error fetching quests:", error);
        });
        getGroupLeaderboard().then((response) => {
            if (!Array.isArray(response)) {
                setLeaderboard([response]);
            } else {
                setLeaderboard(response);
            }
        }).catch((error) => {
            console.error("Error fetching leaderboard:", error);
        });
    }, [groupID, globalGroupID]);
          
    return (
        <div className="group-page-dashboard">
            <div className="group-page-header">
                <div className="group-page-heading-row">
                    <div className="group-page-heading">{group.group_name}</div>
                    <img src={copyIcon} title="Copy invite link" alt="copy-link" className="copy-icon" onClick={handleCopyLink}/>
                </div>
                <div>{group.group_desc}</div>
                <div>{group.size} members</div>
                <div className="group-page-my-coins">
                    <div className="group-page-my-coins-text">{myProfile.currency} coins</div>
                </div>
            </div>
            <QuestSection quests={openQuests?.slice(0,4)}/>
            <BetSection bets={openBets?.slice(0,4)}/>
            <div className="group-page-leaderboard">
                <div className="group-page-leaderboard-header">Leaderboard</div>
                <div className="group-page-leaderboard-list">
                    {leaderboard.map((user, index) => (
                        <div key={index} className="group-page-leaderboard-item">
                            <div>{index + 1}. {user.username}</div>
                            <div>{user.currency} coins</div>
                        </div>
                    ))}
                </div>
            </div>
            <button className="leave-group-btn" onClick={handleLeaveGroup}>Leave group</button>
        </div>
    )
}

export default Dashboard;