import { useState, useEffect } from 'react';
import styles from './HeaderStep.module.css'; // Changed to CSS Module import
import urStoreheaderLogo from "../../images/urStoreLogo.png";
// We changed Link to useNavigate to control exactly when the user changes pages
import { useNavigate } from 'react-router-dom'; 
import useStore from '../../useStore';

function HeaderStep() {
  const setField = useStore((state) => state.setField);
  const data = useStore((state) => state.data) || {};
  
  // Initialize the navigator hook
  const navigate = useNavigate();

  // State Variables
  const [headerLogo, setheaderLogo] = useState(data.headerLogo || urStoreheaderLogo);
  const [headerBgColor, setheaderBgColor] = useState(data.headerBgColor || '#ffffff');
  const [headerBorderColor] = useState(data.headerBorderColor || '#e2e8f0');
  const [headerHeight, setHeaderHeight] = useState(data.headerHeight || '');
  const [navLinkColor, setNavLinkColor] = useState(data.navLinkColor || '#444');
  const [headerLogoWidth, setheaderLogoWidth] = useState(data.headerLogoWidth || 100);

  useEffect(() => { setField("headerLogo", headerLogo); }, [headerLogo, setField]);
  useEffect(() => { setField("headerBgColor", headerBgColor); }, [headerBgColor, setField]);
  useEffect(() => { setField("headerBorderColor", headerBorderColor); }, [headerBorderColor, setField]);
  useEffect(() => { setField("headerHeight", headerHeight); }, [headerHeight, setField]);
  useEffect(() => { setField("navLinkColor", navLinkColor); }, [navLinkColor, setField]); 
  useEffect(() => { setField("headerLogoWidth", headerLogoWidth); }, [headerLogoWidth, setField]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleheaderLogoChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setheaderLogo(URL.createObjectURL(file));
    }
  };

  // Intercept the form submission to show the modal instead of navigating instantly
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault();
    navigate('/hero-step'); 
  };

  const headerStyles = {
    backgroundColor: headerBgColor,
    border: headerBorderColor ? `2px solid ${headerBorderColor}` : undefined,
    height: headerHeight ? `${headerHeight}px` : undefined,
    transition: 'all 0.3s ease',
    width: '60%' // Layout locked in
  };

  return (
    <div className={styles['header-step']} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
      <div style={{ width: '100%' }}>
        <h1><span>Step 1:</span> Customize Your Store Header</h1>
      </div>
      
      <div className={styles['header-container']} style={headerStyles}>
        <img src={headerLogo} alt="UrStore headerLogo" style={{ height: `${headerLogoWidth}px`, transition: 'height 0.2s ease' }} />
        <ul>
          <li><a href="#home" style={{ color: navLinkColor }}>Home</a></li>
          <li><a href="#about" style={{ color: navLinkColor }}>About</a></li>
          <li><a href="#store" style={{ color: navLinkColor }}>Store</a></li>
          <li><a href="#contact" style={{ color: navLinkColor }}>Contact</a></li>
        </ul>
      </div>

      <form className={styles['header-form']} style={{ width: '30%' }} onSubmit={handleSubmit}>

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
        <input type='color' id="back-color" className={styles['color-picker-custom']} value={headerBgColor} onChange={(e) => setheaderBgColor(e.target.value)}/>
        
        <label htmlFor="nav-links-color">Navigation links color:</label>
        <input type='color' className={styles['color-picker-custom']} id="nav-links-color" value={navLinkColor} onChange={(e) => setNavLinkColor(e.target.value)}/>
        
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