import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import '../styles/ThemeSwitcher.css';

const ThemeSwitcher = ({ theme, toggleTheme }) => {
  return (
    <button onClick={toggleTheme} className="theme-switcher-button">
      {theme === 'dark' ? (
        <FontAwesomeIcon icon={faSun} title="Switch to Light Mode" />
      ) : (
        <FontAwesomeIcon icon={faMoon} title="Switch to Dark Mode" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
