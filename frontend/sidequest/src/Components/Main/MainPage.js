import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Dashboard from '../Dashboard/Dashboard';
import './styles.css';

const MainPage = () => {
    return (
        <div class="main-page">
             <Sidebar />
             <Dashboard />
        </div>
    );
};
  
export default MainPage;