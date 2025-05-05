import React, {useState} from "react";
import "./modal.css";
import Close from "../../assets/images/close.svg";
import { createQuest } from "../../Services/Quests";

const NewQuestModal = ({ onClose, onSuccess }) => {

    const [formData, setFormData] = useState({
        questname: "",
        questdesc: "",
        questreward: "",
        questdate: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev, [name]: value
        }));
    };

    function verifyQuestCreationCost(questReward) {
        if (!Number.isInteger(Number(questReward)) || questReward < 0) {
            throw new Error("questReward must be a positive integer.");
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            verifyQuestCreationCost(formData.questreward);
        }
        catch (error) {
            console.error(error);
            alert("Invalid quest reward. Please check your input.");
            return;
        }

        createQuest(formData).then((response) => {
            console.log("Quest created successfully:", response);
            onSuccess();
            onClose();
        }).catch((error) => {
            console.error("Error creating quest:", error);
            alert("Error creating Quest. "+error.message);
        });
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-head">
                    <div className="modal-heading">Open New Quest</div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClose}>
                        <path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="inherit" stroke="inherit"/>
                    </svg>
                </div>

                <form onSubmit={handleSubmit} className="group-form">
                    <div className="form-data">
                        <label className="form-label">
                                Quest title
                                <input className="form-input" type="text" name="questname" value={formData.questname} onChange={handleChange} required />
                        </label>
                        <label className="form-label">
                                Quest description
                                <textarea className="form-input" name="questdesc" value={formData.questdesc} onChange={handleChange} rows={2} />
                        </label>
                        <label className="form-label">
                                Reward (coins)
                                <input className="form-input" type="number" name="questreward" value={formData.questreward} onChange={handleChange} required />
                        </label>
                        <label className="form-label">
                                Deadline
                                <input className="form-input" type="date" name="questdate" value={formData.questdate} onChange={handleChange} required />
                        </label>
                    </div>
                    <button className="submit-button" type="submit">Open quest</button>
                </form>
            </div>
        </div>
       
    )
}

export default NewQuestModal;