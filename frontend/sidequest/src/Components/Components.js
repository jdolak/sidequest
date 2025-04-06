import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Sidebar from './Sidebar/Sidebar.js';
import MainPage from './Main/MainPage.js';
import Header from './Header/Header.js';
import { Navigate } from 'react-router-dom';

export default function Components() {
    return (
        <Sidebar />
        // <Router style="background-color: #8CBA80;">
        //     <Header/>
        //     <br/>
        //     <Routes>
        //         <Route path="/" element={<MainPage/>} />
        //         <Route path="*" element={<Navigate to="/auth" replace />} /> 
        //     </Routes>
        //     <br/>
        // </Router>
    );
}