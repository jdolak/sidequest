import React from 'react';
import { Link } from 'react-router-dom';
import './questsection.css';
import QuestCard from '../../Cards/QuestCard';

const QuestSection = () => {
    return (
        <div class="main-section">
            <div class="header">
                    <div class="subheading-text">Quests</div>
                    <Link to="/quests" class="view-quest-button">View all quests</Link>
            </div>
            <div class="quest-list">
                <QuestCard />
                <QuestCard />
                <QuestCard />
            </div>
        </div>
    )
}

export default QuestSection;