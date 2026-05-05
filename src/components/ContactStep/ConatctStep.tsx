import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './ContactStep.module.css'; // Changed to import styles object
import useStore from '../../useStore';

// Import your images here
import whatsappImg from "../../images/whatsapp.png";
import instagramImg from "../../images/instagram.png";
import gmailImg from "../../images/gmail.png";

function ContactStep() {
  const setField = useStore((state) => state.setField);
  const data = useStore((state) => state.data) || {};

  const [whatsapp, setWhatsapp] = useState(data.whatsapp || '');
  const [instagram, setInstagram] = useState(data.instagram || '');
  const [email, setEmail] = useState(data.email || '');
  const [contactBgColor, setContactBgColor] = useState(data.contactBgColor || '#f8fafc');

  // Sync with global store
  useEffect(() => { setField("whatsapp", whatsapp); }, [whatsapp, setField]);
  useEffect(() => { setField("instagram", instagram); }, [instagram, setField]);
  useEffect(() => { setField("email", email); }, [email, setField]);
  useEffect(() => { setField("contactBgColor", contactBgColor); }, [contactBgColor, setField]); // Sync de la couleur

  return (
    <div className={styles['contact-step-wrapper']}>
      <h1 className={styles.heroTitle}><span>Step4:</span> Set Up Contact Methods</h1>
      
      <div className={styles['contact-container']}>
        {/* Live Preview Section - Le background change en direct */}
        <div className={styles['contact-preview']} style={{ backgroundColor: contactBgColor }}> 
          <div className={styles['preview-content']}>
            <h2 className={styles['order-prompt']}>Order your products now!</h2>
            <p>Choose a platform to contact us:</p>
            
            <div className={styles['preview-buttons']}>
              {whatsapp && (
                <button className={`${styles['contact-btn']} ${styles['whatsapp-btn']}`}>
                  <img src={whatsappImg} alt="WhatsApp" />
                  Contact via WhatsApp
                </button>
              )}
              {instagram && (
                <button className={`${styles['contact-btn']} ${styles['instagram-btn']}`}>
                  <img src={instagramImg} alt="Instagram" />
                  Follow on Instagram
                </button>
              )}
              {email && (
                <button className={`${styles['contact-btn']} ${styles['email-btn']}`}>
                  <img src={gmailImg} alt="Gmail" />
                  Send an Email
                </button>
              )}
              {!whatsapp && !instagram && !email && (
                <p className={styles['empty-preview-text']}>Add info below to see buttons...</p>
              )}
            </div>
          </div>
        </div>

        {/* Form Section */}
        <form className={styles['contact-form']} onSubmit={(e) => e.preventDefault()}>
          
          {/* Nouveau champ pour la couleur de fond */}
          <div className={styles['form-group']}>
            <label htmlFor="contactBgColor">Background Color</label>
            <input 
              type="color" 
              id="contactBgColor" 
              value={contactBgColor}
              onChange={(e) => setContactBgColor(e.target.value)}
              style={{ height: '45px', padding: '2px', cursor: 'pointer', width: '100%' }}
            />
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="whatsapp">WhatsApp Number</label>
            <input 
              type="text" 
              id="whatsapp" 
              placeholder="e.g., +212 600 000 000"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="instagram">Instagram Username</label>
            <div className={styles['input-prefix-wrapper']}>
              <span className={styles['input-prefix']}>@</span>
              <input 
                type="text" 
                id="instagram" 
                placeholder="yourstore.handle"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="email">Store Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="contact@yourstore.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles['navigation-actions']}>
            <Link to="/footer-step">
              <button className={styles['save-contact-btn']} type="submit">Complete Store Setup</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactStep;