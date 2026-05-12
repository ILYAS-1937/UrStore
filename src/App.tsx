import { Routes, Route, useLocation } from 'react-router-dom'; // 1. Import useLocation
import { useEffect } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import StepsTuto from './components/StepsTuto/StepsTuto';
import HeaderStep from './components/HeaderStep/HeaderStep';
import HeroStep from './components/HeroStep/HeroStep';
import StoreStep from './components/StoreStep/StoreStep';
import FooterStep from './components/FooterStep/FooterStep';
import ContactStep from './components/ContactStep/ConatctStep';
import FinalPreview from './components/FinalPreview/FinalPreview';
import SetupWizard from './components/SetupWizard/SetupWizard';
import FAQ from './components/FAQ/FAQ';

function App() {
  const location = useLocation(); // 2. Get the current route location

  useEffect(() => {
    // 3. If the user is on the home page (or other static pages), don't add the alert
    if (location.pathname === '/' || location.pathname === '/about' || location.pathname === '/how-it-works') {
      return;
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Cancel the default event
      e.preventDefault();
      // Chrome and Edge require you to set the returnValue
      e.returnValue = ''; 
    };

    // Listen for the user trying to refresh or close the tab
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup the listener if the component unmounts or location changes
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location.pathname]); // 4. Re-run this effect whenever the route changes

  // ----------------------------------
  return (
   <Routes>
    <Route path='/' element={<>
      <Header />
      <Hero />
      <StepsTuto />
      <Footer />
    </>} />
    <Route path="about" element={<><Header/> <Hero /></>} />
    <Route path="how-it-works" element={<><Header/> <StepsTuto /></>} />
    <Route path="header-step" element={<><HeaderStep /></>} />
    <Route path="hero-step" element={<><HeroStep /></>} />
    <Route path="store-step" element={<StoreStep/>}/>
    <Route path="contact-step" element={<ContactStep/>}/>
    <Route path="footer-step" element={<FooterStep/>}/>
    <Route path="final-preview" element={<FinalPreview/>}/>
    <Route path="setup-wizard" element={<SetupWizard/>}/>
    <Route path="faq" element={<FAQ/>}/>
   </Routes>
  );
}

export default App;