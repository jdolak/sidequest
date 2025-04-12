import './betsection.css';
import BetCard from '../../Cards/BetCard';

const BetSection = () => {
    return (
        <div class="main-section">
            <div class="header">
                    <div class="subheading-text">Bets</div>
                    <div class="view-quest-button">View all bets</div>
            </div>
            <div class="quest-list">
                <BetCard />
                <BetCard />
                <BetCard />
            </div>
        </div>
    )
}

export default BetSection;