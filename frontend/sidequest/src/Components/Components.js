import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

// Auth
import Home from "./Home/home.js";
import AuthRegister from "./Auth/AuthRegister.js";
import AuthLogin from "./Auth/AuthLogin.js";

// Main Pages
import SearchPage from "./Pages/SearchPage.js";
import GroupPage from "./Pages/GroupPage.js"
import QuestDashboard from "./QuestDashboard/QuestDashboard.js";
import BetDashboard from "./BetDashboard/BetDashboard.js";

// Quest Details
import QuestDetails from "./QuestDetails/QuestDetails.js";
import BetDetails from "./BetDetails/BetDetails.js";

import AcceptedQuests from "./AcceptedQuests/AcceptedQuests.js";

import { Navigate } from 'react-router-dom';

export default function Components() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/groups/:id" element={<GroupPage />} />
                <Route path="/register" element={<AuthRegister />} />
                <Route path="/login" element={<AuthLogin />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="quests/:id" element={<QuestDetails />} />
                <Route path="bets/:id" element={<BetDetails />} />
                <Route path="quests" element={<QuestDashboard />} />
                <Route path="bets" element={<BetDashboard />} />
                {/* <Route path="groups" element={<GroupPage />} /> */}

                <Route path="acceptedquest" element={<AcceptedQuests />} />
                
            </Routes>
        </Router>
    );
}