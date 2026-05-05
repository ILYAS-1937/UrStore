import { useEffect, useState } from "react";
import "./HeroStep.css";
import heroImg from "../../images/urStoreHeroImg.png";
import { Link } from "react-router-dom";
import useStore from "../../useStore";

function HeroStep() {
  const setField = useStore((state) => state.setField);
  const data = useStore((state) => state.data) || {}; // <-- Pull saved data

  // --- 1. State Variables ---
  const [currentImage, setCurrentImage] = useState(data.currentImage || heroImg);
  const [heroImgWidth, setheroImgWidth] = useState(data.heroImgWidth || 100);
  
  // Font Styles
  const [titleFont, setTitleFont] = useState(data.titleFont || "");
  const [subtitleFont, setSubtitleFont] = useState(data.subtitleFont || "");
  const [paragraphFont, setParagraphFont] = useState(data.paragraphFont || "");
  
  // Colors
  const [heroBgColor, setheroBgColor] = useState(data.heroBgColor || "#ffffff");
  const [heroBorderColor] = useState(data.heroBorderColor || "#e2e8f0");
  const [heroTitleColor, setheroTitleColor] = useState(data.heroTitleColor || "#1f2937");
  const [subheroTitleColor, setSubheroTitleColor] = useState(data.subheroTitleColor || "#4f46e5");
  const [descColor, setDescColor] = useState(data.descColor || "#4b5563");
  const [heroBtnColor, setheroBtnColor] = useState(data.heroBtnColor || "#6366f1");
  const [heroBtnTextColor, setheroBtnTextColor] = useState(data.heroBtnTextColor || "#ffffff");
  const [heroTitle, setHeroTitle] = useState(data.heroTitle || "Your hero");
  const [heroSubtitle, setHeroSubtitle] = useState(data.heroSubtitle || "Your hero subtitle");
  const [heroDescription, setHeroDescription] = useState(data.heroDescription || "your hero description.");

  useEffect(() => {
    setField("currentImage", currentImage);
  }, [setField, currentImage]);
  useEffect(() => {
    setField("heroImgWidth", heroImgWidth);
  }, [setField, heroImgWidth]);
  useEffect(() => {
    setField("titleFont", titleFont);
  }, [setField, titleFont]);
  useEffect(() => {
    setField("subtitleFont", subtitleFont);
  }, [setField, subtitleFont]); 
  useEffect(() => {
    setField("paragraphFont", paragraphFont);
  }, [setField, paragraphFont]);
  useEffect(() => {
    setField("heroBgColor", heroBgColor);
  }, [setField, heroBgColor]);
  useEffect(() => {
    setField("heroBorderColor", heroBorderColor);
  }, [setField, heroBorderColor]);
  useEffect(() => {
    setField("heroTitleColor", heroTitleColor);
  }, [setField, heroTitleColor]);
  useEffect(() => {
    setField("subheroTitleColor", subheroTitleColor);
  }, [setField, subheroTitleColor]);
  useEffect(() => {
    setField("descColor", descColor);
  }, [setField, descColor]);  
  useEffect(() => {
    setField("heroBtnColor", heroBtnColor);
  }, [setField, heroBtnColor]);
  useEffect(() => {
    setField("heroBtnTextColor", heroBtnTextColor);
  }, [setField, heroBtnTextColor]);
  useEffect(() => {
    setField("heroTitle", heroTitle);
  }, [setField, heroTitle]);
  useEffect(() => {
    setField("heroSubtitle", heroSubtitle);
  }, [setField, heroSubtitle]);
  useEffect(() => {
    setField("heroDescription", heroDescription);
  }, [setField, heroDescription]);

  // --- 2. Handlers ---
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Creates a temporary URL to display the uploaded image
      setCurrentImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="all">
      <div className="hero-step">
        
        {/* LEFT SECTION: Contains both the Title and the Hero Container */}
        <div className="hero-left-wrapper">
          <h1 className="heroTitle"><span>Step2:</span> Customize Your Store Hero</h1>
          
          <div 
            className="hero-container"
            style={{ 
              backgroundColor: heroBgColor, 
              borderColor: heroBorderColor,
              borderStyle: heroBorderColor ? "solid" : "none", // Ensures border is visible if color is selected
              borderWidth: "2px"
            }}
          >
            <div className="hero-paragraphe">
              <h1 style={{ fontFamily: titleFont, color: heroTitleColor }}>     
               {heroTitle}
              </h1>
              <h2 style={{ fontFamily: subtitleFont, color: subheroTitleColor }}>
                {heroSubtitle}
              </h2>
              <p style={{ fontFamily: paragraphFont, color: descColor }}>
               {heroDescription}
              </p>
              <button 
                className="hero-button"
                style={{ backgroundColor: heroBtnColor, color: heroBtnTextColor }}
              >
                View Menu Now
              </button>
            </div>

            <div className="hero-image">
              <img 
                src={currentImage} 
                alt="Platform Preview" 
                style={{ width: `${heroImgWidth}%` }} 
              />
            </div>
          </div>
        </div>

        {/* RIGHT SECTION: Form */}
        <form className="hero-form" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="hero-img">Import your store hero image:</label>
          <input type="file" id="hero-img" accept="image/*" onChange={handleImageChange} />
          
          <label htmlFor="hero-img-width">Logo width:</label>
          <input 
            type="range" 
            id="hero-img-width" 
            min="80" max="150" 
            value={heroImgWidth} 
            onChange={(e) => setheroImgWidth(e.target.value)} 
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
          <input type="color" className='color-picker-custom' value={heroBgColor} onChange={(e) => setheroBgColor(e.target.value)}/>
          
          <label htmlFor="title-color">Title color:</label>
          <input className='color-picker-custom' type="color" value={heroTitleColor} onChange={(e) => setheroTitleColor(e.target.value)}/>
          
          <label htmlFor="subtitle-color">Subtitle color:</label>
          <input className='color-picker-custom' type="color" value={subheroTitleColor} onChange={(e) => setSubheroTitleColor(e.target.value)}/>
          
          <label htmlFor="description-color">Description color:</label>
          <input className='color-picker-custom' type="color" value={descColor} onChange={(e) => setDescColor(e.target.value)}/>
          
          <label htmlFor="hero-btn-color">Button color:</label>
          <input className='color-picker-custom' type="color" value={heroBtnColor} onChange={(e) => setheroBtnColor(e.target.value)}/>
          
          <label htmlFor="hero-btn-text-color">Button text color:</label>
          <input className='color-picker-custom' type="color" value={heroBtnTextColor} onChange={(e) => setheroBtnTextColor(e.target.value)}/>
          
          <Link to="/store-step"><button type="submit">Save Hero</button></Link>
        </form>
      </div>
    </div>
  );
}

export default HeroStep;