// src/App.jsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Prediction from './pages/Prediction';
import NavigationBar from './components/NavigationBar';

const App = () => {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/predict" element={<Prediction />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
