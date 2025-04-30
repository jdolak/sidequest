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

const Dashboard = () => {
    const [openBets, setOpenBets] = useState([]);
    const [openQuests, setOpenQuests] = useState([]);
    const [group, setGroup] = useState({});
    const [myProfile, setMyProfile] = useState({});
    const groupID = useGlobalStore((state) => state.currGroupID);
    const navigate = useNavigate();

    useEffect(() => {
         getLoggedInUser().then((user) => {
            console.log("Logged-in user:", user, "currGroupID:", groupID);
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
        // getUsersGroupProfile(groupID).then((response) => {
        //     console.log("My Profile data:", response);
        //     setMyProfile(response);
        // }).catch((error) => {
        //     console.error("Error fetching my profile:", error);
        // });
        getGroup(groupID).then((response) => {
            setGroup(response);
            console.log("Group data:", response);
        }).catch((error) => {
            console.error("Error fetching group:", error);
        });
        getAllBets().then((response) => {
                // console.log("OpenBets:", response);
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
                <div className="group-page-heading">{group.group_name}</div>
                <div>{group.members} members</div>
                <div className="group-page-my-coins-text">{group.coins} coins
                </div>
            </div>
            <QuestSection quests={openQuests?.slice(0,4)}/>
            <BetSection bets={openBets?.slice(0,4)}/>
        </div>
    )
}

export default Dashboard;