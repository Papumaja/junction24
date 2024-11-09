import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SwipePage from './pages/SwipePage';
import { CardsProvider } from './context/CardsContext';
import EmployerFormPage from './pages/EmployerFormPage';
import { EmployeeProvider } from './context/EmployeeContext';
import EmployerJobListingPage from './pages/EmployerJobListingPage';
import EmployerJobListingsPage from './pages/EmployerJobListingsPage';
import EmployeeFormPage from './pages/EmployeeFormPage';
import React from 'react';
import EmployeeJobListingPage from './pages/EmployeeJobListingPage';
import ReviewFormPage from './pages/ReviewFormPage';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  return (
    <EmployeeProvider>
      <CardsProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route exact path="/" element={<SwipePage />} />
              <Route exact path="/review" element={<ReviewFormPage />} />
              <Route exact path="/employer" element={<EmployerFormPage />} />
              <Route
                exact
                path="/EmployeeForm"
                element={<EmployeeFormPage />}
              />
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
        </ThemeProvider>
      </CardsProvider>
    </EmployeeProvider>
  );
}

export default App;
