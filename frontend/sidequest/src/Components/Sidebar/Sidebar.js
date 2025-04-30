import React, {useEffect,useState} from "react";
import searchIcon from '../../assets/images/search.svg';
import logoutIcon from '../../assets/images/logout.svg';
import settingsIcon from '../../assets/images/settings.svg';
import {Link} from "react-router-dom";
import './sidebar.css';
import { useGlobalStore } from '../../stores/globalStore.js';
import { getMyGroups } from "../../Services/Groups.js";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser, logout } from "../../Services/Users.js";


const Sidebar = () => {
    const [groups, setGroups] = useState([]);
    const [username, setUsername] = useState("");
    const setCurrGroup = useGlobalStore((state) => state.setGroup);
    const currGroupID = useGlobalStore((state) => state.currGroupID);
    const navigate = useNavigate();

    const setGroup = (groupID) => {
        setCurrGroup(groupID);
        navigate(`/groups/${groupID}`);
    }

    useEffect(() => {
        getLoggedInUser().then((user) => {
            if (user.status === "true") {
                setUsername(user.username);
            }
        }).catch((error) => {
            console.error("Error checking logged-in user:", error);
        });
        getMyGroups().then((response) => {
            console.log("Groups:", response);
            setGroups(response);
        }).catch((error) => {
            console.error("Error fetching groups:", error);
        });
    }, []);

    function handleLogout() {
        if (window.confirm("Are you sure you want to logout?")) {
            logout().then((response) => {
                console.log("Logout response:", response);
            }).catch((error) => {
                console.error("Error logging out:", error);
            });
            
            navigate("/login");
        }
    }

    function getGroupTag(groupName) {
        const words = groupName.split(" ");
        if (words.length >= 2) {
            return words[0][0].toUpperCase() + words[1][0].toUpperCase();
        } else {
            return groupName.slice(0, 2).toUpperCase();
        }
    }

    return (
        <div className="sidebar">
            <div className="menu">
                <Link to="/search">
                    <img src={searchIcon} />
                </Link>
                <div className="groups">
                    {groups.map((group, index) => (
                        // <button className="group-button" key={index} onClick={() => setCurrGroup(group.group_id)}>
                        <button className={`group-button ${currGroupID === group.group_id ? "active" : ""}`} key={index} onClick={() => setGroup(group.group_id)}>
                            <div>
                                {getGroupTag(group?.group_name)}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <div className="sidebar-user-actions">
                    <button className="logout-button" onClick={() => { handleLogout() }}>
                        <img src={logoutIcon} />
                    </button>
                    <button className="settings-button">
                        <img src={settingsIcon} />
                    </button>
                </div>
        </div>
    );
};

export default Sidebar;