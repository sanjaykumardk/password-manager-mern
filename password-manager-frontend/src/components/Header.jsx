import React from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher'; 
import logo from '../assets/crypto.png'; 
import '../styles/Header.css';

const Header = ({ theme, toggleTheme }) => {
  return (
    <header className="header-container">
      {/* Logo and app title */}
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="app-title">Password Manager</h1>
      </div>

      {/* Navigation menu */}
      <nav className="navigation">
        <ul className="nav-list">
          <li>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li>
            <Link to="/add" className="nav-link">Add Password</Link>
          </li>
          <li>
            <Link to="/list" className="nav-link">Password List</Link>
          </li>
          <li>
            <Link to="/generator" className="nav-link">Random Password Generator</Link>
          </li>
        </ul>

        {/* ThemeSwitcher placed next to navigation links */}
        <div className="theme-switcher-wrapper">
          <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
