import React, {useState} from "react";
import "./modal.css";
import Close from "../../assets/images/close.svg";

const NewGroupModal = ({ onClose }) => {

    const [formData, setFormData] = useState({
        groupname: "",
        groupdesc: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev, [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        try {
            const response = await fetch("https://sq.jdolak.com/api/groups/create", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Upload failed");

            const result = await response.json();
            console.log(result);
        } catch (err) {
            console.error(err);
        }
        onClose();
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
                                Group name
                                <input className="form-input" type="text" name="groupname" value={formData.group_name} onChange={handleChange} required />
                        </label>
                        <label className="form-label">
                                Group description
                                <textarea className="form-input" name="groupdesc" value={formData.group_desc} onChange={handleChange} rows={4} />
                        </label>
                    </div>
                    <button className="submit-button" type="submit">Create group</button>
                </form>
            </div>
        </div>
       
    )
}

export default NewGroupModal;