import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const About = () => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100vw' }}>
    <Header />
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', width: '100%', maxWidth: 700, margin: '0 auto', padding: '2.2rem 1.5rem 3.5rem 1.5rem', boxSizing: 'border-box' }}>
      <h1 style={{ color: '#1e4278', fontWeight: 700, marginBottom: '1.2rem', textAlign: 'center' }}>About the Project</h1>
      <section style={{ fontSize: '1.08rem', color: '#223049', lineHeight: 1.69 }}>
        <p>
          <strong>Celebrity Image Classifier</strong> is a machine learning powered app that recognizes and identifies popular personalities in photos. 
          Simply upload a photo, and the system will classify which celebrity appears in the image—along with the confidence for each class.
        </p>
        <h2 style={{ margin: '1.3rem 0 0.6rem', fontSize: '1.10rem', color: '#3877e9' }}>How it works</h2>
        <ul>
          <li>A user uploads a photo using the intuitive UI.</li>
          <li>The image is sent to a secure backend built with Flask and Python.</li>
          <li>A trained machine learning model processes the image and returns the predicted class and confidence breakdown to the browser.</li>
          <li>Results and confidence levels are presented visually in the app for transparency.</li>
        </ul>
        <h2 style={{ margin: '1.3rem 0 0.6rem', fontSize: '1.10rem', color: '#3877e9' }}>Technologies Used</h2>
        <ul>
          <li><strong>Frontend:</strong> ReactJS, CSS Modules, modular components</li>
          <li><strong>Backend:</strong> Flask (Python), ML model (pickle/onnx, scikit-learn/TensorFlow)</li>
          <li><strong>Deployment:</strong> Node, WSGI server, cloud or Heroku/Netlify</li>
        </ul>
        <h2 style={{ margin: '1.3rem 0 0.6rem', fontSize: '1.10rem', color: '#3877e9' }}>Who built this?</h2>
        <p>
          This project is designed for hands-on learning and showcases practical full-stack ML deployment. 
          Feel free to browse the member gallery, try your images, and view results instantly!
        </p>
      </section>
    </main>
    <Footer />
  </div>
);

export default About;
