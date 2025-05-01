import "./questdetails.css";
import React, {useEffect,useState, useRef} from "react";
import Sidebar from "../Sidebar/Sidebar.js";
import backIcon from '../../assets/images/chevron.svg';
import { getQuest } from "../../Services/Quests.js";
import { getQuestSubmission } from "../../Services/Quests.js";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

const QuestDetails = () => {
    const navigate = useNavigate();
    const questID = useParams().id;
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

        fetch (`https://sq.jdolak.com/api/quest_submissions/<int:submission_id>`)
    }, [questID]);

    // Open Quest Specific Content
    const OpenQuestContent = () => {
        return (
            <div className="accept-button">
                Accept quest
            </div>
        )
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

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

        return (
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

        )
    }

    const MyQuestContent = () => {
        // if quest has been accepted, if not return nothing
        return (
            <div className="quest-details-text">
                <div className="quest-details-subheading">Submission</div>
                <div>Completed by jdolak</div>
                {/* insert img submission */}
                <div>{/* insert comment submission */}</div>
        </div>
        )
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
                    <div>Quest closes on {formatDate(quest?.due_date)}</div>
                </div>
            </div>
            <div className="quest-details-body">
                <div className="quest-details-content">
                    <div className="quest-details-text">
                        <div className="quest-details-subheading">Status</div>
                        <div>{quest?.quest_status}</div>
                    </div>
                    <div className="quest-details-text">
                        <div className="quest-details-subheading">Description</div>
                        <div>{quest?.quest_desc}</div>
                    </div>
                    <div className="quest-details-text">
                        <div className="quest-details-subheading">Incentive</div>
                        <div>{quest?.reward_amount} coin{quest?.reward_amount === 1 ? "" : "s"}</div>
                    </div>
                    {/* <MyQuestContent /> */}
                </div>
                {quest?.quest_status === 'Open' && <OpenQuestContent />}
            </div>
            {quest?.quest_status === 'Accepted' && <AcceptedQuestContent />}
        </div>
    </div>
  )
}

export default QuestDetails;