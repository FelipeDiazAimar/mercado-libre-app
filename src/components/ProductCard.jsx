import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, state, showDescription = false }) => {
    return (
        <Link 
            to={`/product/${product.id}`}
            state={state}  // Pasa el estado de navegación (para el botón "Volver")
            className="product-card"
        >
            <div className="product-image-container">
                <img
                    src={product.thumbnail || 'https://via.placeholder.com/300'}
                    alt={product.title}
                    className="product-image"
                    loading="lazy"
                />

            </div>
            <div className="product-info">
                <h3 className="product-title">{product.title || 'Sin nombre'}</h3>
                <div className="price-container">
                    <span className="current-price">${product.price?.toLocaleString() || 'N/A'}</span>
                    {product.original_price && (
                        <span className="original-price">${product.original_price.toLocaleString()}</span>
                    )}
                </div>
                {showDescription && product.description && (
                    <p className="product-description">
                        {product.description.length > 100 
                            ? `${product.description.substring(0, 100)}...`
                            : product.description}
                    </p>
                )}
                {product.shipping?.free_shipping && (
                    <div className="free-shipping">Envío gratis</div>
                )}
            </div>
        </Link>
    );
};

export default React.memo(ProductCard);