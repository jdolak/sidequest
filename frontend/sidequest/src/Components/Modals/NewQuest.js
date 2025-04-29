import React, {useState} from "react";
import "./modal.css";
import Close from "../../assets/images/close.svg";
import { createQuest } from "../../Services/Quests";

const NewQuestModal = ({ onClose }) => {

    const [formData, setFormData] = useState({
        questname: "",
        questdesc: "",
        questincentive: "",
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
        }).catch((error) => {
            console.error("Error creating quest:", error);
            alert("Error creating Quest. "+error.message);
        });

        onClose();
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-head">
                    <div className="modal-heading">Open New Quest</div>
                    <img src={Close} className="close-btn" onClick={onClose}/>
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
                                Quest incentive
                                <textarea className="form-input" name="questincentive" value={formData.questincentive} onChange={handleChange} rows={2} />
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