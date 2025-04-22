import './betsection.css';
import { Link } from 'react-router-dom';
import Card from '../../Cards/Card';

const BetSection = (bets) => {
    return (
        <div class="main-section">
            <div class="header">
                    <div class="subheading-text">Bets</div>
                    <Link to="/bets" className='view-quest-button'>View all bets</Link>
            </div>
            <div class="quest-list">
                {bets.map((bet) => (
                  <Link to={`/bets/${bet.bet_id}`} className="card-link" key={bet.bet_id}>
                    <Card
                      author_id={bet.author_id}
                      bet_desc={bet.bet_desc}
                      due_date={bet.due_date}
                      reward_amount={bet.reward_amount}
                    />
                  </Link>
                ))}
            </div>
        </div>
    )
}

export default BetSection;