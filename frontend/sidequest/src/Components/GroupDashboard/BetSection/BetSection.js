import './betsection.css';
import { Link } from 'react-router-dom';
import Card from '../../Cards/Card';

const BetSection = ({bets}) => {
    return (
        <div class="bets-main-section">
            <div class="bets-section-header">
                    <div class="bets-section-subheading-text">Bets</div>
                    <Link to="/bets" className='view-bets-button'>View all bets</Link>
            </div>
            <div class="bet-list">
                {bets.map((bet) => (
                  <Link to={`/bets/${bet.bet_id}`} className="bet-card-link" key={bet.bet_id}>
                    <Card
                      title={bet.question}
                      creator={bet.username}
                      date={bet.due_date}
                      coins={bet.reward_amount}
                    />
                  </Link>
                ))}
            </div>
        </div>
    )
}

export default BetSection;