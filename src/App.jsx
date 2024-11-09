import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SwipePage from './pages/SwipePage';
import { CardsProvider } from './context/CardsContext';
import EmployerFormPage from './pages/EmployerFormPage';
import EmployerJobListingPage from './pages/EmployerJobListingPage';
import EmployerJobListingsPage from './pages/EmployerJobListingsPage';
import React from 'react';
import EmployeeJobListingPage from './pages/EmployeeJobListingPage';
import ReviewFormPage from './pages/ReviewFormPage';

function App() {
  return (
    <CardsProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<SwipePage />} />
          <Route exact path="/review" element={<ReviewFormPage />} />
          <Route exact path="/employer" element={<EmployerFormPage />} />
          <Route
            exact
            path="/employee/listings/:id"
            element={<EmployeeJobListingPage />}
          />
          <Route
            exact
            path="/employer/listings"
            element={<EmployerJobListingsPage />}
          />
          <Route
            exact
            path="/employer/listings/:id"
            element={<EmployerJobListingPage />}
          />
        </Routes>
      </Router>
    </CardsProvider>
  );
}

export default App;
