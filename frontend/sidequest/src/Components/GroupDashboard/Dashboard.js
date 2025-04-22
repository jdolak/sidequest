import React, {useEffect,useState} from "react";
import QuestSection from "./QuestSection/QuestSection";
import BetSection from "./BetSection/BetSection";
import "./dashboard.css";
import { getOpenQuests } from "../../Services/Quests";
import { getAllBets } from "../../Services/Bets";

const Dashboard = () => {
    const [openBets, setOpenBets] = useState([]);
    const [openQuests, setOpenQuests] = useState([]);
    return (
        <div class="dashboard">
            <div class="group-header">
                <div class="heading">Flaherty Hall</div>
                <div>20 members</div>
                <div class="coins">
                    <div class="coin-text">100 coins</div>
                </div>
            </div>
            <QuestSection />
            <BetSection />
        </div>
    )
}

export default Dashboard;