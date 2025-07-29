import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';

const NotFound = () => {
  const navigate = useNavigate();

  const handleVisitProject = () => {
    navigate('/home');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100vw' }}>
      <Header />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: 700, margin: '0 auto', padding: '2.2rem 1.5rem 3.5rem 1.5rem', boxSizing: 'border-box' }}>
        <h1 style={{ color: '#ea5a47', fontWeight: 800, marginBottom: '0.8rem', fontSize: '2.2rem', textAlign: 'center' }}>
          404 - Page Not Found
        </h1>
        <p style={{ color: '#355', fontSize: '1.10rem', marginBottom: '2.2rem', textAlign: 'center' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button onClick={handleVisitProject} variant="primary">
          Visit Project
        </Button>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
