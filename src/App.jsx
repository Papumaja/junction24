import './App.css'
import { BrowserRouter as Router, Route } from "react-router-dom";
import SwipePage from './pages/SwipePage';
import FormPage from './pages/FormPage';

function App() {

  return (
    <Router>
      <Layout>
        <Route exact path="/" render={() => <SwipePage />} />
        <Route exact path="/about" render={() => <FormPage />} />
      </Layout>
    </Router>
  )
}

export default App
