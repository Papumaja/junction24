import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SwipePage from './pages/SwipePage';
import FormPage from './pages/EmployerFormPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SwipePage />} />
        <Route exact path="/employer" element={<FormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
