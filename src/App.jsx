import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Awards from './pages/Awards';
import CryptoInvestment from './pages/CryptoInvestment';
import EscrowDemo from './pages/escrow';
export default function App() {
  return (
    <div className="bg-ink min-h-screen">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/crypto-investment" element={<CryptoInvestment />} />
        <Route path="/escrow" element={<EscrowDemo />} />
      </Routes>
      <Footer />
    </div>
  );
}