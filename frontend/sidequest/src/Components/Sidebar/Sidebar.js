import React from 'react';
import searchIcon from '../../assets/images/search.svg';
import './sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="menu">
                <img src={searchIcon} />
                <div className="groups">
                    <div className="group">
                    </div>
                </div>
            </div>
            <div className="profile">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="30" fill="#F3F4FB" stroke="#EAECF9" strokeWidth="4"/>
                    </svg>
            </div>
        </div>
    );
};

export default Sidebar;