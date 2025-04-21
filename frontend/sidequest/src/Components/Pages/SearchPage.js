import React from "react";
import './searchpage.css';
import Sidebar from "../Sidebar/Sidebar";
import searchBarIcon from "../../assets/images/search_bar.svg";
import addIcon from "../../assets/images/add.svg";

const SearchPage = () => {
    return (
        <div className="main-container">
            <Sidebar />
            <div className="content-container">
                <div className="search-page-header">
                    <div className="search-bar">
                        <img src={searchBarIcon} />
                        <div className="search-bar-text">Search for a group</div>
                    </div>
                    <div className="create-group-btn">
                        <img src={addIcon} />
                        <div className="create-group-btn-text">Create a group</div>
                    </div>
                </div>
                <div className="groups">
                </div>
            </div>
        </div>
    )
}

export default SearchPage;
