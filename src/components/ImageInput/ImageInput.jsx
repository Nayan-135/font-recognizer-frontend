import React, { useRef, useState } from 'react';
import { ImageIcon, Upload, Check, AlertCircle, Sparkles, Send} from 'lucide-react';
import './ImageInput.css';

const ImageInput = ({ isDarkMode, onPrediction }) => {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [error, setError] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [setIsProcessing] = useState(false);
  const [step, setStep] = useState('upload'); // 'upload', 'processing', 'done'

  const validateFile = (file) => {
    const isValidImage = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type);
    const hasValidExt = /\.(jpe?g|png)$/i.test(file.name);
    if (!isValidImage || !hasValidExt) {
      setError('Only JPG/JPEG/PNG files are allowed.');
      setTimeout(() => setError(''), 3000);
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Max size is 10MB');
      setTimeout(() => setError(''), 3000);
      return false;
    }
    return true;
  };

  const handleValidFile = (file) => {
    const imageUrl = URL.createObjectURL(file);
    setImagePreviewUrl(imageUrl);
    setUploadedFileName(file.name);
    setIsUploaded(true);
    setError('');
    
    setTimeout(() => {
      setIsUploaded(false);
      sendToBackend(file); // Automatically send to backend after upload
    }, 500);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) handleValidFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) handleValidFile(file);
  };

  const resetUpload = () => {
    setStep('upload');
    setImagePreviewUrl(null);
    setUploadedFileName('');
    setError('');
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const sendToBackend = async (file) => {
    setIsProcessing(true);
    setStep('processing');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://127.0.0.1:5000/api/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      onPrediction(data.predictions || []);
      setStep('done');
    } catch (error) {
      console.error("Prediction failed", error);
      setError('Failed to analyze image. Please try again.');
      setTimeout(() => setError(''), 3000);
      setStep('upload');
    } finally {
      setIsProcessing(false);
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 'upload':
        return 'Upload Image';
      case 'processing':
        return 'Analyzing...';
      case 'done':
        return 'Analysis Complete';
      default:
        return 'Upload Image';
    }
  };

  const getStepSubtitle = () => {
    switch (step) {
      case 'upload':
        return 'Drag & drop or click to browse • JPG/PNG';
      case 'processing':
        return 'Please wait while we identify the font...';
      case 'done':
        return 'Font identification complete!';
      default:
        return 'Drag & drop or click to browse • JPG/PNG';
    }
  };

  return (
    <div className={`image-input-container ${isDarkMode ? 'dark' : ''} ${error ? 'error' : ''}`}>
      <div className="input-header">
        <div className="icon-wrapper">
          {step === 'processing' ? (
            <div className="icon spinning">
              <Send />
            </div>
          ) : step === 'done' ? (
            <Check className="icon" />
          ) : (
            <ImageIcon className="icon" />
          )}
          <div className="icon-glow" />
          <Sparkles className="sparkle-1" />
          <Sparkles className="sparkle-2" />
        </div>
        <div className="title-section">
          <h3 className="input-title">{getStepTitle()}</h3>
          <span className="input-subtitle">{getStepSubtitle()}</span>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <AlertCircle className="error-icon" />
          <span>{error}</span>
        </div>
      )}

      {step === 'upload' && (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`dropzone ${isDragOver ? 'drag-over' : ''} ${isUploaded ? 'uploaded' : ''}`}
        >
          <div className="upload-content">
            <div className="upload-icon-wrapper">
              {isUploaded ? (
                <Check className="upload-icon success" />
              ) : error ? (
                <AlertCircle className="upload-icon error" />
              ) : (
                <Upload className="upload-icon" />
              )}
              <div className={`icon-ripple ${isUploaded ? 'success' : ''}`} />
            </div>

            <div className="upload-text">
              <p className="dropzone-title">
                {isUploaded ? 'Image uploaded!' : error ? 'Upload failed' : 'Drop your image here'}
              </p>
              <p className="dropzone-subtitle">
                {isUploaded
                  ? `${uploadedFileName}`
                  : 'JPG/JPEG/PNG • Max 10MB'}
              </p>
            </div>
          </div>
          <div className="upload-overlay" />
          <div className="magic-particles">
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,image/jpeg,image/png"
        onChange={handleFileSelect}
        className="file-input"
      />

      {imagePreviewUrl && step !== 'upload' && (
        <div className="image-preview-container">
          <div className="image-wrapper">
            <img
              src={imagePreviewUrl}
              alt="Preview"
              className="preview-image"
            />
            
            {step === 'processing' && (
              <div className="processing-overlay">
                <div className="spinner"></div>
                <span>Analyzing image...</span>
              </div>
            )}
          </div>

          <div className="action-buttons">
            {step === 'done' && (
              <button onClick={resetUpload} className="submit-btn secondary">
                <Upload size={16} />
                Analyze Another Image
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageInput;