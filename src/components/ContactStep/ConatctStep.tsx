import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ContactStep.css';
import useStore from '../../useStore';

// Import your images here
import whatsappImg from "../../images/whatsapp.png";
import instagramImg from "../../images/instagram.png";
import gmailImg from "../../images/gmail.png";

function ContactStep() {
  const setField = useStore((state) => state.setField);

  // State for contact details & background color
  const [whatsapp, setWhatsapp] = useState('');
  const [instagram, setInstagram] = useState('');
  const [email, setEmail] = useState('');
  const [contactBgColor, setContactBgColor] = useState('#f8fafc'); // Ajout du background par défaut

  // Sync with global store
  useEffect(() => { setField("whatsapp", whatsapp); }, [whatsapp, setField]);
  useEffect(() => { setField("instagram", instagram); }, [instagram, setField]);
  useEffect(() => { setField("email", email); }, [email, setField]);
  useEffect(() => { setField("contactBgColor", contactBgColor); }, [contactBgColor, setField]); // Sync de la couleur

  return (
    <div className="contact-step-wrapper">
      <h1 className="heroTitle"><span>Step4:</span> Set Up Contact Methods</h1>
      
      <div className="contact-container">
        {/* Live Preview Section - Le background change en direct */}
        <div className="contact-preview" style={{ backgroundColor: contactBgColor }}> 
          <div className="preview-content">
            <h2 className="order-prompt">Order your products now!</h2>
            <p>Choose a platform to contact us:</p>
            
            <div className="preview-buttons">
              {whatsapp && (
                <button className="contact-btn whatsapp-btn">
                  <img src={whatsappImg} alt="WhatsApp" />
                  Contact via WhatsApp
                </button>
              )}
              {instagram && (
                <button className="contact-btn instagram-btn">
                  <img src={instagramImg} alt="Instagram" />
                  Follow on Instagram
                </button>
              )}
              {email && (
                <button className="contact-btn email-btn">
                  <img src={gmailImg} alt="Gmail" />
                  Send an Email
                </button>
              )}
              {!whatsapp && !instagram && !email && (
                <p className="empty-preview-text">Add info below to see buttons...</p>
              )}
            </div>
          </div>
        </div>

        {/* Form Section */}
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          
          {/* Nouveau champ pour la couleur de fond */}
          <div className="form-group">
            <label htmlFor="contactBgColor">Background Color</label>
            <input 
              type="color" 
              id="contactBgColor" 
              value={contactBgColor}
              onChange={(e) => setContactBgColor(e.target.value)}
              style={{ height: '45px', padding: '2px', cursor: 'pointer', width: '100%' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="whatsapp">WhatsApp Number</label>
            <input 
              type="text" 
              id="whatsapp" 
              placeholder="e.g., +212 600 000 000"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="instagram">Instagram Username</label>
            <div className="input-prefix-wrapper">
              <span className="input-prefix">@</span>
              <input 
                type="text" 
                id="instagram" 
                placeholder="yourstore.handle"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Store Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="contact@yourstore.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="navigation-actions">
            <Link to="/footer-step">
              <button className="save-contact-btn" type="submit">Complete Store Setup</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactStep;