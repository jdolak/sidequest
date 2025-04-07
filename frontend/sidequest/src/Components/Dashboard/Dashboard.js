import QuestSection from "../QuestSection/QuestSection";
import BetSection from "../BetSection/BetSection";
import "./dashboard.css";

const Dashboard = () => {
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