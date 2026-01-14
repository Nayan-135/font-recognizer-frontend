import React, { useState } from 'react';
import Header from './components/Header/Header';
import About from './components/About/About';
import ImageInput from './components/ImageInput/ImageInput';
import Results from './components/Results/Results';
import Footer from './components/Footer/Footer';

import './styles/globals.css';
import './styles/themes.css';
import './App.css';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [predictions, setPredictions] = useState([]);
  const [hasInput, setHasInput] = useState(false);
  const [uploadedImageURL, setUploadedImageURL] = useState(null);

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle predictions from ImageInput
  const handlePrediction = (newPredictions) => {
    setPredictions(newPredictions);
    setHasInput(newPredictions && newPredictions.length > 0);
  };

  // Handle image upload for preview
  const handleImageUpload = (file) => {
    const imageUrl = URL.createObjectURL(file);
    setUploadedImageURL(imageUrl);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`} data-theme={isDarkMode ? 'dark' : 'light'}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="main-content">
        <About isDarkMode={isDarkMode} />

        <section className="input-section">
          <div className="container">
            <h2 className="section-title">Choose Your Input Method</h2>

            <div className="input-grid">
              <ImageInput
                isDarkMode={isDarkMode}
                onPrediction={handlePrediction}
                onImageUpload={handleImageUpload}
              />
            </div>

            <Results
              isDarkMode={isDarkMode}
              predictions={predictions}
              hasInput={hasInput}
              uploadedImage={uploadedImageURL}
            />
          </div>
        </section>
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default App;