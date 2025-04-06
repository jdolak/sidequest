import React from 'react';
import './styles.css';

const QuestSection = () => {
    return (
        <div class="main-section">
            <div class="header">
                    <p class="subheading-text">Quests</p>
                    <p class="view-quest-button">View all quests</p>
            </div>
            <div class="quest-list">
                <div class="quest-card">
                    <p>Read 50 pages by Sunday</p>
                    <div class="quest-desc">
                        <p>Created by csuwita</p>
                        <p>100 coins</p>
                    </div>
                </div>
                <div class="quest-card">
                    <p>Read 50 pages by Sunday</p>
                    <div class="quest-desc">
                        <p>Created by csuwita</p>
                        <p>100 coins</p>
                    </div>
                </div>
                <div class="quest-card">
                    <p>Read 50 pages by Sunday</p>
                    <div class="quest-desc">
                        <p>Created by csuwita</p>
                        <p>100 coins</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestSection;