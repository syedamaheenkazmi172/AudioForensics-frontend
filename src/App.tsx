import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ExploreFunctionalities from './pages/ExploreFunctionalities';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/explore" element={<ExploreFunctionalities />} />
      </Routes>
    </Router>
  );
}

export default App;