import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer-content']}>
        {/* Section Marque / Description */}
        <div className={styles['footer-brand']}>
          <h2>UrStore</h2>
          <p>
            Build your dream store with zero code. Your business deserves a beautiful home, 
            designed effortlessly from start to finish.
          </p>
        </div>

        {/* Section Liens Rapides */}
        <div className={styles['footer-links']}>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>

        {/* Section Réseaux Sociaux */}
        <div className={styles['footer-social']}>
          <h3>Follow Us</h3>
          <ul>
            <li><a href="https://www.x.com/medurtc">Twitter</a></li>
            <li><a href="https://www.instagram.com/m3d.5">Instagram</a></li>
            <li><a href="https://www.linkedin.com/in/medmoataz">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      {/* Barre de Copyright */}
      <div className={styles['footer-bottom']}>
        <p>&copy; {new Date().getFullYear()} UrStore. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;