import "./questdetails.css";
import React, {useEffect,useState, useRef} from "react";
import Sidebar from "../Sidebar/Sidebar.js";
import backIcon from '../../assets/images/chevron.svg';
import { getQuest, getQuestSubmission, acceptQuest } from "../../Services/Quests.js";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { formatDate } from "../../utils/utils.js";

const QuestDetails = () => {
    const navigate = useNavigate();
    const questID = useParams().id;
    const [quest, setQuest] = useState(null);
    const location = useLocation();
    const [submission, setSubmission] = useState(null);
    // const sourceTab = location.state?.sourceTab;

    const goBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        if (quest === null) {
            getQuest(questID).then((response) => {
                setQuest(response);
                console.log("Quest data:", response);
            }).catch((error) => {
                console.error("Error fetching quest:", error);
            });
        }

        getQuestSubmission(questID).then((submissionData) => {
            setSubmission(submissionData);
        }).catch((error) => {
            console.error("Error fetching quest submission:", error);
        });
    }, [questID, quest]);

    function acceptQuestHandler() {
        console.log("Accepting quest with ID:", questID);
        acceptQuest(questID).then((response) => {
            console.log("Quest accepted:", response);
            setQuest((prevQuest) => ({ ...prevQuest, quest_status: "Accepted" }));
            console.log("Quest status updated to Accepted "+quest);
        }).catch((error) => {
            console.error("Error accepting quest:", error);
            alert("Error accepting quest. Please try again later. "+error.message);
        });
    };

    // Open Quest Specific Content
    const OpenQuestContent = () => {
        return (
            <div className="accept-button" onClick={() => {acceptQuestHandler()}}>
                Accept quest
            </div>
        )
    }

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
            } catch (err) {
                setStatus("Submission failed.");
                console.error(err);
            }
        }

        return (
            <form onSubmit={handleSubmit} className="quest-submission-form">
                <div className="upload-button" onClick={handleClick}>
                    Upload submission
                </div>
                <input type="file" accept=".jpg,.jpeg,.png,.heic" ref={fileInputRef} onChange={handleFileChange} style={{display: "none"}} />

                {selectedFile && <div>Selected: {selectedFile.name}</div>}

                <textarea className="submission-comment" placeholder="Optional comment" maxLength={4000} value={comment} onChange={(e) => setComment(e.target.value)} />

                <button className="submit-button" type="submit">Submit Quest</button>
                
                {/* {status && <div>{status}</div>} */}
            </form>

        )
    }

    const MyQuestContent = () => {
        if (!submission) return null;
        return (
            <div className="quest-details-text">
                <div className="quest-details-subheading">Submission</div>
                <div>Completed by {submission.username}</div>
                <div>{submission.submission_photo}</div>
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
                    <div className="quest-details-title">{quest?.quest_title}</div>
                    <div>Created by {quest?.username}</div>
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
                        <div className="quest-details-subheading">Reward</div>
                        <div>{quest?.reward_amount} coin{quest?.reward_amount === 1 ? "" : "s"}</div>
                    </div>
                    {/* <MyQuestContent /> */}
                </div>
                {quest?.quest_status === 'Open' && <OpenQuestContent />}
            </div>
            {quest?.quest_status === 'Accepted' && <AcceptedQuestContent />}
            {quest?.quest_status === 'Resolved' && <MyQuestContent />}
        </div>
    </div>
  )
}

export default QuestDetails;