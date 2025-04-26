import "./questdetails.css";
import React, {useEffect,useState, useRef} from "react";
import Sidebar from "../Sidebar/Sidebar.js";
import backIcon from '../../assets/images/chevron.svg';
import { getQuest } from "../../Services/Quests.js";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

const QuestDetails = () => {
    const navigate = useNavigate();
    const { questID } = useParams();
    const [quest, setQuest] = useState(null);
    const location = useLocation();
    const sourceTab = location.state?.sourceTab;

    const goBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        getQuest(questID).then((response) => {
            console.log("quest:", response);
            setQuest(response);
        }).catch((error) => {
            console.error("Error fetching quest:", error);
        });
    }, [questID]);

    // Open Quest Specific Content
    const OpenQuestContent = () => (
        <div className="accept-button">
            Accept quest
        </div>
    )

    // Accepted Quest Content
    const AcceptedQuestContent = () => {
        const fileInputRef = useRef(null);
        const [selectedFile, setSelectedFile] = useState(null);
        const [comment, setComment] = useState("");
        const [status, setStatus] = useState("");
    
        const handleClick = () => {
            fileInputRef.current.click();
        };
    
        const handleFileChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                setSelectedFile(file);
            }
        }
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            setStatus("Submitting");
    
            const formData = new FormData();
            if (selectedFile) {
                formData.append("file", selectedFile);
            }
    
            if (comment) {
                formData.append("comment", comment);
            }
    
            try {
                const response = await fetch("https://sq.jdolak.com/api/quest_submit/1", {
                    method: "POST",
                    body: formData,
                });
    
                if (!response.ok) throw new Error("Upload failed");
    
                const result = await response.json();
                setStatus("Submission successful.");
                console.log(result);
            } catch (err) {
                setStatus("Submission failed.");
                console.error(err);
            }
        }

        <form onSubmit={handleSubmit}>
            <div className="upload-button" onClick={handleClick}>
                Upload submission
            </div>
            <input type="file" accept=".jpg,.jpeg,.png,.heic" ref={fileInputRef} onChange={handleFileChange} style={{display: "none"}} />

            {selectedFile && <div>Selected: {selectedFile.name}</div>}

            <textarea placeholder="Optional comment" maxLength={4000} value={comment} onChange={(e) => setComment(e.target.value)} />

            <button type="submit">Submit Quest</button>
            
            {/* {status && <div>{status}</div>} */}

        </form>

    }

    const MyQuestContent = () => {
        // Delete Quest
        // Open or Closed
    }

  return (
    <div className="quest-details-main-container">
        <Sidebar />
        <div className="quest-details-content-container">
            <div className="quest-details-header">
                <Link onClick={goBack} className="back-button">
                    <img src={backIcon} />
                    <div className="back-text">Back</div>
                </Link>
                <div className="quest-details-header-contents"> 
                    <div className="quest-details-title"></div>
                    <div>Created by</div>
                    <div>Quest closes on </div>
                </div>
            </div>
            <div className="quest-details-body">
                <div className="quest-details-content">
                    <div className="quest-details-text">
                        <div className="quest-details-subheading">Description</div>
                        <div></div>
                    </div>
                    <div className="quest-details-text">
                        <div className="quest-details-subheading">Incentive</div>
                        <div></div>
                    </div>
                </div>
                {sourceTab === 'OpenQuests' && <OpenQuestContent />}
            </div>
            {sourceTab === 'AcceptedQuests' && <AcceptedQuestContent />}
        </div>
    </div>
  )
}

export default QuestDetails;