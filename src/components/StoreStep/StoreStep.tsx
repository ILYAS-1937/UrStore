import { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import styles from './StoreStep.module.css'; // Changed to CSS Module import
import useStore from '../../useStore';

// Assuming these images exist in the same directory as this file
import editIcon from '../../images/edit.png';
import deleteIcon from '../../images/delete.png';

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
  const data = useStore((state) => state.data) || {}; // <-- Pull saved data
  
  // --- Existing Product State ---
  const [products, setProducts] = useState<Product[]>(data.products || []);
  const [isModalOpen, setIsModalOpen] = useState(data.isModalOpen || false);
  const [name, setName] = useState(data.name || '');
  const [price, setPrice] = useState<number | ''>(data.price || '');
  const [imagePreview, setImagePreview] = useState<string>(data.imagePreview || '');
  
  // --- New State for Editing ---
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // --- New Styling State Variables ---
  const [productImageBgColor, setProductImageBgColor] = useState(data.productImageBgColor || '#ffffff'); 
  const [inventoryBgColor, setInventoryBgColor] = useState(data.inventoryBgColor || '#ffffff'); 
  const [productCardBgColor, setProductCardBgColor] = useState(data.productCardBgColor || '#ffffff'); 
  const [productNameColor, setProductNameColor] = useState(data.productNameColor || '#1f2937'); 
  const [productNameFontFamily, setProductNameFontFamily] = useState(data.productNameFontFamily || fontFamilies[0]);
  const [productPriceColor, setProductPriceColor] = useState(data.productPriceColor || '#4f46e5'); 
  const [isStyleFormLocked, setIsStyleFormLocked] = useState(true);

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

    if (editingProduct) {
      // Edit existing product
      const updatedProduct: Product = {
        id: editingProduct.id,
        name,
        price: Number(price),
        imageUrl: imagePreview,
      };
      setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
    } else {
      // Add new product
      const newProduct: Product = {
        id:crypto.randomUUID(),
        name,
        price: Number(price),
        imageUrl: imagePreview,
      };
      setProducts([...products, newProduct]);
    }
    closeModal();
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price);
    setImagePreview(product.imageUrl);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId: string) => {
    // Basic confirmation can be added here
    setProducts(products.filter(p => p.id !== productId));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setName('');
    setPrice('');
    setImagePreview('');
    setEditingProduct(null); // Reset editing state
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
    <div className={styles['store-step-wrapper']}>
      
      <div className={styles['store-step-layout']}>  
        
        {/* --- NEW LEFT COLUMN WRAPPER --- */}
        <div className={styles['store-left-column']}>
          <h1 className={styles.heroTitle}><span>Step3:</span> Customize Your Store</h1>
          {/* Left: Store Inventory & Grid */}
          <div className={styles['store-inventory-wrapper']} style={inventoryWrapperStyles}>
            <div className={styles['store-header']}>
              <div>
                <h2>Store Inventory</h2>
                <p className={styles.subtitle}>Manage your UrStore products and catalog.</p>
              </div>
              <button className={styles['btn-primary']} onClick={() => setIsModalOpen(true)}>
                <span className={styles['plus-icon']}>+</span> Add Product
              </button>
            </div>

            {/* Products Grid */}
            {products.length === 0 ? (
              <div className={styles['empty-state']}>
                <div className={styles['empty-icon']}>🛍️</div>
                <h3>Your store is looking a bit empty</h3>
                <p>Add your first product to start building your catalog.</p>
                <button className={`${styles['btn-secondary']} ${styles['mt-3']}`} onClick={() => setIsModalOpen(true)}>
                  Add First Product
                </button>
              </div>
            ) : (
              <div className={styles['products-grid']}>
                {products.map((product) => (
                  <div key={product.id} className={styles['product-card']} style={productCardStyles}>
                    {/* Inline style for the product image background color */}
                    <div className={styles['product-image-container']} style={{ backgroundColor: productImageBgColor }}>
                      <img src={product.imageUrl} alt={product.name} />
                      {/* Actions Section */}
                      <div className={styles['product-actions']}>
                        <button className={`${styles['action-btn']} ${styles['edit-btn']}`} onClick={() => handleEditProduct(product)}>
                          <img src={editIcon} alt="Edit" />
                        </button>
                        <button className={`${styles['action-btn']} ${styles['delete-btn']}`} onClick={() => handleDeleteProduct(product.id)}>
                          <img src={deleteIcon} alt="Delete" />
                        </button>
                      </div>
                    </div>
                    <div className={styles['product-info']}>
                      <h3 style={{ color: productNameColor, fontFamily: productNameFontFamily }}>
                        {product.name}
                      </h3>
                      <div className={styles['price-tag']}>
                        <span className={styles.price} style={{ color: productPriceColor }}>
                          {product.price.toFixed(2)} MAD
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* --- MOVED BUTTON CONTAINER --- */}
          <div className={styles['save-store-btn-container']} style={{ marginTop: '2rem' }}>
            {isStyleFormLocked ? (
              <center>
                <button className={`${styles['save-store-btn']} ${styles['unlock-btn']}`} type="button" onClick={handleUnlockStyleForm}>
                  Add Style to Your Store
                </button>
              </center>
            ) : (
              <Link to="/contact-step">
                <center>
                  <button className={styles['save-store-btn']} type="button">
                    Save store and Continue
                  </button>
                </center>
              </Link>
            )}
          </div>
          
        </div>

        {/* --- Right: Customization Form (Style Panel) --- */}
        <div className={`${styles['store-customization-panel']} ${isStyleFormLocked ? styles['is-locked'] : ''}`}>
          <h3>🎨 Store Styling</h3>
          <form onSubmit={handleSubmitStyle}>
            
            {/* UPDATED: Product Background Color */}
           

            <div className={styles['form-group']}>
              <label htmlFor="inventoryBgColor">Inventory Container Background Color:</label>
              <input 
                type="color" 
                id="inventoryBgColor" 
                value={inventoryBgColor} 
                onChange={(e) => setInventoryBgColor(e.target.value)}
                disabled={isStyleFormLocked}
                className={styles['color-picker-custom']}
              />
            </div>
             <div className={styles['form-group']}>
              <label htmlFor="productImageBgColor">Change product background color:</label>
              <input 
                type="color" 
                id="productImageBgColor" 
                value={productImageBgColor} 
                onChange={(e) => setProductImageBgColor(e.target.value)}
                disabled={isStyleFormLocked}
                className={styles['color-picker-custom']}
              />
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="productCardBgColor">Product Card Background Color:</label>
              <input 
                type="color" 
                id="productCardBgColor" 
                value={productCardBgColor} 
                onChange={(e) => setProductCardBgColor(e.target.value)}
                disabled={isStyleFormLocked}
                className={styles['color-picker-custom']}
              />
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="productNameColor">Product Name Color:</label>
              <input 
                type="color" 
                id="productNameColor" 
                value={productNameColor} 
                onChange={(e) => setProductNameColor(e.target.value)}
                disabled={isStyleFormLocked}
                className={styles['color-picker-custom']}
              />
            </div>

            <div className={styles['form-group']}>
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

            <div className={styles['form-group']}>
              <label htmlFor="productPriceColor">Product Price Color:</label>
              <input 
                type="color" 
                id="productPriceColor" 
                value={productPriceColor} 
                onChange={(e) => setProductPriceColor(e.target.value)}
                disabled={isStyleFormLocked}
                className={styles['color-picker-custom']}
              />
            </div>

            <button type="submit" className={`${styles['btn-success']} ${styles['mt-4']}`} disabled={isStyleFormLocked}>
              Save Style
            </button>
            
          </form>
          
          {isStyleFormLocked && (
            <div className={styles['lock-overlay']}>
              <span>Locked. Click "Add Style to Your Store" below to edit.</span>
            </div>
          )}
          
        </div>
      </div>

      

      {/* --- Re-worked Product Modal (Handles Add and Edit) --- */}
      {isModalOpen && (
        <div className={styles['modal-overlay']} onClick={closeModal}>
          <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
            <div className={styles['modal-header']}>
              <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button className={styles['close-btn']} onClick={closeModal}>&times;</button>
            </div>
            
            <form onSubmit={handleSubmitProduct}>
              <div className={styles['form-group']}>
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

              <div className={styles['form-group']}>
                <label htmlFor="productPrice">Price (MAD)</label>
                <div className={styles['input-with-currency']}>
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
                  <span className={styles['currency-suffix']}>MAD</span>
                </div>
              </div>

              <div className={styles['form-group']}>
                <label htmlFor="productImage">Product Image</label>
                <div className={styles['file-upload-wrapper']}>
                  <input
                    type="file"
                    id="productImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    required={!imagePreview} /* File required only when adding, not editing */
                  />
                </div>
                {imagePreview && (
                  <div className={styles['image-preview-container']}>
                    <img src={imagePreview} alt="Preview" className={styles['image-preview']} />
                  </div>
                )}
              </div>

              <div className={styles['modal-actions']}>
                <button type="button" className={styles['btn-ghost']} onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className={styles['btn-primary']}>
                  {editingProduct ? 'Save Changes' : 'Publish Product'}
                </button>
              </div>
            </form>
            
          </div>
          
        </div>
        
      )}

    </div>
  );
}