import React from "react";
import useStore from "../../useStore";

// Importation de TOUS les fichiers CSS pour que le design s'applique
import "../HeaderStep/HeaderStep.css"; 
import "../HeroStep/HeroStep.css";
import "../StoreStep/StoreStep.css"; 
import "../FooterStep/FooterStep.css";

function FinalPreview() {
  const data = useStore((state) => state.data);

  // --- 1. HEADER DATA ---
  const headerBgColor = data.headerBgColor || "#ffffff";
  const headerBorderColor = data.headerBorderColor || "";
  const headerHeight = data.headerHeight || "";
  const headerLogoWidth = data.headerLogoWidth || 100;
  const headerLogo = data.headerLogo || ""; 
  const navLinkColor = data.navLinkColor || "#444";

  // --- 2. HERO DATA ---
  const heroBgColor = data.heroBgColor || "#ffffff";
  const heroBorderColor = data.heroBorderColor || "";
  const titleFont = data.titleFont || "Arial";
  const heroTitleColor = data.heroTitleColor || "#1f2937";
  const heroTitle = data.heroTitle || "Your hero";
  const subtitleFont = data.subtitleFont || "Arial";
  const subheroTitleColor = data.subheroTitleColor || "#4f46e5";
  const heroSubtitle = data.heroSubtitle || "Your hero subtitle";
  const paragraphFont = data.paragraphFont || "Arial";
  const descColor = data.descColor || "#4b5563";
  const heroDescription = data.heroDescription || "your hero description.";
  const heroBtnColor = data.heroBtnColor || "#6366f1";
  const heroBtnTextColor = data.heroBtnTextColor || "#ffffff";
  const currentImage = data.currentImage || "";
  const heroImgWidth = data.heroImgWidth || 100;

  // --- 3. STORE DATA (Produits de votre camarade) ---
  const products = data.products || [];

  // --- 4. FOOTER DATA ---
  const footerBgColor = data.footerBgColor || "#ffffff";
  const footerTextColor = data.footerTextColor || "#4b5563";
  const footerTitleColor = data.footerTitleColor || "#1f2937";
  const brandName = data.brandName || "UrStore";
  const brandDesc = data.brandDesc || "Build your dream store with zero code.";
  const copyrightText = data.copyrightText || "All rights reserved.";

  return (
    <div style={{ backgroundColor: "#e2e8f0", minHeight: "100vh", paddingBottom: "40px" }}>
      
      {/* ==========================================
          NOUVEAU TITRE (Même design que les étapes)
          ========================================== */}
      <div style={{ padding: "40px 20px" }}>
        <h1 className="step-main-title">
          <span>Final Step:</span> Preview Your Store
        </h1>
      </div>

      {/* ========================================================
          LE CONTENEUR GLOBAL DU SITE (C'est lui qui fixe la largeur)
          ======================================================== */}
      <div style={{ 
        maxWidth: "1200px", 
        margin: "0 auto", 
        backgroundColor: "#fff", 
        boxShadow: "0px 10px 40px rgba(0,0,0,0.15)", // Une seule ombre pour tout le site
        display: "flex",
        flexDirection: "column",
        overflow: "hidden" // Empêche les éléments de dépasser
      }}>

        {/* --- HEADER --- */}
        <div 
          className="header-container" 
          style={{
            backgroundColor: headerBgColor,
            borderBottom: headerBorderColor ? `2px solid ${headerBorderColor}` : "none",
            height: headerHeight ? `${headerHeight}px` : undefined,
            maxWidth: "100%", // Force le Header à prendre toute la largeur du conteneur
            margin: 0, // Enlève le margin
            borderRadius: 0, // Enlève les bords arrondis pour s'attacher au Hero
            boxShadow: "none" // Supprime l'ombre individuelle
          }}
        >
          {headerLogo ? (
            <img src={headerLogo} alt="Store Logo" style={{ height: `${headerLogoWidth}px` }} />
          ) : (
            <div style={{ fontWeight: "bold", fontSize: "24px" }}>Logo</div>
          )}
          <ul>
            <li><a href="#home" style={{ color: navLinkColor }}>Home</a></li>
            <li><a href="#about" style={{ color: navLinkColor }}>About</a></li>
            <li><a href="#store" style={{ color: navLinkColor }}>Store</a></li>
            <li><a href="#contact" style={{ color: navLinkColor }}>Contact</a></li>
          </ul>
        </div>

        {/* --- HERO --- */}
        <div 
          className="hero-container"
          style={{ 
            backgroundColor: heroBgColor, 
            borderBottom: heroBorderColor ? `2px solid ${heroBorderColor}` : "none",
            width: "100%",           // S'assure qu'il prend 100% de l'espace
            maxWidth: "100%",
            boxSizing: "border-box", // LE SECRET : empêche le padding de faire déborder la section
            margin: 0, 
            borderRadius: 0,
            boxShadow: "none",
            overflow: "hidden"       // Garde l'image à l'intérieur
          }}
        >
          <div className="hero-paragraphe" style={{ flex: 1, minWidth: "300px" }}> 
            {/* flex: 1 permet au texte de rétrécir intelligemment pour laisser de la place à l'image */}
            <h1 style={{ fontFamily: titleFont, color: heroTitleColor }}>{heroTitle}</h1>
            <h2 style={{ fontFamily: subtitleFont, color: subheroTitleColor }}>{heroSubtitle}</h2>
            <p style={{ fontFamily: paragraphFont, color: descColor }}>{heroDescription}</p>
            <button className="hero-button" style={{ backgroundColor: heroBtnColor, color: heroBtnTextColor }}>
              View Menu Now
            </button>
          </div>

          <div className="hero-image" style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            {currentImage && (
              <img 
                src={currentImage} 
                alt="Platform Preview" 
                style={{ 
                  width: `${heroImgWidth}%`, 
                  maxWidth: "100%",        // L'image ne dépassera jamais de sa moitié d'écran
                  objectFit: "cover",      // Garde les proportions intactes
                  height: "auto",
                  borderRadius: "20px"     // Garde les bords arrondis de l'image
                }} 
              />
            )}
          </div>
        </div>

        {/* --- STORE (Boutique) --- */}
        <div style={{ padding: "60px 5%", backgroundColor: "#f8fafc" }}>
          <div className="store-header" style={{ marginBottom: "40px" }}>
            <div>
              <h2 style={{ fontSize: "2.2rem", color: "#0f172a" }}>Our Products</h2>
              <p style={{ color: "#64748b" }}>Discover the catalog of {brandName}.</p>
            </div>
          </div>

          <div className="products-grid">
            {products.length === 0 ? (
              <div style={{ padding: "40px", textAlign: "center", width: "100%", color: "#94a3b8" }}>
                Aucun produit n'a été ajouté pour le moment.
              </div>
            ) : (
              products.map((product: any) => (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    <img src={product.imageUrl} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <div className="price-tag">
                      <span className="price">{Number(product.price).toFixed(2)} MAD</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* --- FOOTER --- */}
        <footer 
          className="dynamic-footer" 
          style={{ 
            backgroundColor: footerBgColor, 
            color: footerTextColor,
            maxWidth: "100%",
            margin: 0,
            borderRadius: 0, // S'attache parfaitement sous la boutique
            boxShadow: "none"
          }}
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
    </div>
  );
}

export default FinalPreview;