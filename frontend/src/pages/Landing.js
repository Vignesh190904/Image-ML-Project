import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';

const Landing = () => {
  const navigate = useNavigate();

  const handleVisitProject = () => {
    navigate('/home');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100vw' }}>
      <Header />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: 700, margin: '0 auto', padding: '2.2rem 1.5rem 3.5rem 1.5rem', boxSizing: 'border-box' }}>
        <h1 style={{ color: '#1e4278', fontWeight: 800, marginBottom: '1.5rem', fontSize: '2.5rem', textAlign: 'center' }}>
          Welcome to Vignesh's ML Project
        </h1>
        <p style={{ color: '#355', fontSize: '1.20rem', marginBottom: '2.5rem', textAlign: 'center', lineHeight: 1.6 }}>
          A Celebrity Image Classifier powered by Machine Learning. 
          Upload images and discover which celebrity appears in your photos!
        </p>
        <Button onClick={handleVisitProject} variant="primary" style={{ fontSize: '1.1rem', padding: '12px 24px' }}>
          Visit Project
        </Button>
      </main>
      <Footer />
    </div>
  );
};

export default Landing; 