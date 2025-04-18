import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./authlogin.css";

const AuthLogin = ({onSubmit}) => {
    const [formData, setFormData] = useState({
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
            const response = await fetch("https://sq.jdolak.com/api/auth/login", {
                method :"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),

            });

            if (!response.ok) {
                throw new Error("Failed to log in");
            }

            const data = await response.json();
            console.log("Log in successful:", data);

            if (onSubmit) {
                onSubmit(formData);
            }
        }  catch (error) {
            console.error("Log in failed:", error);
        };
    };

    return (
        <div className="main-container">
            <div className="main-title">Log In</div>
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
                    <button className="submit-button" type="submit">Log in</button>
                </form>
                <div className="redirect">Don't have an account? <Link to="/register" className="redirect-link">Create one here.</Link></div>
            </div>
        </div>
    )
}

export default AuthLogin;
