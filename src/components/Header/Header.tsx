import logo from '../../images/logo.png';
import './Header.css'; // Make sure to import the CSS file
import { Link } from 'react-router-dom';
function Header() {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Logo" />
      
      <nav className="nav-links">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/how-it-works">How it Works</Link></li>
        </ul>
      </nav>

     <Link to="/setup-wizard">
  <button className="cta-button">Start Now</button>
</Link>
    </header>
  );
}

export default Header;