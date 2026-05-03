import { Routes ,Route} from 'react-router-dom'
import { useEffect } from 'react';
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import StepsTuto from './components/StepsTuto/StepsTuto'
import HeaderStep from './components/HeaderStep/HeaderStep'
import HeroStep from './components/HeroStep/HeroStep'
import StoreStep from './components/StoreStep/StoreStep'
import FooterStep from './components/FooterStep/FooterStep'
import ContactStep from './components/ContactStep/ConatctStep'
import FinalPreview from './components/finalPreview/FinalPreview'
import SetupWizard from './components/SetupWizard/SetupWizard'

function App() {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Cancel the default event
      e.preventDefault();
      // Chrome and Edge require you to set the returnValue
      e.returnValue = ''; 
    };

    // Listen for the user trying to refresh or close the tab
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup the listener if the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  // ----------------------------------
  return (
   <Routes>
    <Route path='/' element={<>
    <Header />
    <Hero />
    <StepsTuto />
    <Footer />
    </>
  } />
  <Route path="about" element={<><Header/> <Hero /></>} />
  <Route path="how-it-works" element={<><Header/> <StepsTuto /></>} />
  <Route path="header-step" element={<><HeaderStep /></>} />
  <Route path="hero-step" element={<><HeroStep /></>} />
  <Route path="store-step" element={<StoreStep/>}/>
  <Route path="contact-step" element={<ContactStep/>}/>
  <Route path="footer-step" element={<FooterStep/>}/>
  <Route path="final-preview" element={<FinalPreview/>}/>
  <Route path="setup-wizard" element={<SetupWizard/>}/>
   </Routes>
  )
}

export default App
