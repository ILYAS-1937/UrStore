import React, { useState,useEffect} from 'react';
import './HeaderStep.css';
import urStoreheaderLogo from "../../images/urStoreLogo.png";
import { Link } from 'react-router-dom';
import useStore from '../../useStore';

function HeaderStep() {
  const setField = useStore((state) => state.setField);
  const [headerLogo, setheaderLogo] = useState(urStoreheaderLogo);
  const [headerBgColor, setheaderBgColor] = useState('#ffffff');
  const [headerBorderColor, setheaderBorderColor] = useState('#e2e8f0');
  const [headerHeight, setHeaderHeight] = useState('');
  const [navLinkColor, setNavLinkColor] = useState('#444');
  const [headerLogoWidth, setheaderLogoWidth] = useState(100);

   useEffect(() => {
    setField("headerLogo", headerLogo);
  }, [headerLogo]);
    useEffect(() => {
    setField("headerBgColor", headerBgColor);
  }, [headerBgColor]);
    useEffect(() => {
    setField("headerBorderColor", headerBorderColor);
  }, [headerBorderColor]);
    useEffect(() => {
    setField("headerHeight", headerHeight);
  }, [headerHeight]);
    useEffect(() => {
    setField("navLinkColor", navLinkColor);
  }, [navLinkColor]); 
    useEffect(() => {
    setField("headerLogoWidth", headerLogoWidth);
  }, [headerLogoWidth]);

  const handleheaderLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setheaderLogo(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saved values:", { headerLogo, headerBgColor, headerBorderColor, headerHeight });
  };

  // 4. Object containing our dynamic styles to inject into the header container
  const headerStyles = {
    backgroundColor: headerBgColor,
    border: headerBorderColor ? `2px solid ${headerBorderColor}` : undefined,
    height: headerHeight ? `${headerHeight}px` : undefined,
    transition: 'all 0.3s ease' // Adds a smooth transition effect when changing values
  };

  return (
    <div className="header-step">
        <h1><span>Step1:</span> Customize Your Store Header</h1>
      {/* 5. Apply the dynamic styles to the container */}
      <div className="header-container" style={headerStyles}>
        {/* 6. Update the src to use our state variable */}
        <img src={headerLogo} alt="UrStore headerLogo" style={{ height: `${headerLogoWidth}px`, transition: 'height 0.2s ease' }} />
       <ul>
  <li><a href="" style={{ color: navLinkColor }}>Home</a></li>
  <li><a href="" style={{ color: navLinkColor }}>About</a></li>
  <li><a href="" style={{ color: navLinkColor }}>Store</a></li>
  <li><a href="" style={{ color: navLinkColor }}>Contact</a></li>
</ul>
      </div>

      <form className="header-form" onSubmit={handleSubmit}>
        <h1>Customize Your Store Header</h1>
        
        <label htmlFor="store-headerLogo">Import your store headerLogo:</label>
        {/* Added onChange handler */}
        <input type="file" id="store-headerLogo" accept='image/*' onChange={handleheaderLogoChange} />
        <label htmlFor="headerLogo-width">headerLogo width ({headerLogoWidth}px):</label>
<input 
  type="range" 
  id="headerLogo-width" 
  min="50"   /* Minimum width of 50px */
  max="300"  /* Maximum width of 300px */
  value={headerLogoWidth} 
  onChange={(e) => setheaderLogoWidth(e.target.value)} 
/>
        
        <label htmlFor="back-color">Header background-color:</label>
        {/* Added value and onChange handler */}
        <input type='color' id="back-color" className='color-picker-custom' value={headerBgColor} onChange={(e) => setheaderBgColor(e.target.value)}/>
        <label htmlFor="nav-links-color">Navigation links color:</label>
        <input type='color' className='color-picker-custom'
  id="nav-links-color" 
  value={navLinkColor} 
  onChange={(e) => setNavLinkColor(e.target.value)}
/>
        <label htmlFor="border-color">Border color:</label>
        {/* Added value and onChange handler */}
        <input type='color' id="border-color" value={headerBorderColor} onChange={(e) => setheaderBorderColor(e.target.value)}/>

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