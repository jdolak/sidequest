import React from 'react';
import searchIcon from '../../assets/images/search.svg';
import './sidebar.css';

const Sidebar = () => {
    return (
        <div class="sidebar">
            <div class="groups">
                <img src={searchIcon} />
            </div>
            <div class="profile">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="30" fill="#F3F4FB" stroke="#EAECF9" stroke-width="4"/>
                </svg>
            </div>
        </div>
    );
};

export default Sidebar;