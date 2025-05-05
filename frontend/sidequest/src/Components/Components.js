import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";
import PublicRoute from "./PublicRoute.js";

// Auth
import Home from "./Home/home.js";
import AuthRegister from "./Auth/AuthRegister.js";
import AuthLogin from "./Auth/AuthLogin.js";

// Main Pages
import SearchPage from "./Pages/SearchPage.js";
import GroupPage from "./Pages/GroupPage.js"
import QuestDashboard from "./QuestDashboard/QuestDashboard.js";
import BetDashboard from "./BetDashboard/BetDashboard.js";
import AboutPage from "./About/AboutPage.js"

// Quest Details
import QuestDetails from "./QuestDetails/QuestDetails.js";
import BetDetails from "./BetDetails/BetDetails.js";

import { Navigate } from 'react-router-dom';

export default function Components() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route element={<PublicRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<AuthRegister />} />
                    <Route path="/login" element={<AuthLogin />} />
                </Route>
                
                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/groups/:id" element={<GroupPage />} />
                    <Route path="search" element={<SearchPage />} />
                    <Route path="quests/:id" element={<QuestDetails />} />
                    <Route path="/bets/:id" element={<BetDetails />} />
                    <Route path="quests" element={<QuestDashboard />} />
                    <Route path="bets" element={<BetDashboard />} />
                    <Route path="/about" element={<AboutPage />} />
                </Route>              
            </Routes>
        </Router>
    );
}