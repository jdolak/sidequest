import "./acceptedquests.css";
import React, {useRef} from "react";
import Sidebar from "../Sidebar/Sidebar.js";
import backIcon from '../../assets/images/chevron.svg';
import { Link } from "react-router-dom";


const AcceptedQuests = () => {
    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("Uploaded file: ", file);
        }
    };

    return (
        <div className="page-layout">
            <div className="main-container">
                <Sidebar />
                <div className="quest-detail-container">
                    <div className="quest-header">
                        <Link to="/" className="back-button">
                            <img src={backIcon} />
                            <div className="back-text">Back</div>
                        </Link>
                        <div className="header-contents"> 
                            <div className="quest-title">Read 50 pages by Sunday</div>
                            <div>Created by csuwita</div>
                            <div>Due Date: March 30, 2025</div>
                        </div>
                    </div>
                    <div className="quest-detail-body">
                        <div className="quest-details">
                            <div className="quest-text">
                                <div className="quest-subheading">Description</div>
                                <div>Read 50 pages of the following book and give me an accurate summary. Winner gets 100 coins and a free dining hall meal swipe.</div>
                            </div>
                            <div className="quest-text">
                                <div className="quest-subheading">Incentive</div>
                                <div>Free dining hall meal swipe.</div>
                            </div>
                        </div>

                        <div className="upload-button" onClick={handleClick}>
                            Upload submission
                        </div>
                        <input type="file" accept=".jpg,.jpeg,.png,.heic" ref={fileInputRef} onChange={handleFileChange} style={{display: "none"}} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AcceptedQuests;
