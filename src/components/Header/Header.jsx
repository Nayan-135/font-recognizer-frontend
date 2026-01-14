import React from 'react';
import { Type, Sun, Moon } from 'lucide-react';
import './Header.css';

const Header = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className={`header ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo-container">
            <div className="logo-icon-wrapper">
              <div className="logo-icon">
                <Type className="icon logo-type-icon" />
              </div>
              <div className="logo-glow"></div>
            </div>
            <div className="logo-text">
              <h1 className="logo-title">
                <span className="logo-font">Font</span>
                <span className="logo-sense">Sense</span>
              </h1>
              <p className="logo-subtitle">
                <span className="ai-badge">AI</span>
                Powered Font Recognition
              </p>
            </div>
          </div>
          
          <div className="header-actions">
            <button
              onClick={toggleDarkMode}
              className="theme-toggle"
              aria-label="Toggle theme"
            >
              <div className="theme-icon-wrapper">
                {isDarkMode ? (
                  <Sun className="icon theme-icon" />
                ) : (
                  <Moon className="icon theme-icon" />
                )}
              </div>
              <span className="theme-text">
                {isDarkMode ? 'Light' : 'Dark'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;