import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import CardPage from './CardPage';

function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/card/:id" element={<CardPage />} />
      </Routes>
    </Router>
  );
}

export default Root;
