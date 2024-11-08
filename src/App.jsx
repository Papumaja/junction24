// src/App.js

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SwipePage from './pages/SwipePage';
import FormPage from './pages/EmployerFormPage';
import { CardsProvider } from './context/CardsContext';

function App() {
  return (
    <CardsProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<SwipePage />} />
          <Route exact path="/employer" element={<FormPage />} />
        </Routes>
      </Router>
    </CardsProvider>
  );
}

export default App;
