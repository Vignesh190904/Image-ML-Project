import React from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';

const NotFound = ({ history }) => {
  // If using React Router v6+, replace history with useNavigate()
  const handleBackHome = () => {
    if (history && history.push) {
      history.push('/');
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: 200, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, padding: '2.2rem 1.5rem 3.5rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ color: '#ea5a47', fontWeight: 800, marginBottom: '0.8rem', fontSize: '2.2rem' }}>
            404 - Page Not Found
          </h1>
          <p style={{ color: '#355', fontSize: '1.10rem', marginBottom: '2.2rem' }}>
            The page you’re looking for doesn’t exist or has been moved.
          </p>
          <Button onClick={handleBackHome} variant="primary">
            Back to Home
          </Button>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default NotFound;
