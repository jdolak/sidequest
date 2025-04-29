import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./authregister.css";

const AuthRegister = ({ onSubmit }) => {

    // const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://sq.jdolak.com/auth/register", {
                method :"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),

            });

            if (!response.ok) {
                throw new Error("Failed to register");
            }

            const data = await response.json();
            console.log("Registration successful:", data);
            localStorage.setItem("authenticated", "true");
            window.location.replace("/search");

            if (onSubmit) {
                onSubmit(formData);
            }
        }  catch (error) {
            console.error("Registration failed:", error);
        };
    };

    return (
        <div className="main-container">
            <div className="main-title">Sign Up</div>
            <div className="auth-content">
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-data">
                        <label className="form-label">
                            Username
                            <input className="form-input" type="text" name="username" value={formData.username} onChange={handleChange} required />
                        </label>
                        <label className="form-label">
                            Password
                            <input className="form-input" type="password" name="password" value={formData.password} onChange={handleChange} required />
                        </label>
                    </div>
                    <button className="submit-button" type="submit">Sign up</button>
                </form>
                <div className="redirect">Have an account with us? <Link to="/login" className="redirect-link">Log in here.</Link></div>
            </div>
        </div>
    )
}

export default AuthRegister;
