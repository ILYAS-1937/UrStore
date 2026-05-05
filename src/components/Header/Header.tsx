import logo from '../../images/logo.png';
import styles from './Header.module.css'; // Updated to import CSS Module
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={logo} alt="Logo" />
      
      <nav className={styles['nav-links']}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/how-it-works">How it Works</Link></li>
        </ul>
      </nav>

      <Link to="/setup-wizard">
        <button className={styles['cta-button']}>Start Now</button>
      </Link>
    </header>
  );
}

export default Header;