import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Dashboard from '../Group-Dashboard/Dashboard';
import './mainpage.css';

const MainPage = () => {
    return (
        <div class="main-page">
             <Sidebar />
             <Dashboard />
        </div>
    );
};
  
export default MainPage;