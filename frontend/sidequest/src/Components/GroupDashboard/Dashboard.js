import React, {useEffect,useState} from "react";
import QuestSection from "./QuestSection/QuestSection";
import BetSection from "./BetSection/BetSection";
import "./dashboard.css";
import { getOpenQuests } from "../../Services/Quests";
import { getAllBets } from "../../Services/Bets";
import { getGroup, getGroupUser } from "../../Services/Groups";
import { useGlobalStore } from '../../stores/globalStore.js';

const Dashboard = () => {
    const [openBets, setOpenBets] = useState([]);
    const [openQuests, setOpenQuests] = useState([]);
    const [group, setGroup] = useState({});
    const groupID = useGlobalStore((state) => state.currGroupID);

    useEffect(() => {
        getGroup(groupID).then((response) => {
            setGroup(response);
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
                <div className="group-page-heading">{group.group_desc}</div>
                <div>{group.members} members</div>
                <div className="group-page-my-coins">
                    <div className="group-page-my-coins-text">{group.coins} coins</div>
                </div>
            </div>
            <QuestSection quests={openQuests?.slice(0,4)}/>
            <BetSection bets={openBets?.slice(0,4)}/>
        </div>
    )
}

export default Dashboard;