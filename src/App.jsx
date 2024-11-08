import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SwipePage from './pages/SwipePage';
import FormPage from './pages/FormPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SwipePage />} />
        <Route exact path="/EmployeeForm" element={<FormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
