import React from "react";
import "./home.css";

const Home = () => {
    return (
        <div className="home-container">
            <div className="main-container">
                <div className="header">
                    <div className="title">Welcome to <span className="sidequest">Sidequest</span></div>
                    <div className="slogan">The social way to check off your bucket list</div>
                </div>
                <div className="auth-buttons">
                    <button className="sign-up">Sign up</button>
                    <button className="log-in">Log in</button>
                </div>
            </div>
            <div className="footer">
                <div className="footer-text">CSE 40746 - Advanced Database Concepts</div>
                <div className="footer-text">Spring 2025</div>
                <div className="footer-text">Jachob Dolak, Patrick Schlosser, Calista Suwita</div>
            </div>
        </div>
    )
}

export default Home;