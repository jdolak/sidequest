import React, {useEffect,useState} from "react";
import searchIcon from '../../assets/images/search.svg';
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
                                {group?.group_name?.slice(0, 2).toUpperCase()}
                            </div>
                        </button>
                    ))}
                </div>
                <div className="user-icon">
                    <button className="logout-button" onClick={() => { handleLogout() }}>
                        {username?.slice(0, 2).toUpperCase()}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;