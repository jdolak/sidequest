import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Dashboard from '../GroupDashboard/Dashboard';
import './grouppage.css';

const GroupPage = () => {
    return (
        <div className="group-main-page">
             <Sidebar />
             <div className="group-dashboard-scroll-container">
                <Dashboard />
             </div>
        </div>
    );
};
  
export default GroupPage;