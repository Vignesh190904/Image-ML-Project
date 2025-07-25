import React from 'react';
import './ConfidenceBar.css';

const getBarColor = (idx) => {
  // Distinguish between classes with different colors
  const colors = [
    '#3877e9', // Blue
    '#36b37e', // Green
    '#ea5a47', // Red
    '#ffb347', // Orange
    '#a259e9', // Purple
    '#49cafb', // Cyan
    '#ffd166', // Light yellow
    '#e07a5f', // Brown
  ];
  return colors[idx % colors.length];
};

/**
 * @param {Object[]} confidences - Array of {label: string, value: number} (from 0 to 1)
 * @param {boolean} showPercent - Display percentage text or float (default: true)
 */
const ConfidenceBar = ({ confidences = [], showPercent = true }) => {
  if (!confidences.length) return null;

  // Sort descending order of confidence
  const sorted = [...confidences].sort((a, b) => b.value - a.value);

  return (
    <div className="confidence-bar-list">
      {sorted.map((conf, idx) => (
        <div className="confidence-bar-row" key={conf.label}>
          <div className="confidence-bar-label">{conf.label}</div>
          <div className="confidence-bar-track">
            <div
              className="confidence-bar-fill"
              style={{
                width: `${(conf.value * 100).toFixed(1)}%`,
                background: getBarColor(idx),
              }}
            />
            <span className="confidence-bar-value">
              {showPercent
                ? `${(conf.value * 100).toFixed(2)}%`
                : conf.value.toFixed(4)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConfidenceBar;
