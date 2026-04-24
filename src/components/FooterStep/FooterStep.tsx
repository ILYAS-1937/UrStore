import React, { useState } from "react";
import "./FooterStep.css";
import { Link } from "react-router-dom";

function FooterStep() {
  // --- État pour la personnalisation du Footer ---
  const [footerBgColor, setFooterBgColor] = useState("#ffffff");
  const [footerTextColor, setFooterTextColor] = useState("#4b5563");
  const [footerTitleColor, setFooterTitleColor] = useState("#1f2937");
  const [brandName, setBrandName] = useState("UrStore");
  const [brandDesc, setBrandDesc] = useState("Build your dream store with zero code.");
  const [copyrightText, setCopyrightText] = useState("All rights reserved.");

  return (
    <div className="footer-step-page">
            <h1 className="step-main-title"><span>Step4:</span> Customize Your Store Footer</h1>
      <div className="footer-step-container">
        {/* --- SECTION PRÉVISUALISATION (Gauched) --- */}
        <div className="footer-preview-section">
          <footer 
            className="dynamic-footer" 
            style={{ backgroundColor: footerBgColor, color: footerTextColor }}
          >
            <div className="footer-content-preview">
              <div className="footer-brand-preview">
                <h2 style={{ color: footerTitleColor }}>{brandName}</h2>
                <p>{brandDesc}</p>
              </div>
              <div className="footer-links-preview">
                <h3 style={{ color: footerTitleColor }}>Links</h3>
                <ul>
                  <li>Home</li>
                  <li>Shop</li>
                  <li>Contact</li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom-preview" style={{ borderTop: `1px solid ${footerTextColor}33` }}>
              <p>&copy; {new Date().getFullYear()} {brandName}. {copyrightText}</p>
            </div>
          </footer>
        </div>

        {/* --- SECTION FORMULAIRE (Droite) --- */}
        <div className="footer-form-container">
          <form className="footer-form" onSubmit={(e) => e.preventDefault()}>
            
            <label>Brand Name:</label><br />
            <input 
              type="text" 
              className="hero-input-custom" 
              value={brandName} 
              onChange={(e) => setBrandName(e.target.value)} 
            />

            <label>Brand Description:</label><br />
            <textarea 
              className="hero-input-custom" 
              value={brandDesc} 
              onChange={(e) => setBrandDesc(e.target.value)} 
              rows={3}
            />

            <label>Background Color:</label>
            <input 
              type="color" 
              className="color-picker-custom"
              value={footerBgColor} 
              onChange={(e) => setFooterBgColor(e.target.value)} 
            />

            <label>Title Color:</label>
            <input 
              type="color" 
              className="color-picker-custom"
              value={footerTitleColor} 
              onChange={(e) => setFooterTitleColor(e.target.value)} 
            />

            <label>Text Color:</label>
            <input 
              type="color" 
              className="color-picker-custom"
              value={footerTextColor} 
              onChange={(e) => setFooterTextColor(e.target.value)} 
            />

            <label>Copyright Text:</label> <br />
            <input 
              type="text" 
              className="hero-input-custom" 
              value={copyrightText} 
              onChange={(e) => setCopyrightText(e.target.value)} 
            />

            <Link to="/final-preview">
              <button type="submit" className="submit-btn-footer">Finish Design</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FooterStep;