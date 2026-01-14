import React, { useState } from 'react';
import "../About/About.css";
import { Sparkles, Zap, Target, Palette, Brain, Wand2, ChevronDown, ChevronUp } from 'lucide-react';

const About = ({ isDarkMode = false }) => {
  const [showFonts, setShowFonts] = useState(false);
  
  const availableFonts = [
    'Algerian', 
    'Arial Rounded MT Bold', 
    'Baguet Script', 
    'Bauhaus 93', 
    'Bernard MT Condensed', 
    'Blackadder ITC', 
    'Bodoni MT Poster Compressed', 
    'Bradley Hand ITC', 
    'Cooper Black', 
    'Forte', 
    'Goudy Stout', 
    'Informal Roman', 
    'Old English Text MT', 
    'Ravie', 
    'Rockwell', 
    'STCaiyun', 
    'Sitka Display', 
    'Snap ITC', 
    'Yu Gothic', 
    'Chiller'
  ];

  return (
    <section className={`about-section ${isDarkMode ? 'dark' : ''}`}>
      <div className="container">
        <div className="about-content">
          {/* Header Section */}
          <div className="about-header">
            <div className="title-wrapper">
              <div className="floating-icons">
                <Sparkles className="float-icon icon-1" size={24} />
                <Wand2 className="float-icon icon-2" size={20} />
                <Zap className="float-icon icon-3" size={18} />
              </div>
              <h2 className="about-title">Font Magic at Your Fingertips</h2>
            </div>
            <p className="about-description">
              Unleash the power of AI-driven typography discovery. Every font tells a story, 
              and we help you find the perfect one for yours.
            </p>
          </div>
          
          {/* Features Grid */}
          <div className="features-grid">
            <div className="feature-card modern-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon bg-cosmic">
                  <Brain className="icon pulse-icon" size={44} />
                </div>
                <div className="feature-glow bg-cosmic-glow"></div>
                <div className="orbit-ring"></div>
              </div>
              <div className="feature-content">
                <h3 className="feature-title">AI-Powered Recognition</h3>
                <p className="feature-text">
                  Our system can identify popular fonts from images with impressive accuracy
                </p>
              </div>
            </div>
            
            <div className="feature-card modern-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon bg-electric">
                  <Target className="icon rotate-icon" size={44} />
                </div>
                <div className="feature-glow bg-electric-glow"></div>
                <div className="orbit-ring"></div>
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Precision Matching</h3>
                <p className="feature-text">
                  Find exact matches and discover similar alternatives from our curated collection
                </p>
              </div>
            </div>
            
            <div className="feature-card modern-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon bg-rainbow">
                  <Palette className="icon wave-icon" size={44} />
                </div>
                <div className="feature-glow bg-rainbow-glow"></div>
                <div className="orbit-ring"></div>
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Creative Inspiration</h3>
                <p className="feature-text">
                  Explore typography trends and get suggestions for your design projects
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="stats-section">
            <div className="stat-item">
              <div className="stat-number">20+</div>
              <div className="stat-label">Fonts in Database</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Accuracy Rate</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">1K+</div>
              <div className="stat-label">Fonts Identified</div>
            </div>
          </div>

          {/* Available Fonts Section */}
          <div className="available-fonts-section">
            <button 
              className="show-fonts-button" 
              onClick={() => setShowFonts(!showFonts)}
            >
              {showFonts ? 'Hide Available Fonts' : 'Show Available Fonts'}
              {showFonts ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            
            {showFonts && (
              <div className="fonts-list">
                <h4>Fonts We Can Identify:</h4>
                <div className="fonts-grid">
                  {availableFonts.map((font, index) => (
                    <div key={index} className="font-item">
                      {font}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;