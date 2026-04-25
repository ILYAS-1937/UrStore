import React, { useState } from "react";
import useStore from "../../useStore";
import JSZip from "jszip";

// --- IMPORTATION STRICTE DE TES CSS ---
import "../HeaderStep/HeaderStep.css"; 
import "../HeroStep/HeroStep.css";
import "../StoreStep/StoreStep.css"; 
import "../ContactStep/ContactStep.css"; 
import "../FooterStep/FooterStep.css";

function FinalPreview() {
  const { data } = useStore();
  const [isDownloading, setIsDownloading] = useState(false);

  // --- VALEURS PAR DÉFAUT ---
  const headerBgColor = data.headerBgColor || "#ffffff";
  const headerHeight = data.headerHeight || "";
  const navLinkColor = data.navLinkColor || "#444";
  const headerLogoWidth = data.headerLogoWidth || 100;
  
  const heroBgColor = data.heroBgColor || "#ffffff";
  const heroTitleColor = data.heroTitleColor || "#1f2937";
  const subheroTitleColor = data.subheroTitleColor || "#4f46e5";
  const descColor = data.descColor || "#4b5563";
  const heroBtnColor = data.heroBtnColor || "#6366f1";
  const heroBtnTextColor = data.heroBtnTextColor || "#ffffff";
  
  const titleFont = data.titleFont || "inherit";
  const subtitleFont = data.subtitleFont || "inherit";
  const paragraphFont = data.paragraphFont || "inherit";

  const heroTitle = data.heroTitle || "Your hero";
  const heroSubtitle = data.heroSubtitle || "Your hero subtitle";
  const heroDescription = data.heroDescription || "your hero description.";
  const heroImgWidth = data.heroImgWidth || 100;

  const footerBgColor = data.footerBgColor || "#ffffff";
  const footerTextColor = data.footerTextColor || "#1f2937";
  const footerDescription = data.footerDescription || "Your store, your style, zero code.";
  const storeName = data.storeName || "UrStore";
  const guaranteeTitle = data.guaranteeTitle || "Our Guarantees";
  const guarantee1 = data.guarantee1 || "🚚 Free Shipping";
  const guarantee2 = data.guarantee2 || "🔒 Secure Payment";
  const guarantee3 = data.guarantee3 || "💬 24/7 Support";
  const footerLogoWidth = data.footerLogoWidth || 120;

  const products = data.products || [];
  const whatsapp = data.whatsapp || "";
  const instagram = data.instagram || "";
  const email = data.email || "";

  // --- LE SECRET POUR LE DÉGRADÉ PAR DÉFAUT ---
  const defaultHeroGradient = `radial-gradient(circle at 0% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(244, 114, 182, 0.15) 0%, transparent 50%), #ffffff`;
  
  // Si l'utilisateur n'a pas changé la couleur (reste blanc), on met le dégradé. Sinon on met sa couleur.
  const finalHeroBg = heroBgColor === "#ffffff" ? defaultHeroGradient : heroBgColor;

  // --- FONCTION DE TÉLÉCHARGEMENT ---
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const zip = new JSZip();
      const imgFolder = zip.folder("images");

      const processImage = async (url: string, name: string) => {
        if (!url) return "";
        if (url.startsWith('http') && !url.startsWith('blob:')) return url; 
        try {
          const res = await fetch(url);
          const blob = await res.blob();
          imgFolder?.file(name, blob); 
          return `./images/${name}`; 
        } catch (error) { 
          return ""; 
        }
      };

      const headerPath = await processImage(data.headerLogo, "logo.png");
      const footerPath = await processImage(data.footerLogo, "footer-logo.png");
      const heroPath = await processImage(data.currentImage, "hero.png");
      
      const processedProducts = await Promise.all(
        products.map(async (p: any, i: number) => ({
          ...p,
          localPath: await processImage(p.imageUrl, `product-${i}.png`)
        }))
      );

      // HTML Généré
      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${storeName}</title>
    <style>
      body { margin: 0; padding: 0; font-family: sans-serif; background-color: #f8fafc; }
      *, *::before, *::after { box-sizing: border-box; }
      
      .header-container { 
        width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 15px 5%; 
        margin: 0 !important; border: none !important; position: static !important; top: auto !important; 
      }
      .header-container ul { list-style: none; display: flex; gap: 2rem; margin: 0; padding: 0; }
      .header-container ul li a { text-decoration: none; font-weight: 600; }
      
      .hero-container { 
        width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 80px 8%; gap: 60px; overflow: hidden;
        margin: 0 !important; border: none !important; position: static !important; top: auto !important; transform: none !important;
      }
      .hero-paragraphe { flex: 1.2; }
      .hero-paragraphe h1 { font-size: clamp(2.5rem, 5vw, 4.5rem); margin: 0 0 20px 0; }
      .hero-paragraphe h2 { font-size: 1.25rem; text-transform: uppercase; margin: 0 0 25px 0; }
      .hero-paragraphe p { font-size: 1.15rem; line-height: 1.7; margin: 0 0 35px 0; }
      .hero-button { padding: 16px 36px; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; }
      .hero-image { flex: 1; display: flex; justify-content: center; max-width: 100%; }
      .hero-image img { max-width: 100%; object-fit: cover; }
      .heroTitle{
    margin-top: 10px;
    font-size: 50px;
    color: #2d3748;
    padding: 5px;
    font-weight: 700;
    text-align: center;
}
      .store-section { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  max-width: 1100px;
  margin: 0 auto;
  padding: 30px 20px;
  color: #0f172a; }
      .store-title { text-align: center; font-size: 2.5rem; color: #1e293b; margin: 0 0 50px 0; font-family: sans-serif; }
      .products-grid { margin: auto; display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 28px; }
      .product-card {  background: white;
  border: 1px solid #f1f5f9;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.025);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer; }
      .product-image-container {
  width: 100%;
  height: 220px;
  background-color: #ffffff;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #f8fafc;
}
      .product-image-container img {max-width: 100%;
  max-height: 100%;
  /* This ensures the image is fully visible and never cut off */
  object-fit: contain; 
  transition: transform 0.4s ease; }
      .product-card:hover .product-image-container img {transform: scale(1.08)}
      .product-card:hover { transform: translateY(-6px);box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)}
      .preview-buttons { padding: 40px 5%; display: flex; justify-content: center; gap: 15px;  }
      .contact-btn { padding: 12px 25px; border: none; border-radius: 8px; color: white; font-weight: 600; cursor: pointer; text-decoration: none; }
      .whatsapp-btn { background-color: #25D366; }
      .instagram-btn { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743); }
      .email-btn { background-color: #ea4335; }

      .dynamic-footer-preview { padding: 40px 8% 20px; display: flex; flex-direction: column; width: 100%; }
      .footer-main-content { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 30px; }
      .guarantees-list { list-style: none; padding: 0; }
    </style>
</head>
<body>
    <div class="header-container" style="background: ${headerBgColor}; height: ${headerHeight ? `${headerHeight}px` : 'auto'};">
        ${headerPath ? `<img src="${headerPath}" alt="Logo" style="height: ${headerLogoWidth}px;">` : `<h2>${storeName}</h2>`}
        <ul>
            <li><a href="#" style="color: ${navLinkColor};">Home</a></li>
            <li><a href="#about" style="color: ${navLinkColor};">About</a></li>
            <li><a href="#store" style="color: ${navLinkColor};">Store</a></li>
            <li><a href="#contact" style="color: ${navLinkColor};">Contact</a></li>
        </ul>
    </div>

    <div id="about" class="hero-container" style="background: ${finalHeroBg};">
        <div class="hero-paragraphe">
            <h1 style="font-family: ${titleFont}; color: ${heroTitleColor};">${heroTitle}</h1>
            <h2 style="font-family: ${subtitleFont}; color: ${subheroTitleColor};">${heroSubtitle}</h2>
            <p style="font-family: ${paragraphFont}; color: ${descColor};">${heroDescription}</p>
            <a href="#store">
                <button class="hero-button" style="background-color: ${heroBtnColor}; color: ${heroBtnTextColor};">View Menu Now</button>
            </a>
        </div>
        <div class="hero-image">
            ${heroPath ? `<img src="${heroPath}" alt="Hero Image" style="width: ${heroImgWidth}%;">` : ''}
        </div>
    </div>

    <div id="store" class="store-section">
        <h2 class="store-title">Nos Produits</h2>
        <div class="products-grid">
            ${processedProducts.map(p => `
                <div class="product-card">
                    <div class="product-image-container"><img src="${p.localPath}" alt="${p.name}"></div>
                    <div class="product-info" style="padding: 20px;">
                        <h3 style="margin: 0 0 10px 0;">${p.name}</h3>
                        <div class="price-tag"><span class="price" style="color: #059669; font-weight: bold;">${p.price} MAD</span></div>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
    <div style="background: #f8fafc;">
<h1 class="heroTitle">Order your products now!</h1>
    ${(whatsapp || instagram || email) ? `
    <div id="contact" class="preview-buttons">
        ${whatsapp ? `<a href="https://wa.me/${whatsapp}" target="_blank"><button class="contact-btn whatsapp-btn">Contact via WhatsApp</button></a>` : ''}
        ${instagram ? `<a href="https://instagram.com/${instagram}" target="_blank"><button class="contact-btn instagram-btn">Follow on Instagram</button></a>` : ''}
        ${email ? `<a href="mailto:${email}" target="_blank"><button class="contact-btn email-btn">Send an Email</button></a>` : ''}
    </div>` : ''}
</div>
    <footer class="dynamic-footer-preview" style="background: ${footerBgColor}; color: ${footerTextColor}; border-top: 1px solid ${footerTextColor}22;">
        <div class="footer-main-content">
            <div class="footer-brand-side">
                ${footerPath ? `<img src="${footerPath}" style="width: ${footerLogoWidth}px;">` : ''}
                <p class="footer-desc-text" style="color: ${footerTextColor}; margin-top: 15px;">${footerDescription}</p>
            </div>
            <div class="footer-right-side">
                <h4 style="color: ${footerTextColor}; margin: 0 0 15px 0;">${guaranteeTitle}</h4>
                <ul class="guarantees-list" style="margin: 0; display: flex; flex-direction: column; gap: 8px;">
                    <li style="color: ${footerTextColor};">${guarantee1}</li>
                    <li style="color: ${footerTextColor};">${guarantee2}</li>
                    <li style="color: ${footerTextColor};">${guarantee3}</li>
                </ul>
            </div>
        </div>
        <div class="footer-copyright-bar" style="border-top-color: ${footerTextColor}22; text-align: center; margin-top: 40px; padding-top: 20px;">
            <p>&copy; ${new Date().getFullYear()} ${storeName}. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`;

      zip.file("index.html", htmlContent);
      const content = await zip.generateAsync({ type: "blob" });
      
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = `${storeName.toLowerCase().replace(/\s+/g, '-')}-store.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

    } catch (error) {
      console.error("Failed to generate ZIP:", error);
      alert("Something went wrong while generating your store.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#f1f5f9", minHeight: "100vh", paddingBottom: "50px" }}>
      
      <style>
        {`
          .anti-gap-preview .header-container, 
          .anti-gap-preview .hero-container {
            margin: 0 !important;
            border: none !important;
            position: static !important;
            top: auto !important;
            transform: none !important;
          }
        `}
      </style>

      {/* BARRE DU BUILDER */}
      <div style={{ padding: "20px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 1000 }}>
        <h2 style={{ margin: 0, color: "#1e293b" }}>Final Step: Your Store Preview</h2>
        <button 
          onClick={handleDownload}
          disabled={isDownloading}
          style={{ 
            padding: "12px 25px", background: isDownloading ? "#94a3b8" : "#10b981", 
            color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", 
            cursor: isDownloading ? "not-allowed" : "pointer"
          }}
        >
          {isDownloading ? "Zipping your store..." : "Download Store (ZIP)"}
        </button>
      </div>

      {/* --- PREVIEW DU SITE --- */}
      <div 
        className="anti-gap-preview"
        style={{ 
          maxWidth: "1200px", 
          margin: "40px auto", 
          background: "#fff", 
          boxShadow: "0 15px 35px rgba(0,0,0,0.1)", 
          borderRadius: "10px", 
          overflow: "hidden",       
          display: "block", 
        }}
      >
        
        {/* HEADER EXACT */}
        <div className="header-container" style={{ 
          background: headerBgColor, 
          height: headerHeight ? `${headerHeight}px` : undefined,
          width: "100%",          
          boxSizing: "border-box"
        }}>
          {data.headerLogo && <img src={data.headerLogo} alt="Logo" style={{ height: `${headerLogoWidth}px`, transition: 'height 0.2s ease' }} />}
          <ul style={{ margin: 0, padding: 0 }}>
            <li><a href="#home" style={{ color: navLinkColor }}>Home</a></li>
            <li><a href="#about" style={{ color: navLinkColor }}>About</a></li>
            <li><a href="#store" style={{ color: navLinkColor }}>Store</a></li>
            <li><a href="#contact" style={{ color: navLinkColor }}>Contact</a></li>
          </ul>
        </div>

        {/* HERO EXACT AVEC LE DÉGRADÉ PAR DÉFAUT */}
        <div className="hero-container" style={{ 
          background: finalHeroBg, /* <-- ICI EST LA MAGIE DU DÉGRADÉ */
          width: "100%",          
          boxSizing: "border-box",
          overflow: "hidden",    
        }}>
          <div className="hero-paragraphe">
            <h1 style={{ fontFamily: titleFont, color: heroTitleColor, margin: "0 0 20px 0" }}>{heroTitle}</h1>
            <h2 style={{ fontFamily: subtitleFont, color: subheroTitleColor, margin: "0 0 25px 0" }}>{heroSubtitle}</h2>
            <p style={{ fontFamily: paragraphFont, color: descColor, margin: "0 0 35px 0" }}>{heroDescription}</p>
            <button className="hero-button" style={{ backgroundColor: heroBtnColor, color: heroBtnTextColor }}>View Menu Now</button>
          </div>
          <div className="hero-image" style={{ maxWidth: "100%" }}>
            {data.currentImage && <img src={data.currentImage} alt="Hero" style={{ width: `${heroImgWidth}%`, maxWidth: "100%", objectFit: "cover" }} />}
          </div>
        </div>

        {/* STORE EXACT */}
        <div style={{ backgroundColor: "#ffffff", padding: "80px 5%", boxSizing: "border-box", width: "100%" }}>
          <h2 style={{ textAlign: "center", fontSize: "2.5rem", color: "#1e293b", margin: "0 0 50px 0", fontFamily: "sans-serif" }}>Nos Produits</h2>
          <div className="products-grid" style={{ padding: 0 }}>
            {products.map((product: any) => (
              <div key={product.id} className="product-card" style={{ backgroundColor: "#fff" }}>
                <div className="product-image-container">
                  <img src={product.imageUrl} alt={product.name} style={{ maxWidth: "100%", objectFit: "contain" }} />
                </div>
                <div className="product-info" style={{ padding: "20px" }}>
                  <h3 style={{ margin: "0 0 10px 0" }}>{product.name}</h3>
                  <div className="price-tag">
                    <span className="price" style={{ color: "#059669", fontWeight: "bold" }}>{product.price} MAD</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONTACT EXACT */}
        <div style={{ background: "#f8fafc" }}>
       <h1 className="heroTitle">Order your products now!</h1>
        {(whatsapp || instagram || email) && (
          <div className="preview-buttons" style={{ padding: "40px 5%", display: "flex", justifyContent: "center", gap: "15px", flexDirection: "row", backgroundColor: "#f8fafc", boxSizing: "border-box", width: "100%" }}>
             
            {whatsapp && <button className="contact-btn whatsapp-btn">Contact via WhatsApp</button>}
            {instagram && <button className="contact-btn instagram-btn">Follow on Instagram</button>}
            {email && <button className="contact-btn email-btn">Send an Email</button>}
          </div>
          
        )}
</div>
        {/* FOOTER EXACT */}
        <footer className="dynamic-footer-preview" style={{ 
          background: footerBgColor, 
          color: footerTextColor, 
          borderTop: `1px solid ${footerTextColor}22`,
          padding: "40px 5% 20px",
          boxSizing: "border-box",
          width: "100%"
        }}>
          <div className="footer-main-content">
            <div className="footer-brand-side">
              <div className="footer-logo-wrapper">
                {data.footerLogo && <img src={data.footerLogo} alt="Logo" style={{ width: `${footerLogoWidth}px`, objectFit: 'contain' }} />}
              </div>
              <p className="footer-desc-text" style={{ color: footerTextColor, margin: "15px 0 0 0" }}>{footerDescription}</p>
            </div>
            
            <div className="footer-right-side">
              <h4 style={{ color: footerTextColor, margin: "0 0 15px 0" }}>{guaranteeTitle}</h4>
              <ul className="guarantees-list" style={{ margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                <li style={{ color: footerTextColor }}>{guarantee1}</li>
                <li style={{ color: footerTextColor }}>{guarantee2}</li>
                <li style={{ color: footerTextColor }}>{guarantee3}</li>
              </ul>
            </div>
          </div>
          <div className="footer-copyright-bar" style={{ borderTopColor: `${footerTextColor}22`, textAlign: "center", marginTop: "40px", paddingTop: "20px" }}>
            <p>&copy; {new Date().getFullYear()} {storeName}. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default FinalPreview;