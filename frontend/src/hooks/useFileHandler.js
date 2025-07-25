import { useRef, useState } from 'react';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
const MAX_SIZE_MB = 5;

export default function useFileHandler(onFileChange) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');

  const validateFile = (file) => {
    if (!file) {
      setError('No file selected.');
      return false;
    }
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

  const handleInputChange = (e) => {
    const fileObj = e.target.files[0];
    if (!validateFile(fileObj)) return;
    setFile(fileObj);
    setPreviewUrl(URL.createObjectURL(fileObj));
    onFileChange && onFileChange(fileObj);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const fileObj = e.dataTransfer.files[0];
    if (!validateFile(fileObj)) return;
    setFile(fileObj);
    setPreviewUrl(URL.createObjectURL(fileObj));
    onFileChange && onFileChange(fileObj);
  };

  const removeFile = () => {
    setFile(null);
    setPreviewUrl('');
    setError('');
    if (inputRef.current) inputRef.current.value = '';
    onFileChange && onFileChange(null);
  };

  return {
    file,
    previewUrl,
    error,
    inputRef,
    handleInputChange,
    handleDrop,
    removeFile,
  };
}
