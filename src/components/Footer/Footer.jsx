import React from 'react';
import { Type, Heart, Github, Linkedin, Mail } from 'lucide-react';
import './Footer.css';

const Footer = ({ isDarkMode }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`footer ${isDarkMode ? 'dark' : ''}`}>
      <div className="footer-gradient-overlay"></div>

      <div className="container">
        <div className="footer-content">

          {/* ================= BRAND ================= */}
          <div className="footer-brand">
            <div className={`logo-container ${isDarkMode ? 'dark' : ''}`}>
              <div className="logo-icon">
                <Type className="icon" />
                <div className="icon-glow"></div>
              </div>
              <div className="brand-text">
                <h3 className="logo-text">FontSense</h3>
                <p className="brand-subtitle">AI-Powered Typography</p>
              </div>
            </div>

            <p className="footer-tagline">
              <span className="tagline-highlight">Powered by AI</span>
              <span className="tagline-separator">•</span>
              <span className="tagline-highlight">Built for Designers</span>
            </p>
          </div>

          {/* ================= SOCIAL ================= */}
          <div className="footer-social">
            <h4 className="social-title">Connect</h4>

            <div className="social-links">
              <a
                href="https://github.com/Nayan-135"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <Github className="social-icon" />
              </a>

              <a
                href="https://www.linkedin.com/in/nayan-ghate-720273321/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <Linkedin className="social-icon" />
              </a>

              <a
                href="mailto:ghate123@gmail.com"
                className="social-link"
                aria-label="Email"
              >
                <Mail className="social-icon" />
              </a>
            </div>
          </div>

          {/* ================= BOTTOM ================= */}
          <div className="footer-bottom">
            <p className="copyright-text">
              © {currentYear} FontSense. Made with
              <Heart className="heart-icon" />
              for designers.
            </p>
          </div>

        </div>
      </div>

      {/* ================= BACKGROUND ================= */}
      <div className="footer-bg-elements">
        <div className="bg-element element-1"></div>
        <div className="bg-element element-2"></div>
        <div className="bg-element element-3"></div>
      </div>
    </footer>
  );
};

export default Footer;
