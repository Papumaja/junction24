import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SwipePage from './pages/SwipePage';
import FormPage from './pages/EmployerFormPage';
import { CardsProvider } from './context/CardsContext';
import { EmployeeProvider } from './context/EmployeeContext';
import EmployerJobListingPage from './pages/EmployerJobListingPage';
import EmployerJobListingsPage from './pages/EmployerListingsPage';
import EmployeeFormPage from './pages/EmployeeFormPage';
import React from 'react';
import EmployeeJobListingPage from './pages/EmployeeJobListingPage';

const jobListings = [
  {
    id: 1,
    title: 'Software Engineer',
    description: 'Develop and maintain web applications.',
    tags: ['JavaScript', 'React', 'Node.js'],
  },
  {
    id: 2,
    title: 'Product Manager',
    description: 'Lead product development and strategy.',
    tags: ['Leadership', 'Agile', 'Communication'],
  },
  {
    id: 3,
    title: 'UX Designer',
    description: 'Design user interfaces and experiences.',
    tags: ['Design', 'Figma', 'User Research'],
  },
];
//
function App() {
  return (
    <EmployeeProvider>
      <CardsProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<SwipePage />} />
            <Route exact path="/employer" element={<FormPage />} />
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
