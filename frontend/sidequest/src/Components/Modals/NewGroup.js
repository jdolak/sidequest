import React, {useState} from "react";
import "./newgroup.css";
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

    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();
    }

    return (
        <div className="modal-container">
            <div className="modal-head">
                <div className="modal-heading">Create New Group</div>
                <img src={Close} onClick={onClose}/>
            </div>

            <form onSubmit={handleSubmit} className="group-form">
                <div className="form-data">
                    <label className="form-label">
                            Group name
                            <input className="form-input" type="text" name="groupname" value={formData.groupname} onChange={handleChange} required />
                    </label>
                    <label className="form-label">
                            Group description
                            <textarea className="form-input" name="groupdesc" value={formData.groupdesc} onChange={handleChange} rows={4} />
                    </label>
                </div>
                <button className="submit-button" type="submit">Create Group</button>
            </form>
        </div>
    )
}

export default NewGroupModal;