import React, {useEffect,useState} from "react";
import searchIcon from '../../assets/images/search.svg';
import {Link} from "react-router-dom";
import './sidebar.css';
import { useGlobalStore } from '../../stores/globalStore.js';
import { getAllGroups } from "../../Services/Groups.js";
import { useNavigate } from "react-router-dom";



const Sidebar = () => {
    const [groups, setGroups] = useState([]);
    const setCurrGroup = useGlobalStore((state) => state.setGroup);
    const currGroupID = useGlobalStore((state) => state.currGroupID);
    const navigate = useNavigate();

    const setGroup = (groupID) => {
        setCurrGroup(groupID);
        navigate(`/groups/${groupID}`);
    }

    useEffect(() => {
        getAllGroups().then((response) => {
            setGroups(response);
        }).catch((error) => {
            console.error("Error fetching groups:", error);
        });
    }, []);


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
            </div>
        </div>
    );
};

export default Sidebar;