import React from 'react';
import { Type, Heart, Github, Twitter, Mail, ExternalLink } from 'lucide-react';
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

          {/* ================= NAVIGATION ================= */}
          <div className="footer-nav">

            {/* PRODUCT */}
            <div className="nav-section">
              <h4 className="nav-title">Product</h4>
              <div className="nav-links">

                <button className="footer-link">
                  <span>Font Detection</span>
                  <ExternalLink className="link-icon" />
                </button>

                <button className="footer-link">
                  <span>API Access</span>
                  <ExternalLink className="link-icon" />
                </button>

                <button className="footer-link">
                  <span>Premium Features</span>
                  <ExternalLink className="link-icon" />
                </button>

              </div>
            </div>

            {/* RESOURCES */}
            <div className="nav-section">
              <h4 className="nav-title">Resources</h4>
              <div className="nav-links">

                <button className="footer-link">
                  <span>Documentation</span>
                  <ExternalLink className="link-icon" />
                </button>

                <button className="footer-link">
                  <span>Tutorials</span>
                  <ExternalLink className="link-icon" />
                </button>

                <button className="footer-link">
                  <span>Font Library</span>
                  <ExternalLink className="link-icon" />
                </button>

              </div>
            </div>

            {/* SUPPORT */}
            <div className="nav-section">
              <h4 className="nav-title">Support</h4>
              <div className="nav-links">

                <button className="footer-link">
                  <span>Help Center</span>
                  <ExternalLink className="link-icon" />
                </button>

                <button className="footer-link">
                  <span>Contact Us</span>
                  <ExternalLink className="link-icon" />
                </button>

                <button className="footer-link">
                  <span>Bug Reports</span>
                  <ExternalLink className="link-icon" />
                </button>

              </div>
            </div>

          </div>

          {/* ================= SOCIAL ================= */}
          <div className="footer-social">
            <h4 className="social-title">Connect With Us</h4>
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
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Twitter"
              >
                <Twitter className="social-icon" />
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

            <div className="footer-legal">
              <button className="legal-link">Privacy Policy</button>
              <span className="legal-separator">•</span>
              <button className="legal-link">Terms of Service</button>
              <span className="legal-separator">•</span>
              <button className="legal-link">Cookie Policy</button>
            </div>

            <div className="footer-copyright">
              <p className="copyright-text">
                © {currentYear} FontSense. Made with
                <Heart className="heart-icon" />
                for designers everywhere.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* BACKGROUND */}
      <div className="footer-bg-elements">
        <div className="bg-element element-1"></div>
        <div className="bg-element element-2"></div>
        <div className="bg-element element-3"></div>
      </div>
    </footer>
  );
};

export default Footer;
