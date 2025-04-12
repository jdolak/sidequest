import React from 'react';
import { Link } from 'react-router-dom';
import './questsection.css';
import Card from '../../Card/Card';

const QuestSection = () => {
    return (
        <div class="main-section">
            <div class="header">
                    <div class="subheading-text">Quests</div>
                    <Link to="/quests" class="view-quest-button">View all quests</Link>
            </div>
            <div class="quest-list">
                <Card />
                <div class="quest-card">
                    <div class="quest-title">Read 50 pages by Sunday</div>
                    <div class="quest-desc">
                        <div>Created by csuwita</div>
                        <div>100 coins</div>
                    </div>
                </div>
                <div class="quest-card">
                    <div class="quest-title">Read 50 pages by Sunday</div>
                    <div class="quest-desc">
                        <div>Created by csuwita</div>
                        <div>100 coins</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestSection;