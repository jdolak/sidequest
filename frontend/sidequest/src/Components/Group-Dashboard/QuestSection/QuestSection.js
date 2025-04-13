import React from 'react';
import { Link } from 'react-router-dom';
import './questsection.css';
import QuestCard from '../../Cards/QuestCard';

const QuestSection = () => {
    return (
        <div className="main-section">
            <div className="header">
                    <div className="subheading-text">Quests</div>
                    <Link to="/quests" className="view-quest-button">View all quests</Link>
            </div>
            <div className="quest-list">
                <Link to="/quests/1" className="quest-card-link">
                    <QuestCard />
                </Link>
                <QuestCard />
                <QuestCard />
                <QuestCard />
            </div>
        </div>
    )
}

export default QuestSection;