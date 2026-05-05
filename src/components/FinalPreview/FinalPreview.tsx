import  { useState } from "react";
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
  
  // --- NOUVEAUX STATES POUR LE DEPLOIEMENT ---
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [siteName, setSiteName] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployUrl, setDeployUrl] = useState("");
  const [deployError, setDeployError] = useState("");

  // --- VALEURS PAR DÉFAUT ---
  const headerBgColor = data.headerBgColor || "#ffffff";
  const headerHeight = data.headerHeight || "";
  const navLinkColor = data.navLinkColor || "#444";
  const headerLogoWidth = data.headerLogoWidth || 100;
  const headerBorderColor = data.headerBorderColor || "#e2e8f0";

  const productImageBgColor = data.productImageBgColor || "#ffffff";
  const inventoryBgColor = data.inventoryBgColor || "#ffffff";
  const productCardBgColor = data.productCardBgColor || "#ffffff";
  const productNameColor = data.productNameColor || "#111827";
  const productNameFontFamily = data.productNameFontFamily || "inherit";
  const productPriceColor = data.productPriceColor || "#111827";
  
  const heroBgColor = data.heroBgColor || "#ffffff";
  const heroTitleColor = data.heroTitleColor || "#1f2937";
  const subheroTitleColor = data.subheroTitleColor || "#4f46e5";
  const descColor = data.descColor || "#4b5563";
  const heroBtnColor = data.heroBtnColor || "#6366f1";
  const heroBtnTextColor = data.heroBtnTextColor || "#ffffff";
  const heroBorderColor = data.heroBorderColor || "";
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

  // --- BACKGROUND CONTACT ---
  const contactBgColor = data.contactBgColor || "#f8fafc"; 

  const defaultHeroGradient = `radial-gradient(circle at 0% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(244, 114, 182, 0.15) 0%, transparent 50%), #ffffff`;
  const finalHeroBg = heroBgColor === "#ffffff" ? defaultHeroGradient : heroBgColor;

  // --- FONCTION EXTRAITE POUR GÉNÉRER LE ZIP ---
  const generateStoreZip = async () => {
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

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="512x512" href="${headerPath}" /> 
    <title>${storeName}</title>
    <style>
      body { margin: 0; padding: 0; font-family: sans-serif; background-color: #f8fafc; }
      *, *::before, *::after { box-sizing: border-box; }
      
      .header-container { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 15px 5%; margin: 0 !important; border: none !important; position: static !important; top: auto !important; }
      .header-container ul { list-style: none; display: flex; gap: 2rem; margin: 0; padding: 0; }
      .header-container ul li a { text-decoration: none; font-weight: 600; }
      
      .hero-container { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 80px 8%; gap: 60px; overflow: hidden; margin: 0 !important; position: static !important; top: auto !important; transform: none !important; box-sizing: border-box; }
      .hero-paragraphe { flex: 1.2; }
      .hero-paragraphe h1 { font-size: clamp(2.5rem, 5vw, 4.5rem); margin: 0 0 20px 0; }
      .hero-paragraphe h2 { font-size: 1.25rem; text-transform: uppercase; margin: 0 0 25px 0; }
      .hero-paragraphe p { font-size: 1.15rem; line-height: 1.7; margin: 0 0 35px 0; }
      .hero-button { padding: 16px 36px; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; transition: transform 0.3s ease; }
      .hero-button:hover { transform: scale(1.05); }
      
      /* --- FIX 2: Hero Image Animation --- */
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
        100% { transform: translateY(0px); }
      }
      .hero-image { flex: 1; display: flex; justify-content: center; max-width: 100%; }
      .hero-image img { 
        max-width: 100%; 
        object-fit: cover; 
        animation: float 4s ease-in-out infinite; /* Added Floating Animation */
      }
      
      .heroTitle{ margin-top: 10px; font-size: 50px; color: #2d3748; padding: 5px; font-weight: 700; text-align: center; }
      .store-section { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; width: 100%; margin: 0 auto; padding: 30px 20px; color: #0f172a; }
      .store-title { text-align: center; font-size: 2.5rem; color: #1e293b; margin: 0 0 50px 0; font-family: sans-serif; }
      .products-grid { margin: auto; display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 28px; justify-content: center; }
      .product-card { background: white; border: 1px solid #f1f5f9; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.025); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; }
      .product-image-container { width: 100%; height: 220px; background-color: #ffffff; padding: 20px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid #f8fafc; }
      .product-image-container img { max-width: 100%; max-height: 100%; object-fit: contain; transition: transform 0.4s ease; }
      .product-card:hover .product-image-container img {transform: scale(1.08)}
      .product-card:hover { transform: translateY(-6px);box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)}
      
      /* --- FIX 3: Contact Buttons Hover Animations --- */
      .preview-buttons { padding: 40px 5%; display: flex; justify-content: center; gap: 15px; }
      .contact-btn { 
        padding: 12px 25px; 
        border: none; 
        border-radius: 8px; 
        color: white; 
        font-weight: 600; 
        cursor: pointer; 
        text-decoration: none; 
        transition: all 0.3s ease; /* Added transition */
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      }
      .contact-btn:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 15px rgba(0,0,0,0.2);
      }
      .whatsapp-btn { background-color: #25D366; }
      .whatsapp-btn:hover { background-color: #1ebd5a; }
      
      .instagram-btn { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743); }
      .instagram-btn:hover { filter: brightness(1.1); }
      
      .email-btn { background-color: #ea4335; }
      .email-btn:hover { background-color: #d6382b; }

      .dynamic-footer-preview { padding: 20px 5% 15px; display: flex; flex-direction: column; width: 100%; align-items: center; }
      .footer-main-content { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 20px; width: 100%; max-width: 1100px; margin: 0 auto; }
      .footer-brand-side { max-width: 350px; }
      .footer-brand-side img { max-width: 100%; max-height: 70px; object-fit: contain; }
      .footer-right-side { max-width: 300px; }
      .guarantees-list { list-style: none; padding: 0; }
      .footer-copyright-bar { width: 100%; max-width: 1100px; margin: 20px auto 0; padding-top: 15px; text-align: center; border-top-width: 1px; border-top-style: solid; }
    </style>
</head>
<body>
    <div class="header-container" style="background: ${headerBgColor};border: ${headerBorderColor ? `2px solid ${headerBorderColor}` : 'none'}; height: ${headerHeight ? `${headerHeight}px` : 'auto'};">
        ${headerPath ? `<img src="${headerPath}" alt="Logo" style="height: ${headerLogoWidth}px;">` : `<h2>${storeName}</h2>`}
        <ul>
            <li><a href="#" style="color: ${navLinkColor};">Home</a></li>
            <li><a href="#about" style="color: ${navLinkColor};">About</a></li>
            <li><a href="#store" style="color: ${navLinkColor};">Store</a></li>
            <li><a href="#contact" style="color: ${navLinkColor};">Contact</a></li>
        </ul>
    </div>

    <!-- FIX 1: Added single quotes around font-family variables so spaces don't break the CSS -->
    <div id="about" class="hero-container" style="background: ${finalHeroBg}; border: ${heroBorderColor ? `2px solid ${heroBorderColor}` : 'none'}; box-sizing: border-box;">
        <div class="hero-paragraphe">
            <h1 style="font-family: '${titleFont}'; color: ${heroTitleColor};">${heroTitle}</h1>
            <h2 style="font-family: '${subtitleFont}'; color: ${subheroTitleColor};">${heroSubtitle}</h2>
            <p style="font-family: '${paragraphFont}'; color: ${descColor};">${heroDescription}</p>
            <a href="#store">
                <button class="hero-button" style="background-color: ${heroBtnColor}; color: ${heroBtnTextColor};">View Menu Now</button>
            </a>
        </div>
        <div class="hero-image">
            ${heroPath ? `<img src="${heroPath}" alt="Hero Image" style="width: ${heroImgWidth}%;">` : ''}
        </div>
    </div>

    <div id="store" class="store-section" style="background-color: ${inventoryBgColor};">
        <h2 class="store-title">Nos Produits</h2>
        <center><div class="products-grid">
            ${processedProducts.map(p => `
                <div class="product-card" >
                    <div class="product-image-container" style="background-color: ${productImageBgColor};">
                        <img src="${p.localPath}" alt="${p.name}">
                    </div>
                    <div class="product-info" style="padding: 20px; background-color: ${productCardBgColor};" >
                        <h3 style="margin: 0 0 10px 0; color: ${productNameColor}; font-family: '${productNameFontFamily}';">${p.name}</h3>
                        <div class="price-tag"><span class="price" style="color: ${productPriceColor}; font-weight: bold;">${p.price} MAD</span></div>
                    </div>
                </div>
            `).join('')}
        </div></center>
    </div>

    <div style="background: ${contactBgColor};">
        <h1 class="heroTitle" style="margin:0; padding-top: 40px;">Order your products now!</h1>
        ${(whatsapp || instagram || email) ? `
        <div id="contact" class="preview-buttons">
            ${whatsapp ? `<a href="https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}" target="_blank"><button class="contact-btn whatsapp-btn">Contact via WhatsApp</button></a>` : ''}
            ${instagram ? `<a href="https://instagram.com/${instagram.replace('@', '')}" target="_blank"><button class="contact-btn instagram-btn">Follow on Instagram</button></a>` : ''}
            ${email ? `<a href="mailto:${email}" target="_blank"><button class="contact-btn email-btn">Send an Email</button></a>` : ''}
        </div>` : ''}
    </div>

    <footer class="dynamic-footer-preview" style="background: ${footerBgColor}; color: ${footerTextColor}; border-top: 1px solid ${footerTextColor}22;">
        <div class="footer-main-content">
            <div class="footer-brand-side">
                ${footerPath ? `<img src="${footerPath}" style="width: ${footerLogoWidth}px; max-height: 70px; object-fit: contain;">` : ''}
                <p class="footer-desc-text" style="color: ${footerTextColor}; margin-top: 10px; margin-bottom: 0; line-height: 1.4;">${footerDescription}</p>
            </div>
            <div class="footer-right-side">
                <h4 style="color: ${footerTextColor}; margin: 0 0 10px 0;">${guaranteeTitle}</h4>
                <ul class="guarantees-list" style="margin: 0; display: flex; flex-direction: column; gap: 5px;">
                    <li style="color: ${footerTextColor};">${guarantee1}</li>
                    <li style="color: ${footerTextColor};">${guarantee2}</li>
                    <li style="color: ${footerTextColor};">${guarantee3}</li>
                </ul>
            </div>
        </div>
        <div class="footer-copyright-bar" style="border-top-color: ${footerTextColor}22;">
            <p style="margin: 0;">&copy; ${new Date().getFullYear()} ${storeName}. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`;

    zip.file("index.html", htmlContent);
    return await zip.generateAsync({ type: "blob" });
  };

  // --- ANCIENNE FONCTION: TÉLÉCHARGER LE ZIP ---
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const content = await generateStoreZip();
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

  // --- NOUVELLE FONCTION: DÉPLOYER VERS LE BACKEND ---
  const handleDeploySubmit = async () => {
    if (!siteName) return;
    
    setIsDeploying(true);
    setDeployError("");
    setDeployUrl("");

    try {
      // 1. Generate the ZIP blob
      const contentBlob = await generateStoreZip();

      // 2. Prepare FormData
      const formData = new FormData();
      formData.append('storeZip', contentBlob, 'store.zip');

      // 3. Send to Node.js Backend
      const response = await fetch(`http://localhost:3000/api/deploy?name=${siteName}`, {
        method: 'POST',
        body: formData, 
      });

      const result = await response.json();
      console.log("Server response:", result);

      if (result.success) {
        const finalUrl = result.liveUrl || `https://${siteName}.netlify.app`;
        setDeployUrl(finalUrl);
      } else {
        setDeployError(result.message || "Failed to deploy. The name might be taken.");
      }
    } catch (error) {
      console.error("Deployment failed:", error);
      setDeployError("Server error. Make sure your backend is running.");
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#f1f5f9", minHeight: "100vh", paddingBottom: "50px" }}>
      
      <style>
        {`
          .anti-gap-preview .header-container, 
          .anti-gap-preview .hero-container { margin: 0 !important; position: static !important; top: auto !important; transform: none !important; }
        `}
      </style>

      {/* --- MODAL DE DÉPLOIEMENT --- */}
      {showDeployModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999 }}>
          <div style={{ background: "#fff", padding: "30px", borderRadius: "12px", width: "400px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}>
            
            {!deployUrl ? (
              /* --- ÉTAPE 1 : FORMULAIRE DE CHOIX DU NOM --- */
              <>
                <h3 style={{ marginTop: 0, color: "#1e293b" }}>Deploy to Netlify</h3>
                <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "20px" }}>
                  Choose a unique store name. It will be hosted at <br/><b>https://{siteName || "[name]"}.netlify.app</b>
                </p>
                
                <input 
                  type="text" 
                  placeholder="e.g. my-awesome-urstore" 
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))} 
                  style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", marginBottom: "15px", boxSizing: "border-box", fontSize: "16px" }}
                />

                {deployError && <p style={{ color: "#ef4444", fontSize: "14px", marginTop: 0 }}>{deployError}</p>}
                
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
                  <button 
                    onClick={() => { setShowDeployModal(false); setDeployError(""); setSiteName(""); }}
                    style={{ padding: "10px 18px", background: "transparent", border: "1px solid #cbd5e1", borderRadius: "8px", cursor: "pointer", fontWeight: "600", color: "#64748b" }}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleDeploySubmit}
                    disabled={isDeploying || !siteName}
                    style={{ padding: "10px 18px", background: isDeploying ? "#94a3b8" : "#3b82f6", color: "#fff", border: "none", borderRadius: "8px", cursor: isDeploying || !siteName ? "not-allowed" : "pointer", fontWeight: "600" }}
                  >
                    {isDeploying ? "Deploying..." : "Deploy Now"}
                  </button>
                </div>
              </>
            ) : (
              /* --- ÉTAPE 2 : ÉCRAN DE SUCCÈS --- */
              <div style={{ textAlign: "center", padding: "10px 0" }}>
                <div style={{ fontSize: "60px", marginBottom: "10px" }}>🎉</div>
                <h2 style={{ color: "#10b981", margin: "0 0 10px 0" }}>Deployed Successfully!</h2>
                <p style={{ color: "#64748b", fontSize: "15px", marginBottom: "25px" }}>
                  Your store is now live on the internet.
                </p>

                <a 
                  href={deployUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ 
                    display: "block", width: "100%", padding: "15px", background: "#f1f5f9", 
                    border: "2px dashed #cbd5e1", borderRadius: "8px", color: "#3b82f6", 
                    fontWeight: "bold", textDecoration: "none", marginBottom: "25px", 
                    boxSizing: "border-box", wordBreak: "break-all" 
                  }}
                >
                  {deployUrl}
                </a>

                <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                  <button 
                    onClick={() => { setShowDeployModal(false); setDeployUrl(""); setSiteName(""); }}
                    style={{ flex: 1, padding: "12px", background: "#e2e8f0", color: "#475569", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
                  >
                    Close
                  </button>
                  <a href={deployUrl} target="_blank" rel="noreferrer" style={{ flex: 1, textDecoration: "none" }}>
                    <button style={{ width: "100%", padding: "12px", background: "#10b981", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
                      Visit Store ➔
                    </button>
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* BARRE DU BUILDER MODIFIÉE POUR INCLURE LE BOUTON DEPLOY */}
      <div style={{ padding: "20px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 1000 }}>
        <h2 style={{ margin: 0, color: "#1e293b" }}></h2>
        <h1 className="heroTitle"><span>Final Step:</span> Your Store Preview</h1>
        <div style={{ display: "flex", gap: "15px" }}>
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            style={{ 
              padding: "12px 25px", background: isDownloading ? "#94a3b8" : "#10b981", 
              color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", 
              cursor: isDownloading ? "not-allowed" : "pointer"
            }}
          >
            {isDownloading ? "Zipping..." : "Download (ZIP)"}
          </button>

          <button 
            onClick={() => setShowDeployModal(true)}
            style={{ 
              padding: "12px 25px", background: "#3b82f6", 
              color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", 
              cursor: "pointer", boxShadow: "0 4px 6px -1px rgba(59, 130, 246, 0.5)"
            }}
          >
            🚀 Deploy to Web
          </button>
        </div>
      </div>

      {/* --- PREVIEW DU SITE --- */}
      <div className="anti-gap-preview" style={{ maxWidth: "1200px", margin: "40px auto", background: "#fff", boxShadow: "0 15px 35px rgba(0,0,0,0.1)", borderRadius: "10px", overflow: "hidden", display: "block" }}>
        
        <div className="header-container" style={{ background: headerBgColor,border: headerBorderColor ? `2px solid ${headerBorderColor}` : "none" , height: headerHeight ? `${headerHeight}px` : undefined, width: "100%", boxSizing: "border-box" }}>
          {data.headerLogo && <img src={data.headerLogo} alt="Logo" style={{ height: `${headerLogoWidth}px`, transition: 'height 0.2s ease' }} />}
          <ul style={{ margin: 0, padding: 0 }}>
            <li><a href="#home" style={{ color: navLinkColor }}>Home</a></li>
            <li><a href="#about" style={{ color: navLinkColor }}>About</a></li>
            <li><a href="#store" style={{ color: navLinkColor }}>Store</a></li>
            <li><a href="#contact" style={{ color: navLinkColor }}>Contact</a></li>
          </ul>
        </div>

        <div className="hero-container" style={{ background: finalHeroBg, width: "100%", boxSizing: "border-box", overflow: "hidden", border: heroBorderColor ? `2px solid ${heroBorderColor}` : "none" }}>
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

        <div style={{ backgroundColor: inventoryBgColor, padding: "80px 5%", boxSizing: "border-box", width: "100%" }}>
          <h2 style={{ textAlign: "center", fontSize: "2.5rem", color: "#1e293b", margin: "0 0 50px 0", fontFamily: "sans-serif" }}>Nos Produits</h2>
          <div className="products-grid" style={{ padding: 0 }}>
            {products.map((product: any) => (
              <div key={product.id} className="product-card" style={{ backgroundColor: productCardBgColor }}>
                <div className="product-image-container" style={{ backgroundColor: productImageBgColor }}>
                  <img src={product.imageUrl} alt={product.name} style={{ maxWidth: "100%", objectFit: "contain" }} />
                </div>
                <div className="product-info" style={{ padding: "20px" }}>
                  <h3 style={{ margin: "0 0 10px 0", color: productNameColor, fontFamily: productNameFontFamily }}>{product.name}</h3>
                  <div className="price-tag">
                    <span className="price" style={{ color: productPriceColor, fontWeight: "bold" }}>{product.price} MAD</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: contactBgColor }}>
       <center><h1 style={{ textAlign: "center", fontSize: "2.5rem", color: "#1e293b", margin: "0 0 50px 0", fontFamily: "sans-serif" }}>Order your products now!</h1></center>
        {(whatsapp || instagram || email) && (
          <div className="preview-buttons" style={{ padding: "40px 5%", display: "flex", justifyContent: "center", gap: "15px", flexDirection: "row", backgroundColor: contactBgColor, boxSizing: "border-box", width: "100%" }}>
            {whatsapp && <button className="contact-btn whatsapp-btn">Contact via WhatsApp</button>}
            {instagram && <button className="contact-btn instagram-btn">Follow on Instagram</button>}
            {email && <button className="contact-btn email-btn">Send an Email</button>}
          </div>
        )}
        </div>
        
        {/* CORRECTION DU FOOTER : Centrage avec max-width et max-height sur l'image */}
        <footer className="dynamic-footer-preview" style={{ background: footerBgColor, color: footerTextColor, borderTop: `1px solid ${footerTextColor}22`, padding: "20px 5% 15px", boxSizing: "border-box", width: "100%", alignItems: "center" }}>
          <div className="footer-main-content" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "20px", width: "100%", maxWidth: "1100px", margin: "0 auto" }}>
            <div className="footer-brand-side" style={{ maxWidth: "350px" }}>
              <div className="footer-logo-wrapper">
                {data.footerLogo && <img src={data.footerLogo} alt="Logo" style={{ width: `${footerLogoWidth}px`, maxHeight: "70px", maxWidth: "100%", objectFit: 'contain' }} />}
              </div>
              <p className="footer-desc-text" style={{ color: footerTextColor, margin: "10px 0 0 0", lineHeight: 1.4 }}>{footerDescription}</p>
            </div>
            
            <div className="footer-right-side" style={{ maxWidth: "300px" }}>
              <h4 style={{ color: footerTextColor, margin: "0 0 10px 0" }}>{guaranteeTitle}</h4>
              <ul className="guarantees-list" style={{ margin: 0, display: "flex", flexDirection: "column", gap: "5px", padding: 0, listStyle: "none" }}>
                <li style={{ color: footerTextColor }}>{guarantee1}</li>
                <li style={{ color: footerTextColor }}>{guarantee2}</li>
                <li style={{ color: footerTextColor }}>{guarantee3}</li>
              </ul>
            </div>
          </div>
          <div className="footer-copyright-bar" style={{ borderTopColor: `${footerTextColor}22`, borderTopWidth: "1px", borderTopStyle: "solid", width: "100%", maxWidth: "1100px", textAlign: "center", margin: "20px auto 0", paddingTop: "15px" }}>
            <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} {storeName}. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default FinalPreview;