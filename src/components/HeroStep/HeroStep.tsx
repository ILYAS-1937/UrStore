import React, { useState } from "react";
import "./HeroStep.css";
import heroImg from "../../images/urStoreHeroImg.png";
import { Link } from "react-router-dom";

function HeroStep() {
  // --- 1. State Variables ---
  const [currentImage, setCurrentImage] = useState(heroImg);
  const [imgWidth, setImgWidth] = useState(100);
  
  // Font Styles
  const [titleFont, setTitleFont] = useState("");
  const [subtitleFont, setSubtitleFont] = useState("");
  const [paragraphFont, setParagraphFont] = useState("");
  
  // Colors
  const [bgColor, setBgColor] = useState("");
  const [borderColor, setBorderColor] = useState("");
  const [titleColor, setTitleColor] = useState("");
  const [subtitleColor, setSubtitleColor] = useState("");
  const [descColor, setDescColor] = useState("");
  const [btnColor, setBtnColor] = useState("");
  const [btnTextColor, setBtnTextColor] = useState("");
  const [heroTitle, setHeroTitle] = useState("Your hero");
  const [heroSubtitle, setHeroSubtitle] = useState("Your hero subtitle");
  const [heroDescription, setHeroDescription] = useState("your hero description.");
  // --- 2. Handlers ---
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Creates a temporary URL to display the uploaded image
      setCurrentImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="all">
    <h1 className="heroTitle"><span>Step2:</span> Customize Your Store Hero</h1>
    <div className="hero-step">
      <div 
        className="hero-container"
        style={{ 
          backgroundColor: bgColor, 
          borderColor: borderColor,
          borderStyle: borderColor ? "solid" : "none", // Ensures border is visible if color is selected
          borderWidth: "2px"
        }}
      >
        <div className="hero-paragraphe">
          <h1 style={{ fontFamily: titleFont, color: titleColor }}>
           {heroTitle}
          </h1>
          <h2 style={{ fontFamily: subtitleFont, color: subtitleColor }}>
            {heroSubtitle}
          </h2>
          <p style={{ fontFamily: paragraphFont, color: descColor }}>
           {heroDescription}
          </p>
          <button 
            className="hero-button"
            style={{ backgroundColor: btnColor, color: btnTextColor }}
          >
            View Menu Now
          </button>
        </div>

        <div className="hero-image">
          <img 
            src={currentImage} 
            alt="Platform Preview" 
            style={{ width: `${imgWidth}%` }} 
          />
        </div>
      </div>
      <form className="hero-form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="hero-img">Import your store hero image:</label>
        <input type="file" id="hero-img" accept="image/*" onChange={handleImageChange} />
        <label htmlFor="hero-img-width">Logo width:</label>
        <input 
          type="range" 
          id="hero-img-width" 
          min="10" max="100" 
          value={imgWidth} 
          onChange={(e) => setImgWidth(e.target.value)} 
        />
        <label htmlFor="hero-title">type your store hero title:</label>
        <input 
          className="hero-input-custom"
          type="text" 
          id="hero-title" 
          value={heroTitle} 
          onChange={(e) => setHeroTitle(e.target.value)} 
        />

        <label htmlFor="hero-subtitle">type your store hero subtitle:</label>
        <input 
        className="hero-input-custom"
          type="text" 
          id="hero-subtitle" 
          value={heroSubtitle} 
          onChange={(e) => setHeroSubtitle(e.target.value)} 
        />

        <label htmlFor="hero-paragraph">type your store hero description:</label>
<textarea
className="hero-input-custom"
  id="hero-paragraph" 
  value={heroDescription} 
  onChange={(e) => setHeroDescription(e.target.value)} 
  rows={4} // Ajoute de la hauteur visible pour les longs textes
  style={{ resize: "vertical" }} // Permet à l'utilisateur d'agrandir la zone
/>
        <label htmlFor="title-text-style">Title text style:</label>
        <select value={titleFont} onChange={(e) => setTitleFont(e.target.value)}>
          <option value="">Select Font Family</option>
        <option value="Arial">Arial</option>
        <option value="Helvetica">Helvetica</option>
        <option value="Verdana">Verdana</option>
         <option value="Tahoma">Tahoma</option>
        <option value="Trebuchet MS">Trebuchet MS</option>
  <option value="Times New Roman">Times New Roman</option>
  <option value="Georgia">Georgia</option>
  <option value="Garamond">Garamond</option>
  <option value="Courier New">Courier New</option>
  <option value="Brush Script MT">Brush Script MT</option>
  <option value="Impact">Impact</option>
  <option value="Comic Sans MS">Comic Sans MS</option>
  <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
  <option value="Palatino Linotype">Palatino Linotype</option>
  <option value="Segoe UI">Segoe UI</option>
  <option value="Candara">Candara</option>
  <option value="Calibri">Calibri</option>
  <option value="Cambria">Cambria</option>
  <option value="Franklin Gothic Medium">Franklin Gothic Medium</option>
  <option value="Monospace">monospace</option>
  <option value="Sans Serif">sans-serif</option>
  <option value="Serif">serif</option>
  <option value="Cursive">cursive</option>
  <option value="Fantasy">fantasy</option>
        </select>

        <label htmlFor="subtitle-text-style">Subtitle text style:</label>
        <select value={subtitleFont} onChange={(e) => setSubtitleFont(e.target.value)}>
          <option value="">Select Font Family</option>
          <option value="Arial">Arial</option>
        <option value="Helvetica">Helvetica</option>
        <option value="Verdana">Verdana</option>
         <option value="Tahoma">Tahoma</option>
        <option value="Trebuchet MS">Trebuchet MS</option>
  <option value="Times New Roman">Times New Roman</option>
  <option value="Georgia">Georgia</option>
  <option value="Garamond">Garamond</option>
  <option value="Courier New">Courier New</option>
  <option value="Brush Script MT">Brush Script MT</option>
  <option value="Impact">Impact</option>
  <option value="Comic Sans MS">Comic Sans MS</option>
  <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
  <option value="Palatino Linotype">Palatino Linotype</option>
  <option value="Segoe UI">Segoe UI</option>
  <option value="Candara">Candara</option>
  <option value="Calibri">Calibri</option>
  <option value="Cambria">Cambria</option>
  <option value="Franklin Gothic Medium">Franklin Gothic Medium</option>
  <option value="Monospace">monospace</option>
  <option value="Sans Serif">sans-serif</option>
  <option value="Serif">serif</option>
  <option value="Cursive">cursive</option>
  <option value="Fantasy">fantasy</option>
        </select>

        <label htmlFor="paragraph-text-style">Paragraph text style:</label>
        <select value={paragraphFont} onChange={(e) => setParagraphFont(e.target.value)}>
          <option value="">Select Font Family</option>
          <option value="Arial">Arial</option>
        <option value="Helvetica">Helvetica</option>
        <option value="Verdana">Verdana</option>
         <option value="Tahoma">Tahoma</option>
        <option value="Trebuchet MS">Trebuchet MS</option>
  <option value="Times New Roman">Times New Roman</option>
  <option value="Georgia">Georgia</option>
  <option value="Garamond">Garamond</option>
  <option value="Courier New">Courier New</option>
  <option value="Brush Script MT">Brush Script MT</option>
  <option value="Impact">Impact</option>
  <option value="Comic Sans MS">Comic Sans MS</option>
  <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
  <option value="Palatino Linotype">Palatino Linotype</option>
  <option value="Segoe UI">Segoe UI</option>
  <option value="Candara">Candara</option>
  <option value="Calibri">Calibri</option>
  <option value="Cambria">Cambria</option>
  <option value="Franklin Gothic Medium">Franklin Gothic Medium</option>
  <option value="Monospace">monospace</option>
  <option value="Sans Serif">sans-serif</option>
  <option value="Serif">serif</option>
  <option value="Cursive">cursive</option>
  <option value="Fantasy">fantasy</option>
        </select>

        <label htmlFor="back-color">Hero background-color:</label>
        <input type="color" className='color-picker-custom' value={bgColor} onChange={(e) => setBgColor(e.target.value)}/>

        <label htmlFor="border-color">Border color:</label>
        <input className='color-picker-custom' type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)}/>
        <label htmlFor="title-color">Title color:</label>
        <input className='color-picker-custom' type="color" value={titleColor} onChange={(e) => setTitleColor(e.target.value)}/>
        <label htmlFor="subtitle-color">Subtitle color:</label>
        <input className='color-picker-custom' type="color" value={subtitleColor} onChange={(e) => setSubtitleColor(e.target.value)}/>
        <label htmlFor="description-color">Description color:</label>
        <input className='color-picker-custom' type="color" value={descColor} onChange={(e) => setDescColor(e.target.value)}/>
        <label htmlFor="hero-btn-color">Button color:</label>
        <input className='color-picker-custom' type="color" value={btnColor} onChange={(e) => setBtnColor(e.target.value)}/>
        <label htmlFor="hero-btn-text-color">Button text color:</label>
        <input className='color-picker-custom' type="color" value={btnTextColor} onChange={(e) => setBtnTextColor(e.target.value)}/>
        <Link to="/store-step"><button type="submit">Save Hero</button></Link>
      </form>
    </div>
    </div>
  );
}

export default HeroStep;