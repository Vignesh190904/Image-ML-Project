import React, { useRef, useState } from 'react';
import Button from '../ui/Button';
import './ImageUpload.css';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
const MAX_SIZE_MB = 5;

const ImageUpload = ({ onImageSelect, disabled = false }) => {
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');

  const validateFile = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Invalid file type. Only JPG, PNG, JPEG, or GIF allowed.');
      return false;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File too large. Maximum size is ${MAX_SIZE_MB}MB.`);
      return false;
    }
    setError('');
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!validateFile(file)) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    onImageSelect && onImageSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (disabled) return;
    const file = e.dataTransfer.files[0];
    if (!file) return;
    if (!validateFile(file)) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    onImageSelect && onImageSelect(file);
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setError('');
    onImageSelect && onImageSelect(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div
      className={`image-upload-container ${disabled ? 'disabled' : ''}`}
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
    >
      <label htmlFor="image-upload-input" className="upload-label">
        {previewUrl ? (
          <div className="preview-wrapper">
            <img
              src={previewUrl}
              alt="Preview"
              className="image-preview"
            />
            <Button
              className="remove-btn"
              onClick={handleRemove}
              variant="secondary"
              type="button"
            >
              Remove
            </Button>
          </div>
        ) : (
          <>
            <span className="upload-instructions">
              Drag & drop or{' '}
              <span
                className="choose-file-link"
                onClick={() => !disabled && inputRef.current && inputRef.current.click()}
                style={{ textDecoration: 'underline', cursor: disabled ? 'not-allowed' : 'pointer' }}
                tabIndex={0}
                role="button"
                aria-label="Choose File"
              >
                choose a file
              </span>
            </span>
            <span className="file-tip">Accepted: JPEG, PNG, JPG, GIF &mdash; Max {MAX_SIZE_MB}MB</span>
            {error && <span className="error-message">{error}</span>}
          </>
        )}
        <input
          ref={inputRef}
          id="image-upload-input"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          disabled={disabled}
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default ImageUpload;
