import React, {useState} from "react";
import "./modal.css";
import Close from "../../assets/images/close.svg";
import { createGroup } from "../../Services/Groups";

const NewGroupModal = ({ onClose, onSuccess }) => {

    const [formData, setFormData] = useState({
        groupvisibility: "Y",
        groupname: "",
        groupdesc: "",
        groupcoins: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev, [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        createGroup(formData).then((response) => {
            console.log("Group created successfully:", response);
            onSuccess();
        }).catch((error) => {
            console.error("Error creating group:", error);
            alert("Error creating group.", error.message);
            onClose();
        });

    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-head">
                    <div className="modal-heading">Create New Group</div>
                    <img src={Close} className="close-btn" onClick={onClose}/>
                </div>

                <form onSubmit={handleSubmit} className="group-form">
                    <div className="form-data">
                        <label className="form-label">
                                Visibility
                                <div className="form-radio-group" required>
                                    <label>
                                        <input type="radio" name="groupvisibility" value="Y" checked={formData.groupvisibility === "public"} onChange={handleChange} />
                                        Public
                                    </label>
                                    <label>
                                        <input type="radio" name="groupvisibility" value="N" checked={formData.groupvisibility === "private"} onChange={handleChange} />
                                        Private
                                    </label>
                                </div>
                        </label>
                        <label className="form-label">
                                Group name
                                <input className="form-input" type="text" name="groupname" value={formData.groupname} onChange={handleChange} required />
                        </label>
                        <label className="form-label">
                                Group description
                                <textarea className="form-input" name="groupdesc" value={formData.groupdesc} onChange={handleChange} rows={4} required />
                        </label>
                        <label className="form-label">
                                Coins per group member
                                <input className="form-input" type="number" name="groupcoins" value={formData.groupcoins} onChange={handleChange} required />
                        </label>
                    </div>
                    <button className="submit-button" type="submit">Create group</button>
                </form>
            </div>
        </div>
       
    )
}

export default NewGroupModal;