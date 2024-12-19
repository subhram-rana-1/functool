import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./components/pages/LandingPage";
import GraphPage from "./components/pages/GraphPage";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/graph" element={<GraphPage />} />
          </Routes>
      </Router>
  )
}

export default App;
