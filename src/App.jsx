import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SwipePage from './pages/SwipePage';
import { CardsProvider } from './context/CardsContext';
import EmployerFormPage from './pages/EmployerFormPage';
import EmployerJobListingPage from './pages/EmployerJobListingPage';
import EmployerJobListingsPage from './pages/EmployerJobListingsPage';
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
