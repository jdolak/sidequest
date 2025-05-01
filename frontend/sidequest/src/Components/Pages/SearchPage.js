import React, {useState, useEffect} from "react";
import './searchpage.css';
import Sidebar from "../Sidebar/Sidebar";
import searchBarIcon from "../../assets/images/search_bar.svg";
import addIcon from "../../assets/images/add.svg";
import GroupCard from "../Cards/GroupCard";
import NewGroupModal from "../Modals/NewGroup";
import { getAllGroups } from "../../Services/Groups";
import { getMyGroups } from "../../Services/Groups";
import { getLoggedInUser } from "../../Services/Users";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
    const [groups, setGroups] = useState([]);
    const [allGroups, setAllGroups] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [needsUpdate, setNeedsUpdate] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getLoggedInUser()
            .then((user) => {
                if (user.status === "false") {
                    navigate("/login");
                } else {
                    setUser(user);

                    Promise.all([getAllGroups(), getMyGroups()])
                    .then(([allGroupsData, myGroupsData]) => {
                        const myGroupIds = new Set (myGroupsData.map(group => group.group_id));
                        const filtered = allGroupsData.filter(group => !myGroupIds.has(group.group_id));
                        setAllGroups(filtered);
                        setGroups(filtered);
                    })
                    .catch((error) => {
                        console.error("Error fetching groups:", error);
                    });
                }
            })
            .catch((error) => {
                console.error("Error checking logged-in user:", error);
                navigate("/login");
            });
        }, [needsUpdate]);

    const filterGroups = (event) => {
        setSearchTerm(event.target.value);
        if (event.target.value === "") {
            setGroups(allGroups);
        } else {
            const filteredGroups = allGroups.filter((group) =>
                group.group_name.toLowerCase().includes(event.target.value.toLowerCase()) ||
                group.group_desc.toLowerCase().includes(event.target.value.toLowerCase())
            );
            setGroups(filteredGroups);
        }
    }

    const modalClose = () => {
        setShowModal(false);
    };

    const handleModalSuccess = () => {
        setNeedsUpdate((prev) => !prev); // Toggle the state to trigger useEffect
        setShowModal(false); // Close the modal
    };

    return (
        <div className="search-main-container">
            <Sidebar />
            <div className="search-content-container">
                <div className="search-page-header">
                    <div className="search-bar">
                        <img src={searchBarIcon} />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search for a group"
                            value={searchTerm}
                            onChange={filterGroups} // Update state on input change
                        />
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

                {showModal && (<NewGroupModal onClose={modalClose} 
                        onSuccess={handleModalSuccess} />
)}
            </div>
        </div>
    )
}

export default SearchPage;
