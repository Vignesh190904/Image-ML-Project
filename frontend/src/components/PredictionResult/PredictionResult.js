import React from 'react';
import ConfidenceBar from './ConfidenceBar';
import './PredictionResult.css';

const PredictionResult = ({ prediction, confidences, imageUrl, loading, error }) => {
  if (loading) {
    return (
      <div className="prediction-result">
        <div className="prediction-loading">Analyzing image...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="prediction-result">
        <div className="prediction-error">{error}</div>
      </div>
    );
  }
  if (!prediction && (!confidences || confidences.length === 0)) {
    return (
      <div className="prediction-result">
        <div className="prediction-placeholder">
          <span>Results will appear here after you upload an image.</span>
        </div>
      </div>
    );
  }
  return (
    <div className="prediction-result">
      {imageUrl && (
        <div className="prediction-img-preview">
          <img src={imageUrl} alt="Input Preview" />
        </div>
      )}
      <h2 className="prediction-title">Prediction</h2>
      <div className="prediction-class">
        <span className="top-label">Predicted:</span>
        <span className="predicted-class">{prediction || "—"}</span>
      </div>
      <ConfidenceBar confidences={confidences} showPercent={true} />
    </div>
  );
};

export default PredictionResult;
