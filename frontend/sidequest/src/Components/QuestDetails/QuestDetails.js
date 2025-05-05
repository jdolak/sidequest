import "./questdetails.css";
import React, {useEffect,useState, useRef} from "react";
import Sidebar from "../Sidebar/Sidebar.js";
// import backIcon from '../../assets/images/chevron.svg';
import { getQuest, getQuestSubmission, acceptQuest, submitQuest } from "../../Services/Quests.js";
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
        getQuest(questID).then((response) => {
          console.log("Fetched quest:", response);
          setQuest(response);
        }).catch((error) => {
          console.error("Error fetching quest:", error);
        });
      
        getQuestSubmission(questID).then((submissionData) => {
          console.log("Fetched submission:", submissionData);
          setSubmission(submissionData);
        }).catch((error) => {
          console.error("Error fetching quest submission:", error);
        });
      }, [questID]);

    function handleAcceptQuest() {
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
            <div className="accept-button" onClick={() => {handleAcceptQuest()}}>
                Accept quest
            </div>
        )
    }

    // Accepted Quest Content
    const AcceptedQuestContent = () => {
        const fileInputRef = useRef(null);
        const [selectedFile, setSelectedFile] = useState(null);
        const [comment, setComment] = useState("");
    
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
    
            const formData = new FormData();
            if (selectedFile) {
                formData.append("file", selectedFile);
            }
    
            if (comment) {
                formData.append("comment", comment);
            }
    
            submitQuest(questID, formData).then((response) => {
                console.log("Quest submitted:", response);
                setSelectedFile(null);
                setComment("");

                setQuest((prevQuest) => ({ ...prevQuest, quest_status: "Resolved"}));

            }).catch((error) => {
                console.error("Error submitting quest:", error);
            });
        }

        return (
            <div className="quest-details-text">
                <div className="quest-details-subheading">Quest Submission</div>
                    <form onSubmit={handleSubmit} className="quest-submission-form">
                        <div className="upload-button" onClick={handleClick}>
                            Upload submission photo
                        </div>
                        <input type="file" accept=".jpg,.jpeg,.png,.heic" ref={fileInputRef} onChange={handleFileChange} style={{display: "none"}} />

                        {selectedFile && <div>Selected: {selectedFile.name}</div>}

                        <textarea className="submission-comment" placeholder="Submission Description" maxLength={4000} value={comment} onChange={(e) => setComment(e.target.value)} required/>

                        <button className="submit-button" type="submit">Submit Quest</button>
                    
                    {/* {status && <div>{status}</div>} */}
                </form>
            </div>

        )
    }

    const MyQuestContent = () => {
        console.log(submission);
        
        if (!submission) return null;
        
        return (
            <div className="quest-details-text">
                <div className="quest-details-subheading">Submission</div>
                <div>Completed by {submission.username || "Unknown user"}</div>
                <div>{submission.submission_photo}</div>
                <div>{submission.comments}</div>
        </div>
        )
    }

  return (
    <div className="quest-details-main-container">
        <Sidebar />
        <div className="quest-details-content-container">
            <div className="quest-details-header">
                <Link onClick={goBack} className="back-button">
                <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5 19L1.5 10L10.5 1" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
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
                {quest?.quest_status?.toLowerCase() === 'open' && <OpenQuestContent />}
            </div>
            {quest?.quest_status?.toLowerCase() === 'accepted' && <AcceptedQuestContent />}
            {quest?.quest_status?.toLowerCase() === 'resolved' && <MyQuestContent />}
        </div>
    </div>
  )
}

export default QuestDetails;