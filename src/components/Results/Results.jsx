import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, Sparkles, Copy, Star, TrendingUp, Zap } from 'lucide-react';
import './Results.css';

const Result = ({ isDarkMode, predictions, hasInput, uploadedImage }) => {
  const [animateIn, setAnimateIn] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [detectedText, setDetectedText] = useState('');
  const resultsRef = useRef(null);

  useEffect(() => {
    if (hasInput) {
      setAnimateIn(true);
    }
  }, [hasInput]);

  useEffect(() => {
    // Extract detected text from predictions if available
    if (predictions && predictions.length > 0) {
      const text = predictions.map(pred => pred[0]).join(', ');
      setDetectedText(text);
    }
  }, [predictions]);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const formatPredictions = () => {
    if (!predictions || predictions.length === 0) return [];
    
    return predictions.map(([label, confidence], index) => ({
      name: label,
      confidence: (confidence * 100).toFixed(0),
      category: 'Detected',
      popularity: confidence > 0.9 ? 'Very High' : 
                 confidence > 0.7 ? 'High' : 
                 confidence > 0.5 ? 'Medium' : 'Low',
      tags: ['AI-detected', 'Font match'],
      isPrimary: index === 0
    }));
  };

  if (!hasInput) {
    return (
      <div className={`results-empty ${isDarkMode ? 'dark' : ''}`}>
        <div className="empty-content">
          <div className="empty-icon-wrapper">
            <AlertCircle className="empty-icon" />
            <div className="icon-pulse"></div>
          </div>
          <div className="empty-text">
            <h3 className="empty-title">Ready to Analyze</h3>
            <p className="empty-message">
              Upload an image, capture a photo, or enter text to discover font matches with AI-powered precision.
            </p>
          </div>
          <div className="empty-features">
            <div className="feature-item">
              <Sparkles className="feature-icon" />
              <span>AI-Powered Detection</span>
            </div>
            <div className="feature-item">
              <TrendingUp className="feature-icon" />
              <span>95%+ Accuracy</span>
            </div>
            <div className="feature-item">
              <Zap className="feature-icon" />
              <span>Instant Results</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const fontMatches = formatPredictions();
  const topMatchConfidence = fontMatches.length > 0 ? parseFloat(fontMatches[0].confidence) : 0;

  return (
    <div 
      className={`results-container ${isDarkMode ? 'dark' : ''} ${animateIn ? 'animate-in' : ''}`}
      ref={resultsRef}
    >
      <div className="results-header">
        <div className="title-section">
          <Sparkles className="results-icon" />
          <div>
            <h3 className="results-title">Font Analysis Complete</h3>
            <p className="results-subtitle">AI-powered font identification results</p>
          </div>
        </div>
      </div>
      
      <div className="input-preview">
        <div className="preview-header">
          <h4 className="preview-title">Detected Input</h4>
          <div className="preview-badge">Analyzed</div>
        </div>
        <div className="preview-content-wrapper">
          <p className="preview-content">{detectedText}</p>
          <button 
            onClick={() => handleCopy(detectedText, 'input')}
            className={`copy-btn ${copiedIndex === 'input' ? 'copied' : ''}`}
          >
            <Copy size={16} />
          </button>
        </div>
      </div>
      
      {fontMatches.length > 0 ? (
        <div className="matches-section">
          {topMatchConfidence < 80 ? (
            <div className="low-confidence-warning">
              <div className="warning-content">
                <AlertCircle className="warning-icon" />
                <div>
                  <h4 className="warning-title">Exact Font Not Found in Dataset</h4>
                  <p className="warning-message">
                    The system couldn't find an exact match in our database. 
                    Try uploading a clearer image with better text boundaries, 
                    or check the closest matches below.
                  </p>
                </div>
              </div>
            </div>
          ) : null}
          
          <div className="section-header">
            <h4 className="section-title">
              {topMatchConfidence < 90 ? 'Closest Font Matches' : 'Font Matches'}
            </h4>
            <div className="match-count">{fontMatches.length} matches found</div>
          </div>
          
          <div className="matches-grid">
            {fontMatches.map((match, index) => (
              <div 
                key={index}
                className={`match-card ${match.isPrimary ? 'primary' : 'secondary'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="match-header">
                  <div className="match-rank">
                    {match.isPrimary && <Star className="star-icon" />}
                    <span className="rank-number">#{index + 1}</span>
                  </div>
                  <button 
                    onClick={() => handleCopy(match.name, index)}
                    className={`copy-btn ${copiedIndex === index ? 'copied' : ''}`}
                  >
                    <Copy size={14} />
                  </button>
                </div>
                
                <div className="match-content">
                  <h5 className="match-font">{match.name}</h5>
                  <div className="match-meta">
                    <span className="match-category">{match.category}</span>
                    <span className="match-popularity">{match.popularity}</span>
                  </div>
                </div>
                
                <div className="confidence-section">
                  <div className="confidence-bar">
                    <div 
                      className="confidence-fill"
                      style={{ width: `${match.confidence}%` }}
                    ></div>
                  </div>
                  <span className="confidence-text">{match.confidence}% match</span>
                </div>
                
                <div className="match-tags">
                  {match.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">{tag}</span>
                  ))}
                </div>
                
                <div className="match-overlay"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="no-results">
          <p>No font matches found. Try a different image or text.</p>
        </div>
      )}
    </div>
  );
};

export default Result;