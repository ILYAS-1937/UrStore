import styles from "./Hero.module.css"; // Changed to import CSS Module
import heroImg from "../../images/heroImg.png";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroParagraphe}>
        <h1>Build Your Dream Store. No Code, No Limits.</h1>
        <h2>Your one-stop shop for all your needs!</h2>
        <p>
          Forget about wrestling with HTML tags. Our platform empowers you to 
          design a stunning store using a completely visual editor. 
          Your business deserves a beautiful home.
        </p>
        <Link to="/setup-wizard">
          <button className={styles['cta-button']}>Start Building Free</button>
        </Link>
      </div>
      
      <div className={styles.heroImage}>
        <img src={heroImg} alt="Platform Preview" />
      </div>
    </section>
  );
}

export default Hero;