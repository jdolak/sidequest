import './betsection.css';
import { Link } from 'react-router-dom';
import Card from '../../Cards/Card';

const BetSection = ({bets}) => {
    return (
        <div className="bets-main-section">
            <div className="bets-section-header">
                    <div className="bets-section-subheading-text">Bets</div>
                    <Link to="/bets" className='view-bets-button'>View all bets</Link>
            </div>
            <div className="bet-list">
                {bets.map((bet) => (
                  <Link to={`/bets/${bet.bet_id}`} className="bet-card-link" key={bet.bet_id} state={ bet.bet_id}>
                    <Card
                      title={bet.question}
                      creator={bet.username}
                      odds={bet.odds}
                    />
                  </Link>
                ))}
            </div>
        </div>
    )
}

export default BetSection;