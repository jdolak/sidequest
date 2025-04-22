import React, {useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import QuestSection from "./QuestSection/QuestSection";
import BetSection from "./BetSection/BetSection";
import "./dashboard.css";
import { getOpenQuests } from "../../Services/Quests";
import { getAllBets } from "../../Services/Bets";
import { getGroup } from "../../Services/Groups";

const Dashboard = () => {
    const [openBets, setOpenBets] = useState([]);
    const [openQuests, setOpenQuests] = useState([]);
    const [group, setGroup] = useState({});

    const { id } = useParams();

    useEffect(() => {
        getGroup(id).then((response) => {
            setGroup(response);
        }).catch((error) => {
            console.error("Error fetching group:", error);
        });
        getAllBets().then((response) => {
                setOpenBets(response);
            }).catch((error) => {
                console.error("Error fetching Bets:", error);
        });
        getOpenQuests().then((response) => {
            setOpenQuests(response);
            }).catch((error) => {
            console.error("Error fetching quests:", error);
        });
    }, []);
          
    return (
        <div class="dashboard">
            <div class="group-header">
                <div class="heading">{group.group_desc}</div>
                <div>{group.members} members</div>
                <div class="coins">
                    <div class="coin-text">{group.coins} coins</div>
                </div>
            </div>
            <QuestSection quests={openQuests.slice(0,4)}/>
            <BetSection bets={openBets.slice(0,4)}/>
        </div>
    )
}

export default Dashboard;