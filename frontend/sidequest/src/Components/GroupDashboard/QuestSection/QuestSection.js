import React from 'react';
import { Link } from 'react-router-dom';
import './questsection.css';
import Card from '../../Cards/Card';

const QuestSection = (quests) => {
    return (
        <div className="main-section">
            <div className="header">
                    <div className="subheading-text">Quests</div>
                    <Link to="/quests" className="view-quest-button">View all quests</Link>
            </div>
            <div className="quest-list">
                {quests.map((quest) => (
                    <Link to={`/quests/${quest.quest_id}`} className="card-link" key={quest.quest_id}>
                    <Card
                        title={quest.quest_desc}
                        creator={quest.author_id}
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