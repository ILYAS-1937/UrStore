import React, { useState, ChangeEvent, FormEvent, useEffect, use } from 'react';
import { Link } from 'react-router-dom';
import './StoreStep.css';
import useStore from '../../useStore';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export default function StoreStep() {
  const setField = useStore((state) => state.setField);
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };
  const handleSubmit = (e: FormEvent) => {
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
  useEffect(() => {
    setField("products", products);
  }, [products]);
  useEffect(() => {
    setField("isModalOpen", isModalOpen);
  }, [isModalOpen]);
    useEffect(() => {
    setField("name", name);
  }, [name]);
    useEffect(() => {
    setField("price", price);
  }, [price]);
    useEffect(() => {
    setField("imagePreview", imagePreview);
  }, [imagePreview]);



  return (
    <div className="store-step-container">
     <h1 className="heroTitle"><span>Step3:</span> Customize Your Store</h1>
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
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="price-tag">
                  <span className="price">{product.price.toFixed(2)} MAD</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Product Modal (Form) */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Product</h3>
              <button className="close-btn" onClick={closeModal}>&times;</button>
            </div>
            
            <form onSubmit={handleSubmit}>
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
      <Link to="/contact-step"><center><button className='save-store-btn' type="submit">Save store</button></center></Link>
    </div>
  );
}