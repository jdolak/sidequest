import React from 'react';
import searchIcon from '../../assets/images/search.svg';
import {Link} from "react-router-dom";
import './sidebar.css';
import { useGlobalStore } from '../../stores/globalStore.js';

const Sidebar = () => {
    const setCurrGroup = useGlobalStore((state) => state.setGroup);
    return (
        <div className="sidebar">
            <div className="menu">
                <Link to="/search">
                    <img src={searchIcon} />
                </Link>
                <div className="groups">
                    <button className="group-button" key={1} onClick={() => setCurrGroup(key)}>
                        <div className="group">
                            G1
                        </div>
                    </button>
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