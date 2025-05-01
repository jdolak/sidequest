import React from 'react';
import { Link } from 'react-router-dom';
import './questsection.css';
import Card from '../../Cards/Card';

const QuestSection = ({quests}) => {

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

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
                        date={formatDate(quest.due_date)}
                    />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default QuestSection;