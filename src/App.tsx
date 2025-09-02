import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ExploreFunctionalities from './pages/ExploreFunctionalities';
import AddNewCase from './pages/AddNewCase';
import ReviewOldCase from './pages/ReviewOldCase';
import CaseDetails from './pages/CaseDetails';
import PdfReport from './pages/PdfReport';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/explore" element={<ExploreFunctionalities />} />
        <Route path="/add-case" element={<AddNewCase />} />
        <Route path="/review-old-case" element={<ReviewOldCase />} />
        <Route path="/case/:caseId" element={<CaseDetails />} />
        <Route path="/pdf-report" element={<PdfReport />} />
      </Routes>
    </Router>
  );
}

export default App;