import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MainPage from './Pages/MainPage.js';
import QuestDetails from './QuestDetails/QuestDetails.js'
import QuestDashboard from "./QuestDashboard/QuestDashboard.js";
import BetDashboard from "./BetDashboard/BetDashboard.js";
// import GroupPage from './Group/GroupPage.js';
import BetDetails from "./BetDetails/BetDetails.js";
import { Navigate } from 'react-router-dom';

export default function Components() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="quests/1" element={<QuestDetails />} />
                <Route path="bets/1" element={<BetDetails />} />
                <Route path="quests" element={<QuestDashboard />} />
                <Route path="bets" element={<BetDashboard />} />
                {/* <Route path="groups" element={<GroupPage />} /> */}
            </Routes>
        </Router>
    );
}