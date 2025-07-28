import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import ImageUpload from '../components/ImageUpload/ImageUpload';
import PredictionResult from '../components/PredictionResult/PredictionResult';
import MemberGallery from '../components/members/MemberGallery';
import Loader from '../components/ui/Loader';
import Footer from '../components/layout/Footer';
import { predictImage, checkBackendHealth } from '../api/api';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [prediction, setPrediction] = useState('');
  const [confidences, setConfidences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [backendStatus, setBackendStatus] = useState('checking');

  // Check backend health on component mount
  useEffect(() => {
    const checkHealth = async () => {
      const isHealthy = await checkBackendHealth();
      setBackendStatus(isHealthy ? 'online' : 'offline');
    };
    checkHealth();
  }, []);

  const handleImageSelect = (file) => {
    setSelectedFile(file);
    setError('');
    setPrediction('');
    setConfidences([]);
    if (file) {
      setImageUrl(URL.createObjectURL(file));
      handlePredict(file);
    } else {
      setImageUrl('');
    }
  };

  const handlePredict = async (file) => {
    setLoading(true);
    setError('');
    setPrediction('');
    setConfidences([]);
    
    try {
      const result = await predictImage(file);
      setPrediction(result.predicted_class || '');
      setConfidences(result.confidences || []);
    } catch (err) {
      setError(err.message || 'Something went wrong during prediction.');
    }
    
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100vw' }}>
      <Header />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', width: '100%', maxWidth: 700, margin: '0 auto', padding: '2.2rem 1.5rem 3.5rem 1.5rem', boxSizing: 'border-box' }}>
        <h1 style={{ color: '#203043', fontWeight: 700, marginBottom: '1.55rem', textAlign: 'center' }}>
          Celebrity Image Classifier
        </h1>
        
        {/* Backend Status Indicator */}
        {backendStatus === 'checking' && (
          <div style={{ marginBottom: '1rem', padding: '0.5rem 1rem', backgroundColor: '#fff3cd', color: '#856404', borderRadius: '4px', fontSize: '0.9rem' }}>
            🔍 Checking backend connection...
          </div>
        )}
        {backendStatus === 'offline' && (
          <div style={{ marginBottom: '1rem', padding: '0.5rem 1rem', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '4px', fontSize: '0.9rem' }}>
            ⚠️ Backend is currently offline. Predictions may not work.
          </div>
        )}
        {backendStatus === 'online' && (
          <div style={{ marginBottom: '1rem', padding: '0.5rem 1rem', backgroundColor: '#d4edda', color: '#155724', borderRadius: '4px', fontSize: '0.9rem' }}>
            ✅ Backend is online and ready
          </div>
        )}
        
        <ImageUpload onImageSelect={handleImageSelect} disabled={loading || backendStatus === 'offline'} />
        <PredictionResult
          prediction={prediction}
          confidences={confidences}
          imageUrl={imageUrl}
          loading={loading}
          error={error}
        />
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <MemberGallery />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
