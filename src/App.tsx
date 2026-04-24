import { Routes ,Route} from 'react-router-dom'
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import StepsTuto from './components/StepsTuto/StepsTuto'
import HeaderStep from './components/HeaderStep/HeaderStep'
import HeroStep from './components/HeroStep/HeroStep'
import StoreStep from './components/StoreStep/StoreStep'
function App() {
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
   </Routes>
  )
}

export default App
