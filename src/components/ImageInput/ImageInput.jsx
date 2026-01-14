import React, { useRef, useState } from "react";
import {
  ImageIcon,
  Upload,
  Check,
  AlertCircle,
  Sparkles,
  Send
} from "lucide-react";
import "./ImageInput.css";

const ImageInput = ({ isDarkMode, onPrediction, onImageUpload }) => {
  const fileInputRef = useRef(null);

  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [error, setError] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState("upload"); // upload | processing | done

  const API_URL = process.env.REACT_APP_API_URL;

  const validateFile = (file) => {
    if (!file) return false;

    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setError("Only JPG/JPEG/PNG files are allowed.");
      return false;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Max file size is 10MB.");
      return false;
    }

    setError("");
    return true;
  };

  const handleValidFile = (file) => {
    const previewUrl = URL.createObjectURL(file);
    setImagePreviewUrl(previewUrl);
    setUploadedFileName(file.name);
    setIsUploaded(true);
    onImageUpload?.(file);

    setTimeout(() => {
      setIsUploaded(false);
      sendToBackend(file);
    }, 500);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (validateFile(file)) handleValidFile(file);
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
    if (validateFile(file)) handleValidFile(file);
  };

  const sendToBackend = async (file) => {
    setIsProcessing(true);
    setStep("processing");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_URL}/api/predict`, {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      const normalized = (data.predictions || []).map((p) => [
        p.label,
        p.confidence
      ]);

      onPrediction(normalized);
      setStep("done");
    } catch (err) {
      console.error(err);
      setError("Failed to analyze image.");
      setStep("upload");
    } finally {
      setIsProcessing(false);
    }
  };

  const resetUpload = () => {
    setStep("upload");
    setImagePreviewUrl(null);
    setUploadedFileName("");
    setError("");
    setIsProcessing(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getStepTitle = () => {
    if (step === "processing") return "Analyzing...";
    if (step === "done") return "Analysis Complete";
    return "Upload Image";
  };

  const getStepSubtitle = () => {
    if (step === "processing") return "Identifying font using AI...";
    if (step === "done") return "Font detection finished!";
    return "Drag & drop or click • JPG/PNG";
  };

  return (
    <div className={`image-input-container ${isDarkMode ? "dark" : ""}`}>
      <div className="input-header">
        <div className="icon-wrapper">
          {step === "processing" ? (
            <Send className="icon spinning" />
          ) : step === "done" ? (
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

      {step === "upload" && (
        <div
          className={`dropzone ${isDragOver ? "drag-over" : ""}`}
          onClick={() => fileInputRef.current.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload />
          <p>{uploadedFileName || "Drop or click to upload image"}</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,image/jpeg,image/png"
        onChange={handleFileSelect}
        hidden
      />

      {imagePreviewUrl && step !== "upload" && (
        <div className="image-preview-container">
          <img src={imagePreviewUrl} alt="Preview" className="preview-image" />

          {step === "processing" && (
            <div className="processing-overlay">
              <div className="spinner" />
              <span>Analyzing image...</span>
            </div>
          )}

          {step === "done" && (
            <button onClick={resetUpload} className="submit-btn">
              <Upload size={16} />
              Analyze Another Image
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageInput;
