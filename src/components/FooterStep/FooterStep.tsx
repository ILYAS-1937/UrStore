import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FooterStep.css';
import useStore from '../../useStore';

// Use your default logo here
import defaultLogo from "../../images/urStoreLogo.png"; 

function FooterStep() {
  const setField = useStore((state) => state.setField);

  // --- Customization States ---
  const [footerLogo, setFooterLogo] = useState(defaultLogo);
  const [footerLogoWidth, setFooterLogoWidth] = useState(120);
  const [footerBgColor, setFooterBgColor] = useState('#ffffff'); 
  const [footerTextColor, setFooterTextColor] = useState('#1f2937'); 
  const [footerDescription, setFooterDescription] = useState('Your store, your style, zero code.');
  const [storeName, setStoreName] = useState('UrStore');
  
  // Store Guarantees States (No backend needed!)
  const [guaranteeTitle, setGuaranteeTitle] = useState('Our Guarantees');
  const [guarantee1, setGuarantee1] = useState('🚚 Free Shipping');
  const [guarantee2, setGuarantee2] = useState('🔒 Secure Payment');
  const [guarantee3, setGuarantee3] = useState('💬 24/7 Support');

  // --- Sync with Global Store ---
  useEffect(() => { setField("footerLogo", footerLogo); }, [footerLogo, setField]);
  useEffect(() => { setField("footerLogoWidth", footerLogoWidth); }, [footerLogoWidth, setField]);
  useEffect(() => { setField("footerBgColor", footerBgColor); }, [footerBgColor, setField]);
  useEffect(() => { setField("footerTextColor", footerTextColor); }, [footerTextColor, setField]);
  useEffect(() => { setField("footerDescription", footerDescription); }, [footerDescription, setField]);
  useEffect(() => { setField("storeName", storeName); }, [storeName, setField]);
  useEffect(() => { setField("guaranteeTitle", guaranteeTitle); }, [guaranteeTitle, setField]);
  useEffect(() => { setField("guarantee1", guarantee1); }, [guarantee1, setField]);
  useEffect(() => { setField("guarantee2", guarantee2); }, [guarantee2, setField]);
  useEffect(() => { setField("guarantee3", guarantee3); }, [guarantee3, setField]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFooterLogo(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="footer-step-wrapper">
      <h1 className="heroTitle"><span>Step 5:</span> Finalize Your Footer</h1>
      
      <div className="footer-step-container">
        {/* --- LIVE PREVIEW SECTION --- */}
        <div className="footer-preview-area">
          <div className="preview-label">Footer Preview</div>
          
          <div className="footer-mockup-container">
            <footer 
              className="dynamic-footer-preview" 
              style={{ 
                backgroundColor: footerBgColor, 
                color: footerTextColor,
                borderTop: `1px solid ${footerTextColor}22` 
              }}
            >
              <div className="footer-main-content">
                {/* Left: Logo + Description */}
                <div className="footer-brand-side">
                  <div className="footer-logo-wrapper">
                    <img 
                      src={footerLogo} 
                      alt="Logo" 
                      style={{ width: `${footerLogoWidth}px`, objectFit: 'contain' }} 
                    />
                  </div>
                  <p className="footer-desc-text" style={{ color: footerTextColor }}>
                    {footerDescription}
                  </p>
                </div>
                
                {/* Right: Store Guarantees */}
                <div className="footer-right-side">
                  <h4 style={{ color: footerTextColor }}>{guaranteeTitle}</h4>
                  <ul className="guarantees-list">
                    <li style={{ color: footerTextColor }}>{guarantee1}</li>
                    <li style={{ color: footerTextColor }}>{guarantee2}</li>
                    <li style={{ color: footerTextColor }}>{guarantee3}</li>
                  </ul>
                </div>
              </div>

              {/* Copyright Bar */}
              <div className="footer-copyright-bar" style={{ borderTopColor: `${footerTextColor}22` }}>
                <p>&copy; {new Date().getFullYear()} {storeName}. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </div>

        {/* --- FORM SECTION --- */}
        <form className="footer-form-panel" onSubmit={(e) => e.preventDefault()}>
          
          <div className="form-group">
            <label>Store Name (For Copyright)</label>
            <input 
              type="text" 
              value={storeName} 
              onChange={(e) => setStoreName(e.target.value)} 
              placeholder="e.g. UrStore"
            />
          </div>

          <div className="form-group">
            <label>Footer Logo</label>
            <input type="file" accept="image/*" onChange={handleLogoChange} className="file-input" />
          </div>

          <div className="form-group">
            <label>Logo Width ({footerLogoWidth}px)</label>
            <input 
              type="range" min="50" max="300" 
              value={footerLogoWidth} 
              onChange={(e) => setFooterLogoWidth(Number(e.target.value))} 
            />
          </div>

          <div className="form-group">
            <label>Short Brand Description</label>
            <textarea 
              value={footerDescription} 
              onChange={(e) => setFooterDescription(e.target.value)} 
              maxLength={120}
            />
          </div>

          {/* Guarantees Inputs */}
          <div className="form-group">
            <label>Guarantees Section Title</label>
            <input 
              type="text" 
              value={guaranteeTitle} 
              onChange={(e) => setGuaranteeTitle(e.target.value)} 
            />
          </div>
          
          <div className="guarantees-inputs">
            <div className="form-group">
              <input type="text" value={guarantee1} onChange={(e) => setGuarantee1(e.target.value)} placeholder="Guarantee 1" />
            </div>
            <div className="form-group">
              <input type="text" value={guarantee2} onChange={(e) => setGuarantee2(e.target.value)} placeholder="Guarantee 2" />
            </div>
            <div className="form-group">
              <input type="text" value={guarantee3} onChange={(e) => setGuarantee3(e.target.value)} placeholder="Guarantee 3" />
            </div>
          </div>

          <div className="color-inputs">
            <div className="color-field">
              <label>Background Color</label>
              <input type="color" value={footerBgColor} onChange={(e) => setFooterBgColor(e.target.value)} />
            </div>
            <div className="color-field">
              <label>Text Color</label>
              <input type="color" value={footerTextColor} onChange={(e) => setFooterTextColor(e.target.value)} />
            </div>
          </div>

          <Link to="/final-preview" className="finish-link">
            <button className="complete-btn">Finish & Generate Store</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default FooterStep;