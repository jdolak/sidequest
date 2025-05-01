import React from 'react';
import { Link } from 'react-router-dom';
import './questsection.css';
import Card from '../../Cards/Card';

const QuestSection = ({quests}) => {
    return (
        <div className="main-quest-section">
            <div className="quest-section-header">
                    <div className="quest-section-subheading-text">Quests</div>
                    <Link to="/quests" className="view-quest-button">View all quests</Link>
            </div>
            <div className="quest-list">
                {quests.map((quest) => (
                    <Link to={`/quests/${quest.quest_id}`} className="quest-card-link" key={quest.quest_id}>
                    <Card
                        title={quest.quest_title}
                        creator={quest.username}
                        coins={quest.reward_amount}
                        date={quest.due_date}
                    />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default QuestSection;