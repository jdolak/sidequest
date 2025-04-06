import QuestSection from "../QuestSection/QuestSection";
import BetSection from "../BetSection/BetSection";
import "./dashboard.css";

const Dashboard = () => {
    return (
        <div class="dashboard">
            <QuestSection />
            <BetSection />
        </div>
    )
}

export default Dashboard;