import React, { useState, useEffect } from 'react';
import './HeaderStep.css';
import urStoreheaderLogo from "../../images/urStoreLogo.png";
// We changed Link to useNavigate to control exactly when the user changes pages
import { useNavigate } from 'react-router-dom'; 
import useStore from '../../useStore';

function HeaderStep() {
  const setField = useStore((state) => state.setField);
  const data = useStore((state: any) => state.data) || {};
  
  // Initialize the navigator hook
  const navigate = useNavigate();

  // State Variables
  const [headerLogo, setheaderLogo] = useState(data.headerLogo || urStoreheaderLogo);
  const [headerBgColor, setheaderBgColor] = useState(data.headerBgColor || '#ffffff');
  const [headerBorderColor, setheaderBorderColor] = useState(data.headerBorderColor || '#e2e8f0');
  const [headerHeight, setHeaderHeight] = useState(data.headerHeight || '');
  const [navLinkColor, setNavLinkColor] = useState(data.navLinkColor || '#444');
  const [headerLogoWidth, setheaderLogoWidth] = useState(data.headerLogoWidth || 100);

  // --- NEW: State to control the Theme Modal ---
  const [showThemeModal, setShowThemeModal] = useState(false);

  useEffect(() => { setField("headerLogo", headerLogo); }, [headerLogo, setField]);
  useEffect(() => { setField("headerBgColor", headerBgColor); }, [headerBgColor, setField]);
  useEffect(() => { setField("headerBorderColor", headerBorderColor); }, [headerBorderColor, setField]);
  useEffect(() => { setField("headerHeight", headerHeight); }, [headerHeight, setField]);
  useEffect(() => { setField("navLinkColor", navLinkColor); }, [navLinkColor, setField]); 
  useEffect(() => { setField("headerLogoWidth", headerLogoWidth); }, [headerLogoWidth, setField]);

  const handleheaderLogoChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setheaderLogo(URL.createObjectURL(file));
    }
  };

  // Intercept the form submission to show the modal instead of navigating instantly
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setShowThemeModal(true); 
  };

  // --- NEW: Logic to handle their choice and change pages ---
// --- NEW: Logic to handle their choice and change pages ---
  const handleThemeChoice = (applyTheme: boolean) => {
    if (applyTheme) {
      // Background Mapping: Apply header background to all other main backgrounds
      setField("heroBgColor", headerBgColor);
      setField("inventoryBgColor", headerBgColor);
      setField("footerBgColor", headerBgColor);
      setField("contactBgColor", headerBgColor); // <-- The background still syncs!

      // Accent Mapping: Apply the Navigation Link color to texts and buttons
      setField("heroTitleColor", navLinkColor);
      setField("subheroTitleColor", navLinkColor);
      setField("heroBtnColor", navLinkColor);
      setField("productNameColor", navLinkColor);
      setField("productPriceColor", navLinkColor);
      setField("footerTextColor", navLinkColor);
      
      // We REMOVED the contactBtnBgColor mapping here so the buttons stay branded!

      // Border Mapping
      setField("heroBorderColor", headerBorderColor);
    }
    
    // Close the modal and move to the next step!
    setShowThemeModal(false);
    navigate('/hero-step');
  };

  const headerStyles = {
    backgroundColor: headerBgColor,
    border: headerBorderColor ? `2px solid ${headerBorderColor}` : undefined,
    height: headerHeight ? `${headerHeight}px` : undefined,
    transition: 'all 0.3s ease' 
  };

  return (
    <div className="header-step">
      
      {/* --- NEW: THEME MODAL --- */}
      {showThemeModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999 }}>
          <div style={{ background: "#fff", padding: "30px", borderRadius: "12px", width: "420px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)", textAlign: "center" }}>
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>🎨</div>
            <h3 style={{ marginTop: 0, color: "#1e293b", fontSize: "22px" }}>Apply as Global Theme?</h3>
            <p style={{ color: "#64748b", marginBottom: "25px", lineHeight: "1.6", fontSize: "15px" }}>
              Would you like to use these header colors as the default theme for the rest of your store? <br/><br/>
              <span style={{ fontSize: "13px", color: "#94a3b8" }}>(You can still change individual colors manually in the next steps)</span>
            </p>
            
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button 
                onClick={() => handleThemeChoice(false)}
                style={{ flex: 1, padding: "12px", background: "#f1f5f9", color: "#475569", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
              >
                No, just the Header
              </button>
              <button 
                onClick={() => handleThemeChoice(true)}
                style={{ flex: 1, padding: "12px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
              >
                Yes, Apply Theme
              </button>
            </div>
          </div>
        </div>
      )}

      <h1><span>Step 1:</span> Customize Your Store Header</h1>
      
      <div className="header-container" style={headerStyles}>
        <img src={headerLogo} alt="UrStore headerLogo" style={{ height: `${headerLogoWidth}px`, transition: 'height 0.2s ease' }} />
        <ul>
          <li><a href="#home" style={{ color: navLinkColor }}>Home</a></li>
          <li><a href="#about" style={{ color: navLinkColor }}>About</a></li>
          <li><a href="#store" style={{ color: navLinkColor }}>Store</a></li>
          <li><a href="#contact" style={{ color: navLinkColor }}>Contact</a></li>
        </ul>
      </div>

      <form className="header-form" onSubmit={handleSubmit}>

        <label htmlFor="store-headerLogo">Import your store headerLogo:</label>
        <input type="file" id="store-headerLogo" accept='image/*' onChange={handleheaderLogoChange} />
        
        <label htmlFor="headerLogo-width">headerLogo width ({headerLogoWidth}px):</label>
        <input 
          type="range" 
          id="headerLogo-width" 
          min="50"   
          max="300"  
          value={headerLogoWidth} 
          onChange={(e) => setheaderLogoWidth(Number(e.target.value))} 
        />
        
        <label htmlFor="back-color">Header background-color:</label>
        <input type='color' id="back-color" className='color-picker-custom' value={headerBgColor} onChange={(e) => setheaderBgColor(e.target.value)}/>
        
        <label htmlFor="nav-links-color">Navigation links color:</label>
        <input type='color' className='color-picker-custom' id="nav-links-color" value={navLinkColor} onChange={(e) => setNavLinkColor(e.target.value)}/>
        
        <label htmlFor="border-color">Border color:</label>
        <input type='color' className='color-picker-custom' id="border-color" value={headerBorderColor} onChange={(e) => setheaderBorderColor(e.target.value)}/>

        <label htmlFor="header-height">Header height (in px):</label>
        <input 
          type="number" 
          id="header-height" 
          value={headerHeight}
          onChange={(e) => setHeaderHeight(e.target.value)} 
        />
        
        {/* We changed this from a <Link> to a standard submit button so it triggers our handleSubmit function above */}
        <button type="submit">Save Header</button>
      </form>
    </div>
  );
}

export default HeaderStep;