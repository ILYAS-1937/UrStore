import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Section Marque / Description */}
        <div className="footer-brand">
          <h2>UrStore</h2>
          <p>
            Build your dream store with zero code. Your business deserves a beautiful home, 
            designed effortlessly from start to finish.
          </p>
        </div>

        {/* Section Liens Rapides */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/store">Store</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Section Réseaux Sociaux */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="#twitter">Twitter</a></li>
            <li><a href="#instagram">Instagram</a></li>
            <li><a href="#linkedin">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      {/* Barre de Copyright */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} UrStore. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;