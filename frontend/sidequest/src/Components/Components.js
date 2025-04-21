import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AuthRegister from "./Auth/AuthRegister.js";
import AuthLogin from "./Auth/AuthLogin.js";
import GroupPage from "./Pages/GroupPage.js"
import QuestDetails from './QuestDetails/QuestDetails.js'
import QuestDashboard from "./QuestDashboard/QuestDashboard.js";
import BetDashboard from "./BetDashboard/BetDashboard.js";
// import GroupPage from './Group/GroupPage.js';
import BetDetails from "./BetDetails/BetDetails.js";
import AcceptedQuests from "./AcceptedQuests/AcceptedQuests.js";
import Home from "./Home/home.js";
import SearchPage from "./Pages/SearchPage.js";
import { Navigate } from 'react-router-dom';

export default function Components() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/group/1" element={<GroupPage />} />
                <Route path="/register" element={<AuthRegister />} />
                <Route path="/login" element={<AuthLogin />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="quests/1" element={<QuestDetails />} />
                <Route path="bets/1" element={<BetDetails />} />
                <Route path="quests" element={<QuestDashboard />} />
                <Route path="bets" element={<BetDashboard />} />
                {/* <Route path="groups" element={<GroupPage />} /> */}

                <Route path="acceptedquest" element={<AcceptedQuests />} />
                
            </Routes>
        </Router>
    );
}