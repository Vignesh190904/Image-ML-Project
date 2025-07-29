import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Landing from './pages/Landing';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;