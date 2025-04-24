import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Dashboard from '../GroupDashboard/Dashboard';
import './grouppage.css';

const GroupPage = () => {
    return (
        <div class="group-main-page">
             <Sidebar />
             <Dashboard />
        </div>
    );
};
  
export default GroupPage;