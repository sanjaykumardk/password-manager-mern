import React, { useState } from 'react';
import '../styles/Home.css';

const Home = () => {
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [strength, setStrength] = useState('');
    const [tips, setTips] = useState([]);

    const evaluatePassword = (input) => {
        setPassword(input);
        
        let strengthLevel = 0;
        let newTips = [];

        if (input.length >= 8) strengthLevel++;
        else newTips.push("Use at least 8 characters.");

        if (/[A-Z]/.test(input)) strengthLevel++;
        else newTips.push("Include at least one uppercase letter.");

        if (/\d/.test(input)) strengthLevel++;
        else newTips.push("Include at least one number.");

        if (/[!@#$%^&*(),.?":{}|<>]/.test(input)) strengthLevel++;
        else newTips.push("Use special characters (e.g., !, @, #, $).");

        if (strengthLevel <= 1) setStrength('Weak');
        else if (strengthLevel === 2) setStrength('Moderate');
        else if (strengthLevel === 3) setStrength('Strong');
        else if (strengthLevel === 4) setStrength('Very Strong');

        setTips(newTips);
    };

    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to Password Manager</h1>
            <br />
            {/* Password Strength Checker */}
            <section className="password-strength-section">
                
                <h2>Password Strength Checker</h2>
                <div className="password-input-container">
                    <input 
                        type={isVisible ? "text" : "password"} 
                        className="password-input" 
                        placeholder="Enter your password..." 
                        value={password} 
                        onChange={(e) => evaluatePassword(e.target.value)} 
                    />
                    <button 
                        className="visibility-toggle" 
                        onClick={() => setIsVisible(!isVisible)}
                    >
                        {isVisible ? '👁️' : '🚫'}
                    </button>
                </div>
                
                <div className={`strength-meter ${strength.toLowerCase()}`}>
                    <div className="strength-bar"></div>
                </div>
                <p className="strength-text">{strength}</p>

                {tips.length > 0 && (
                    <ul className="password-tips">
                        {tips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                        ))}
                    </ul>
                )}
            </section>

            {/* Security Checklist */}
            <section className="security-checklist-section">
                <h2>Security Checklist</h2>
                <ul className="checklist">
                    <li className="checklist-item">
                        <input type="checkbox" id="unique-passwords" />
                        <label htmlFor="unique-passwords">Use unique passwords for each account</label>
                    </li>
                    <li className="checklist-item">
                        <input type="checkbox" id="2fa" />
                        <label htmlFor="2fa">Enable two-factor authentication (2FA)</label>
                    </li>
                    <li className="checklist-item">
                        <input type="checkbox" id="avoid-personal-info" />
                        <label htmlFor="avoid-personal-info">Avoid using personal information</label>
                    </li>
                    <li className="checklist-item">
                        <input type="checkbox" id="regular-change" />
                        <label htmlFor="regular-change">Change your passwords regularly</label>
                    </li>
                </ul>
            </section>

            {/* Motivational Quote */}
            <section className="quote-section">
                <h2>Did You Know?</h2>
                <blockquote>
                    "It would be so much easier if there were a secret password, or handshake. 
                    Netherworld, open sesame! Yeah, that didn't work, either." ~ Rachel Vincent"
                </blockquote>
            </section>
        </div>
    );
};

export default Home;
