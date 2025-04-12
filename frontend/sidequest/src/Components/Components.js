import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MainPage from './Pages/MainPage.js';
import QuestDetailsPage from './QuestDetails/QuestDetailsPage.js'
import MyQuests from './MyQuests/MyQuests.js';
// import GroupPage from './Group/GroupPage.js';
import BetDetailsPage from './BetDetails/BetDetailsPage.js';
import { Navigate } from 'react-router-dom';

export default function Components() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="quests/:id" element={<QuestDetailsPage />} />
                <Route path="bets/:id" element={<BetDetailsPage />} />
                <Route path="myquests" element={<MyQuests />} />
                {/* <Route path="groups" element={<GroupPage />} /> */}
            </Routes>
        </Router>
    );
}