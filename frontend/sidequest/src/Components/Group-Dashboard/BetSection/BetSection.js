import './betsection.css';
import { Link } from 'react-router-dom';
import BetCard from '../../Cards/BetCard';

const BetSection = () => {
    return (
        <div class="main-section">
            <div class="header">
                    <div class="subheading-text">Bets</div>
                    <Link to="/bets" className='view-quest-button'>View all bets</Link>
            </div>
            <div class="quest-list">
                <BetCard />
                <BetCard />
                <BetCard />
                <BetCard />
            </div>
        </div>
    )
}

export default BetSection;