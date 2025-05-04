import React, {useEffect,useState} from "react";
import QuestSection from "./QuestSection/QuestSection";
import BetSection from "./BetSection/BetSection";
import "./dashboard.css";
import { getOpenQuests } from "../../Services/Quests";
import { getAllBets } from "../../Services/Bets";
import { getGroup, getGroupUser } from "../../Services/Groups";
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
    // const groupID = useGlobalStore((state) => state.currGroupID);
    const navigate = useNavigate();
    const [groupID, setGroupID] = useState(
        parseInt(sessionStorage.getItem("groupID"))
      );

    useEffect(() => {
        console.log(sessionStorage.getItem("groupID"), typeof(sessionStorage.getItem("gropupID")))
        console.log("Group ID:", groupID);
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
                if (typeof(response) !== "list") {
                    setOpenBets([response]);
                } else {
                    setOpenBets(response);
                }
            }).catch((error) => {
                setOpenBets([]);
                console.error("Error fetching Bets:", error);
        });
        getOpenQuests().then((response) => {
            setOpenQuests(response);
            }).catch((error) => {
            console.error("Error fetching quests:", error);
        });
    }, [groupID]);
          
    return (
        <div className="group-page-dashboard">
            <div className="group-page-header">
                <div className="group-page-heading-row">
                    <div className="group-page-heading">{group.group_name}</div>
                    <img src={copyIcon} alt="copy-link" className="copy-icon" />
                </div>
                <div>{group.group_desc}</div>
                <div>{group.size} members</div>
                <div className="group-page-my-coins">
                    <div className="group-page-my-coins-text">{myProfile.currency} coins</div>
                </div>
            </div>
            <QuestSection quests={openQuests?.slice(0,4)}/>
            <BetSection bets={openBets?.slice(0,4)}/>
        </div>
    )
}

export default Dashboard;