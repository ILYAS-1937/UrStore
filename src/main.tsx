import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
// On détecte si le type de navigation est un rechargement (refresh)
const navEntries = performance.getEntriesByType("navigation");
if (navEntries.length > 0 && (navEntries[0] as PerformanceNavigationTiming).type === "reload") {
  // Si on n'est pas déjà sur la page d'accueil, on force la redirection
  if (window.location.pathname !== '/') {
    window.location.replace('/');
  }
}
// --------------------------
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

