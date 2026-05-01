import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './StoreStep.css';
import useStore from '../../useStore';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

// Modern font options
const fontFamilies = [
  "Poppins, sans-serif",
  "Montserrat, sans-serif",
  "Inter, sans-serif",
  "Roboto, sans-serif",
  "Arial, sans-serif",
  "Helvetica, sans-serif",
  "Times New Roman, serif",
  "Georgia, serif",
];

export default function StoreStep() {
  const setField = useStore((state) => state.setField);
  
  // --- Existing Product State ---
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [imagePreview, setImagePreview] = useState<string>('');
  
  // --- New Styling State Variables ---
  const [productImageBgColor, setProductImageBgColor] = useState('#ffffff'); // The white background behind the product picture
  const [inventoryBgColor, setInventoryBgColor] = useState('#ffffff'); // Background for the inventory container
  const [productCardBgColor, setProductCardBgColor] = useState('#ffffff'); // Bottom part of the card
  const [productNameColor, setProductNameColor] = useState('#1f2937'); // Dark gray
  const [productNameFontFamily, setProductNameFontFamily] = useState(fontFamilies[0]);
  const [productPriceColor, setProductPriceColor] = useState('#4f46e5'); // Indigo
  const [isStyleFormLocked, setIsStyleFormLocked] = useState(true); // Initially locked

  // --- Handlers ---
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmitProduct = (e: FormEvent) => {
    e.preventDefault();
    if (!name || price === '' || !imagePreview) return;
    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      price: Number(price),
      imageUrl: imagePreview,
    };
    setProducts([...products, newProduct]);
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setName('');
    setPrice('');
    setImagePreview('');
  };

  // Logic to unlock the customization form
  const handleUnlockStyleForm = () => {
    setIsStyleFormLocked(false);
  };

  // Submit handler for the styling form
  const handleSubmitStyle = (e: FormEvent) => {
    e.preventDefault();
    // Save style choices to the store.
    setField("productImageBgColor", productImageBgColor);
    setField("inventoryBgColor", inventoryBgColor); 
    setField("productCardBgColor", productCardBgColor);
    setField("productNameColor", productNameColor);
    setField("productNameFontFamily", productNameFontFamily);
    setField("productPriceColor", productPriceColor);
    alert("Style settings saved!"); // Simple confirmation
  };

  // --- useStore Persistence Effects ---
  useEffect(() => { setField("products", products); }, [products]);
  useEffect(() => { setField("isModalOpen", isModalOpen); }, [isModalOpen]);
  useEffect(() => { setField("name", name); }, [name]);
  useEffect(() => { setField("price", price); }, [price]);
  useEffect(() => { setField("imagePreview", imagePreview); }, [imagePreview]);

  // Persist style fields
  useEffect(() => { setField("productImageBgColor", productImageBgColor); }, [productImageBgColor]);
  useEffect(() => { setField("inventoryBgColor", inventoryBgColor); }, [inventoryBgColor]);
  useEffect(() => { setField("productCardBgColor", productCardBgColor); }, [productCardBgColor]);
  useEffect(() => { setField("productNameColor", productNameColor); }, [productNameColor]);
  useEffect(() => { setField("productNameFontFamily", productNameFontFamily); }, [productNameFontFamily]);
  useEffect(() => { setField("productPriceColor", productPriceColor); }, [productPriceColor]);


  // Dynamic styles to apply via inline styling
  const inventoryWrapperStyles = {
    backgroundColor: inventoryBgColor,
  };

  const productCardStyles = {
    backgroundColor: productCardBgColor,
  };

  return (
    <div className="store-step-wrapper">
      <h1 className="heroTitle"><span>Step3:</span> Customize Your Store</h1>
      
      <div className="store-step-layout">
        
        {/* Left: Store Inventory & Grid */}
        <div className="store-inventory-wrapper" style={inventoryWrapperStyles}>
          <div className="store-header">
            <div>
              <h2>Store Inventory</h2>
              <p className="subtitle">Manage your UrStore products and catalog.</p>
            </div>
            <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
              <span className="plus-icon">+</span> Add Product
            </button>
          </div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🛍️</div>
              <h3>Your store is looking a bit empty</h3>
              <p>Add your first product to start building your catalog.</p>
              <button className="btn-secondary mt-3" onClick={() => setIsModalOpen(true)}>
                Add First Product
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card" style={productCardStyles}>
                  {/* Inline style for the product image background color */}
                  <div className="product-image-container" style={{ backgroundColor: productImageBgColor }}>
                    <img src={product.imageUrl} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h3 style={{ color: productNameColor, fontFamily: productNameFontFamily }}>
                      {product.name}
                    </h3>
                    <div className="price-tag">
                      <span className="price" style={{ color: productPriceColor }}>
                        {product.price.toFixed(2)} MAD
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- Right: Customization Form (Style Panel) --- */}
        <div className={`store-customization-panel ${isStyleFormLocked ? 'is-locked' : ''}`}>
          <h3>🎨 Store Styling</h3>
          <form onSubmit={handleSubmitStyle}>
            
            {/* UPDATED: Product Background Color */}
           

            <div className="form-group">
              <label htmlFor="inventoryBgColor">Inventory Container Background Color:</label>
              <input 
                type="color" 
                id="inventoryBgColor" 
                value={inventoryBgColor} 
                onChange={(e) => setInventoryBgColor(e.target.value)}
                disabled={isStyleFormLocked}
                className="color-picker-custom"
              />
            </div>
             <div className="form-group">
              <label htmlFor="productImageBgColor">Change product background color:</label>
              <input 
                type="color" 
                id="productImageBgColor" 
                value={productImageBgColor} 
                onChange={(e) => setProductImageBgColor(e.target.value)}
                disabled={isStyleFormLocked}
                className="color-picker-custom"
              />
            </div>

            <div className="form-group">
              <label htmlFor="productCardBgColor">Product Card Background Color:</label>
              <input 
                type="color" 
                id="productCardBgColor" 
                value={productCardBgColor} 
                onChange={(e) => setProductCardBgColor(e.target.value)}
                disabled={isStyleFormLocked}
                className="color-picker-custom"
              />
            </div>

            <div className="form-group">
              <label htmlFor="productNameColor">Product Name Color:</label>
              <input 
                type="color" 
                id="productNameColor" 
                value={productNameColor} 
                onChange={(e) => setProductNameColor(e.target.value)}
                disabled={isStyleFormLocked}
                className="color-picker-custom"
              />
            </div>

            <div className="form-group">
              <label htmlFor="productNameFontFamily">Product Name Font:</label>
              <select 
                id="productNameFontFamily" 
                value={productNameFontFamily} 
                onChange={(e) => setProductNameFontFamily(e.target.value)}
                disabled={isStyleFormLocked}
              >
                {fontFamilies.map(font => (
                  <option key={font} value={font} style={{ fontFamily: font }}>{font.split(',')[0]}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="productPriceColor">Product Price Color:</label>
              <input 
                type="color" 
                id="productPriceColor" 
                value={productPriceColor} 
                onChange={(e) => setProductPriceColor(e.target.value)}
                disabled={isStyleFormLocked}
                className="color-picker-custom"
              />
            </div>

            <button type="submit" className="btn-success mt-4" disabled={isStyleFormLocked}>
              Save Style
            </button>
            
          </form>
          
          {isStyleFormLocked && (
            <div className="lock-overlay">
              <span>Locked. Click "Add Style to Your Store" below to edit.</span>
            </div>
          )}
        </div>
      </div>
<div className="save-store-btn-container">
        {isStyleFormLocked ? (
          <center>
            <button className='save-store-btn unlock-btn' type="button" onClick={handleUnlockStyleForm}>
              Add Style to Your Store
            </button>
          </center>
        ) : (
          <Link to="/contact-step">
            <center>
              <button className='save-store-btn' type="button">
                Save store and Continue
              </button>
            </center>
          </Link>
        )}
      </div>

      {/* --- Existing Add Product Modal --- */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Product</h3>
              <button className="close-btn" onClick={closeModal}>&times;</button>
            </div>
            
            <form onSubmit={handleSubmitProduct}>
              <div className="form-group">
                <label htmlFor="productName">Product Name</label>
                <input
                  type="text"
                  id="productName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Wireless Headphones"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="productPrice">Price (MAD)</label>
                <div className="input-with-currency">
                  <input
                    type="number"
                    id="productPrice"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                  <span className="currency-suffix">MAD</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="productImage">Product Image</label>
                <div className="file-upload-wrapper">
                  <input
                    type="file"
                    id="productImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    required={!imagePreview}
                  />
                </div>
                {imagePreview && (
                  <div className="image-preview-container">
                    <img src={imagePreview} alt="Preview" className="image-preview" />
                  </div>
                )}
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-ghost" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Publish Product
                </button>
              </div>
            </form>
            
          </div>
          
        </div>
        
      )}

      {/* --- Re-worked Save Store Button with dynamic logic --- */}
      

    </div>
  );
}