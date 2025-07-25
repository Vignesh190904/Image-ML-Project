import React, { useState } from 'react';
import Header from '../components/layout/Header';
import ImageUpload from '../components/ImageUpload/ImageUpload';
import PredictionResult from '../components/PredictionResult/PredictionResult';
import MemberGallery from '../components/members/MemberGallery';
import Loader from '../components/ui/Loader';
import Footer from '../components/layout/Footer';

const API_URL = process.env.REACT_APP_API_URL + '/predict';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [prediction, setPrediction] = useState('');
  const [confidences, setConfidences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData
      });
      let data;
      try {
        data = await response.json();
      } catch (jsonErr) {
        throw new Error('Invalid response from server.');
      }
      if (!response.ok) {
        throw new Error(data.error || 'Prediction failed. Please try again.');
      }
      setPrediction(data.predicted_class || '');
      setConfidences(data.confidences || []);
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
        <ImageUpload onImageSelect={handleImageSelect} disabled={loading} />
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
