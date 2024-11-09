import './App.css';
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from 'react-router-dom';
import EmployeeSwipePage from './pages/EmployeeSwipePage';
import { CardsProvider } from './context/CardsContext';
import EmployerFormPage from './pages/EmployerFormPage';
import { EmployeeProvider } from './context/EmployeeContext';
import EmployerJobListingPage from './pages/EmployerJobListingPage';
import EmployerJobListingsPage from './pages/EmployerJobListingsPage';
import EmployeeFormPage from './pages/EmployeeFormPage';
import React from 'react';
import EmployeeJobListingPage from './pages/EmployeeJobListingPage';
import EmployeeReviewFormPage from './pages/EmployeeReviewFormPage';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { urls } from './urls';

function App() {
  return (
    <EmployeeProvider>
      <CardsProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route
              exact
              path={urls.base}
              element={<Navigate to={urls.employee.swipe} />}
            />
                <Route
              exact
              path={urls.employee.root}
              element={<Navigate to={urls.employee.swipe} />}
            />
              <Route
              exact
              path={urls.employee.swipe}
              element={<EmployeeSwipePage />}
            />
              <Route
               
              exact
               
              path={urls.employee.info}
             
                element={<EmployeeFormPage />}
             
            />
              <Route
                exact
                path={urls.employee.listings + '/:id'}
                element={<EmployeeJobListingPage />}
              />
              <Route
                exact
                path={urls.employee.review}
              element={<EmployeeReviewFormPage />}
            />
            <Route
              exact
              path={urls.employer.root}
              element={<Navigate to={urls.employer.info} />}
            />
            <Route
              exact
              path={urls.employer.info}
              element={<EmployerFormPage />}
            />
            <Route
              exact
              path={urls.employer.listings}
                element={<EmployerJobListingsPage />}
              />
              <Route
                exact
                path={urls.employer.listings + '/:id'}
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
