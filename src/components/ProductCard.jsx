import { useState } from 'react';
import './ProductCard.css';

export default function ProductCard({ product, onAddCart }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddCart = () => {
    onAddCart(product);
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <div className="product-badge">{product.badge}</div>
        <img src={product.image} alt={product.name} className="product-image" />
        <button
          className="wishlist-btn"
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          {isWishlisted ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="product-info">
        <div className="product-header">
          <div>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-specs">{product.specs}</p>
          </div>
          <span className="product-price">${product.price}</span>
        </div>

        <div className="product-rating">
          <span className="star">⭐</span>
          <span className="rating-value">{product.rating}</span>
          <span className="rating-count">(248 reviews)</span>
        </div>

        <button className="add-to-cart-btn" onClick={handleAddCart}>
          <span>🛒</span>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
