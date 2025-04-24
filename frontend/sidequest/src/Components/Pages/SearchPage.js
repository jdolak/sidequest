import React, {useState, useEffect} from "react";
import './searchpage.css';
import Sidebar from "../Sidebar/Sidebar";
import searchBarIcon from "../../assets/images/search_bar.svg";
import addIcon from "../../assets/images/add.svg";
import GroupCard from "../Cards/GroupCard";
import NewGroupModal from "../Modals/NewGroup";
import { getAllGroups } from "../../Services/Groups";

const SearchPage = () => {
    const [groups, setGroups] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getAllGroups()
            .then((data) => {
                setGroups(data);
                console.log("Groups:", data);
            })
            .catch((error) => {
                console.error("Error fetching groups:", error);
            });
    }, []);

    return (
        <div className="search-main-container">
            <Sidebar />
            <div className="search-content-container">
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
                <div className="search-groups">
                    {groups.length > 0 ? (
                        groups.reduce((rows, group, index) => {
                            const rowIndex = Math.floor(index / 4);
                            if (!rows[rowIndex]) {
                                rows[rowIndex] = [];
                            }
                            rows[rowIndex].push(group);
                            return rows;
                        }, []).map((row, rowIndex) => (
                            <div className="search-group-row" key={rowIndex}>
                                {row.map((group) => (
                                    <GroupCard key={group.group_id} group={group} />
                                ))}
                            </div>
                        ))
                    ) : (
                        <div>No groups found</div>
                    )}
                </div>

                {showModal && (<NewGroupModal onClose={() => setShowModal(false)} />
)}
            </div>
        </div>
    )
}

export default SearchPage;
