import React, {useState} from "react";
import './searchpage.css';
import Sidebar from "../Sidebar/Sidebar";
import searchBarIcon from "../../assets/images/search_bar.svg";
import addIcon from "../../assets/images/add.svg";
import GroupCard from "../Cards/GroupCard";
import NewGroupModal from "../Modals/NewGroup";

const SearchPage = () => {

    const [showModal, setShowModal] = useState(false);


    return (
        <div className="main-container">
            <Sidebar />
            <div className="content-container">
                <div className="search-page-header">
                    <div className="search-bar">
                        <img src={searchBarIcon} />
                        <input type="text" className="search-input" placeholder="Search for a group"></input>
                    </div>
                    <button className="create-group-btn" onClick={() => setShowModal(true)}>
                        <img src={addIcon} />
                        <div className="create-group-btn-text">Create a group</div>
                    </button>
                </div>
                <div className="groups">
                    <div className="group-row">
                        <GroupCard />
                        <GroupCard />
                        <GroupCard />
                        <GroupCard />
                    </div>
                    <div className="group-row">
                        <GroupCard />
                        <GroupCard />
                        <GroupCard />
                        <GroupCard />
                    </div>
                </div>

                {showModal && (<NewGroupModal onClose={() => setShowModal(false)} />
)}
            </div>
        </div>
    )
}

export default SearchPage;
