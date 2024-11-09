import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeSwipePage from './pages/EmployeeSwipePage';
import { CardsProvider } from './context/CardsContext';
import EmployerFormPage from './pages/EmployerFormPage';
import { EmployeeProvider } from './context/EmployeeContext';
import EmployerJobListingPage from './pages/EmployerJobListingPage';
import EmployerJobListingsPage from './pages/EmployerJobListingsPage';
import EmployeeFormPage from './pages/EmployeeFormPage';
import React from 'react';
import EmployeeJobListingPage from './pages/EmployeeJobListingPage';
import ReviewFormPage from './pages/ReviewFormPage';

function App() {
  return (
    <EmployeeProvider>
      <CardsProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<EmployeeSwipePage />} />
            <Route exact path="/review" element={<ReviewFormPage />} />
            <Route exact path="/employer" element={<EmployerFormPage />} />
            <Route exact path="/EmployeeForm" element={<EmployeeFormPage />} />
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
    </EmployeeProvider>
  );
}

export default App;
