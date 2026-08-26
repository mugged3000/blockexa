import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';   // ← add
import PageLoader from './components/PageLoader';     // ← add
import Home from './pages/Home';
import About from './pages/About';
import Awards from './pages/Awards';
import CryptoInvestment from './pages/CryptoInvestment';
import EscrowDemo from './pages/escrow';
import PrivacyPolicy from './pages/PrivacyPolicy';
import PaymentPolicy from './pages/PaymentPolicy';
import WithdrawalPolicy from './pages/WithdrawalPolicy';
import AmlKyc from './pages/AmlKyc';
import TermsAndConditions from './pages/TermsAndConditions';
import ContactUs from './pages/Contact'

export default function App() {
  return (
    <div className="bg-ink min-h-screen">
      <PageLoader />      {/* ← add */}
      <ScrollToTop />     {/* ← add */}
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/crypto-investment" element={<CryptoInvestment />} />
        <Route path="/escrow" element={<EscrowDemo />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/payment-policy" element={<PaymentPolicy />} />
        <Route path="/withdrawal-policy" element={<WithdrawalPolicy />} />
        <Route path="/aml-kyc" element={<AmlKyc />} />
         <Route path="/terms" element={<TermsAndConditions />} />
         <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <Footer />
    </div>
  );
}