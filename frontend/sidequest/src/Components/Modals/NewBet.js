import React, {useState} from "react";
import "./modal.css";
import Close from "../../assets/images/close.svg";
import { createBet } from "../../Services/Bets";

const NewBetModal = ({ onClose }) => {

    const [formData, setFormData] = useState({
        betname: "",
        betdesc: "",
        betodds: "",
        betposition: "",
        betquantity: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev, [name]: value
        }));
    };

    function betCreationCost(betYesOdds, betQuantity, betPosition) {

        if (!Number.isInteger(betYesOdds) || betYesOdds < 1 || betYesOdds > 99) {
            throw new Error("betYesOdds must be an integer between 0 and 100");
        }

        if (betPosition === "yes") {
            return betYesOdds * betQuantity;
        }
        return (100 - betYesOdds) * betQuantity;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let confirmMessage = ""; 

        try{
            confirmMessage = `Opening this bet will cost: ${betCreationCost(formData.betodds, formData.betquantity, formData.betposition)}?`;
        } catch (error) {
            console.error("Error calculating bet creation cost:", error);
            alert("Invalid bet odds. Please check your input.");
            return;
        }
        const isConfirmed = window.confirm(confirmMessage);
        
        if (isConfirmed) { // Proceed with the submission
            console.log("Bet submitted:", formData);
            createBet(formData).then((response) => {
                console.log("Bet created successfully:", response);
            }).catch((error) => {
                console.error("Error creating bet:", error);
            });
            onClose();
        } else { // Cancel the submission
            console.log("Bet submission canceled.");
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-head">
                    <div className="modal-heading">Open New Bet</div>
                    <img src={Close} className="close-btn" onClick={onClose}/>
                </div>

                <form onSubmit={handleSubmit} className="group-form">
                    <div className="form-data">
                        <label className="form-label">
                                Bet title
                                <input className="form-input" type="text" name="betname" value={formData.betname} onChange={handleChange} required />
                        </label>
                        <label className="form-label">
                                Bet description
                                <textarea className="form-input" name="betdesc" value={formData.betdesc} onChange={handleChange} rows={2} />
                        </label>
                        <label className="form-label">
                                Odds
                                <input className="form-input" type="number" name="betodds" value={formData.betodds} onChange={handleChange} required />
                        </label>
                        <label className="form-label">
                                Bet Position
                                <select className="form-input" name="betposition" value={formData.betposition} onChange={handleChange} required >
                                    <option value="">Select position</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                        </label>
                        <label className="form-label">
                                Quantity
                                <input className="form-input" type="number" name="betquantity" value={formData.betquantity} onChange={handleChange} required />
                        </label>
                    </div>
                    <button className="submit-button" type="submit">Open bet</button>
                </form>
            </div>
        </div>
       
    )
}

export default NewBetModal;