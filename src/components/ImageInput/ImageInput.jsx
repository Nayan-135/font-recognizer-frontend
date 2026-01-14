import React, { useRef, useState } from 'react';
import { ImageIcon, Upload, Check, AlertCircle, Sparkles, Send } from 'lucide-react';
import './ImageInput.css';

const ImageInput = ({ isDarkMode, onPrediction, onImageUpload }) => {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [error, setError] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState('upload');

  const API_URL = process.env.REACT_APP_API_URL;

  const validateFile = (file) => {
    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
      setError('Only JPG/JPEG/PNG files are allowed.');
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Max size is 10MB');
      return false;
    }
    return true;
  };

  const handleValidFile = (file) => {
    const previewUrl = URL.createObjectURL(file);
    setImagePreviewUrl(previewUrl);
    setUploadedFileName(file.name);
    setIsUploaded(true);
    onImageUpload(file);

    setTimeout(() => {
      setIsUploaded(false);
      sendToBackend(file);
    }, 500);
  };

  const sendToBackend = async (file) => {
    setIsProcessing(true);
    setStep('processing');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_URL}/api/predict`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      // normalize backend response
      const normalized = (data.predictions || []).map(p => [
        p.label,
        p.confidence
      ]);

      onPrediction(normalized);
      setStep('done');
    } catch (err) {
      console.error(err);
      setError('Failed to analyze image.');
      setStep('upload');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetUpload = () => {
    setStep('upload');
    setImagePreviewUrl(null);
    setUploadedFileName('');
    setError('');
    setIsProcessing(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={`image-input-container ${isDarkMode ? 'dark' : ''}`}>
      <div
        className={`dropzone ${isDragOver ? 'drag-over' : ''}`}
        onClick={() => fileInputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          const file = e.dataTransfer.files[0];
          if (file && validateFile(file)) handleValidFile(file);
        }}
      >
        <Upload />
        <p>{uploadedFileName || 'Drop or click to upload image'}</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file && validateFile(file)) handleValidFile(file);
        }}
        hidden
      />

      {step === 'done' && (
        <button onClick={resetUpload} className="submit-btn">
          Analyze Another Image
        </button>
      )}

      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default ImageInput;
