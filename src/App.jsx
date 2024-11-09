import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SwipePage from './pages/SwipePage';
import FormPage from './pages/EmployerFormPage';
import { CardsProvider } from './context/CardsContext';
import JobListingPage from './pages/JobListingPage';
import JobListingsPage from './pages/JobListingsPage';
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
    <CardsProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<SwipePage />} />
          <Route exact path="/employer" element={<FormPage />} />
          <Route
            exact
            path="/employee/listings/:id"
            element={<EmployeeJobListingPage />}
          />
          <Route
            exact
            path="/employer/listings"
            element={<JobListingsPage />}
          />
          <Route
            exact
            path="/employer/listings/:id"
            element={<JobListingPage />}
          />
        </Routes>
      </Router>
    </CardsProvider>
  );
}

export default App;
