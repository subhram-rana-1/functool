import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./components/pages/LandingPage";
import GraphPageTemp from "./components/pages/GraphPageTemp";
import './assets/css/App.css'
import GraphPage from "./components/pages/GraphPage";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/graph" element={<GraphPage />} />
              <Route path="/graph-temp" element={<GraphPageTemp />} />
          </Routes>
      </Router>
  )
}

export default App;
