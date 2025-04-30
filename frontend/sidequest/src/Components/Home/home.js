import React, {useEffect} from "react";
import "./home.css";
import {useNavigate} from "react-router-dom";
import { getLoggedInUser } from "../../Services/Users";

const Home = () => {

    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate("/register");
    }

    const handleLogIn = () => {
        navigate("/login");
    }

    useEffect(() => {
        const checkLoggedInUser = async () => {
            try {
                const user = await getLoggedInUser();
                console.log("Logged-in user:", user);
                if (user.status === "true") {
                    navigate("/search");
                }
            } catch (error) {
                console.error("Error checking logged-in user:", error);
            }
        };
        checkLoggedInUser();
    }
    , []);


    return (
        <div className="home-container">
            <div className="main-container">
                <div className="header">
                    <div className="title">Welcome to <span className="sidequest">Sidequest</span></div>
                    <div className="slogan">The social way to check off your bucket list</div>
                </div>
                <div className="auth-buttons">
                    <button className="sign-up" onClick={handleSignUp}>Sign up</button>
                    <button className="log-in" onClick={handleLogIn}>Log in</button>
                </div>
            </div>
            <div className="footer">
                <div className="footer-text">CSE 40746 Spring 2025</div>
                <div className="footer-text">By Jachob Dolak, Patrick Schlosser, and Calista Suwita</div>
            </div>
        </div>
    )
}

export default Home;