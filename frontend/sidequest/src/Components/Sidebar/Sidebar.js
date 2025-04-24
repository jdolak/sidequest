import React from 'react';
import searchIcon from '../../assets/images/search.svg';
import {Link} from "react-router-dom";
import './sidebar.css';
import { useGlobalStore } from '../../stores/globalStore.js';

const Sidebar = () => {
    //  commenting out so front end can work for a bit
    // const setCurrGroup = useGlobalStore((state) => state.setGroup);
    return (
        <div className="sidebar">
            <div className="menu">
                <Link to="/search">
                    <img src={searchIcon} />
                </Link>
                <div className="groups">
                    {/* <button className="group-button" key={1} onClick={() => setCurrGroup(key)}> */}
                    <button className="group-button">
                        <div className="group">
                            G1
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;