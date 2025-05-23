import React, {useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./authregister.css";
import {getLoggedInUser} from "../../Services/Users.js";

const AuthRegister = ({ onSubmit }) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
            const checkLoggedInUser = async () => {
                try {
                    const user = await getLoggedInUser();
                    if (user.status === "true") {
                        navigate("/search");
                    }
                } catch (error) {
                    console.error("Error checking logged-in user:", error);
                }
            };
            checkLoggedInUser();
        }, [navigate]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
        setErrorMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch("https://sq.jdolak.com/auth/register", {
                method :"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                }),

            });

            if (!response.ok) {
                throw new Error("Failed to register");
            }

            const data = await response.json();
            localStorage.setItem("authenticated", "true");

            if (onSubmit) {
                onSubmit(formData);
            }

            navigate("/search");
            
        }  catch (error) {
            console.error("Registration failed:", error);
            alert(error.message);
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
                        <label className="form-label">
                            Confirm Password
                            <input className="form-input" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                        </label>
                    </div>
                    <button className="submit-button" type="submit">Sign up</button>
                </form>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="redirect">Have an account with us? <Link to="/login" className="redirect-link">Log in here.</Link></div>
            </div>
        </div>
    )
}

export default AuthRegister;
