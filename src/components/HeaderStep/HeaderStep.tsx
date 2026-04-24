import React, { useState } from 'react';
import './HeaderStep.css';
import urStoreLogo from "../../images/urStoreLogo.png";
import { Link } from 'react-router-dom';

function HeaderStep() {
  // 1. Create state variables to track user inputs
  const [logo, setLogo] = useState(urStoreLogo);
  const [bgColor, setBgColor] = useState('');
  const [borderColor, setBorderColor] = useState('');
  const [headerHeight, setHeaderHeight] = useState('');
  const [navLinkColor, setNavLinkColor] = useState('');
  const [logoWidth, setLogoWidth] = useState(100);

  // 2. Handle file uploads and convert them to a readable URL for the <img> tag
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  // 3. Prevent the page from reloading when clicking "Save Header"
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saved values:", { logo, bgColor, borderColor, headerHeight });
    // You can later add your API call or parent state update here
  };

  // 4. Object containing our dynamic styles to inject into the header container
  const headerStyles = {
    backgroundColor: bgColor,
    border: borderColor ? `2px solid ${borderColor}` : undefined,
    height: headerHeight ? `${headerHeight}px` : undefined,
    transition: 'all 0.3s ease' // Adds a smooth transition effect when changing values
  };

  return (
    <div className="header-step">
        <h1><span>Step1:</span> Customize Your Store Header</h1>
      {/* 5. Apply the dynamic styles to the container */}
      <div className="header-container" style={headerStyles}>
        {/* 6. Update the src to use our state variable */}
        <img src={logo} alt="UrStore Logo" style={{ height: `${logoWidth}px`, transition: 'height 0.2s ease' }} />
       <ul>
  <li><a href="" style={{ color: navLinkColor }}>Home</a></li>
  <li><a href="" style={{ color: navLinkColor }}>About</a></li>
  <li><a href="" style={{ color: navLinkColor }}>Store</a></li>
  <li><a href="" style={{ color: navLinkColor }}>Contact</a></li>
</ul>
      </div>

      <form className="header-form" onSubmit={handleSubmit}>
        <h1>Customize Your Store Header</h1>
        
        <label htmlFor="store-logo">Import your store logo:</label>
        {/* Added onChange handler */}
        <input type="file" id="store-logo" accept='image/*' onChange={handleLogoChange} />
        <label htmlFor="logo-width">Logo width ({logoWidth}px):</label>
<input 
  type="range" 
  id="logo-width" 
  min="50"   /* Minimum width of 50px */
  max="300"  /* Maximum width of 300px */
  value={logoWidth} 
  onChange={(e) => setLogoWidth(e.target.value)} 
/>
        
        <label htmlFor="back-color">Header background-color:</label>
        {/* Added value and onChange handler */}
        <input type='color' id="back-color" className='color-picker-custom' value={bgColor} onChange={(e) => setBgColor(e.target.value)}/>
        <label htmlFor="nav-links-color">Navigation links color:</label>
        <input type='color' className='color-picker-custom'
  id="nav-links-color" 
  value={navLinkColor} 
  onChange={(e) => setNavLinkColor(e.target.value)}
/>
        <label htmlFor="border-color">Border color:</label>
        {/* Added value and onChange handler */}
        <input type='color' id="border-color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)}/>

        <label htmlFor="header-height">Header height(in px):</label>
        {/* Added value and onChange handler */}
        <input 
          type="number" 
          id="header-height" 
          value={headerHeight}
          onChange={(e) => setHeaderHeight(e.target.value)} 
        />
        
        <Link to="/hero-step">
          <button type="submit">Save Header</button>
        </Link>
      </form>
    </div>
  );
}

export default HeaderStep;