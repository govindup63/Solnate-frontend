import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import DonationPage from './components/DonationPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/donate/:publicKey" element={<DonationPage />} />
      </Routes>
    </Router>
  );
};

export default App;