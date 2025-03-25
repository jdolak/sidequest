import React from 'react';
import './header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <h1 className="header-title">SideQuest</h1>
                <nav className="header-nav">
                    <ul className="nav-list">
                        <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
                        <li className="nav-item"><a href="/about" className="nav-link">About</a></li>
                        <li className="nav-item"><a href="/contact" className="nav-link">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;