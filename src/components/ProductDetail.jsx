import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const productData = await getProductById(id);
        setProduct(productData);
        
        const productDescription = productData.description || 
                                 productData.descripcion || 
                                 productData.details || 
                                 '';
        setDescription(productDescription);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error('Error al cargar el producto', {
          position: "bottom-right",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(
      <div>
        <strong>{quantity} {product.title}</strong> agregado al carrito
        <br />
        <small>Subtotal: ${(product.price * quantity).toLocaleString()}</small>
      </div>, 
      {
        icon: "🛒",
        position: "bottom-right",
      }
    );
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    const maxQuantity = product?.available_quantity || 10;
    setQuantity(Math.min(value, maxQuantity));
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  if (loading) return <Loader />;
  if (!product) return <div className="product-not-found">Producto no encontrado</div>;

  const allImages = [
    product.thumbnail,
    ...(product.images || [])
  ].filter(Boolean);

  return (
    <div className="product-detail-container">
      <div className="product-main">
        <div className="product-gallery">
          <div className="main-image-container">
            <img 
              src={allImages[currentImageIndex] || 'https://via.placeholder.com/600'} 
              alt={product.title} 
              className="main-image"
              loading="lazy"
            />
          </div>
          
          {allImages.length > 1 && (
            <div className="thumbnail-grid">
              {allImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.title} - ${index + 1}`}
                  className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => handleThumbnailClick(index)}
                  loading="lazy"
                />
              ))}
            </div>
          )}
        </div>

        <div className="product-info">
          <span className="product-condition">
            {product.condition === 'new' ? 'Nuevo' : 'Usado'} | {product.sold_quantity || 0} vendidos
          </span>
          <h1 className="product-title">{product.title}</h1>
          
          <div className="price-section">
            <span className="current-price">${product.price?.toLocaleString()}</span>
            {product.original_price && (
              <span className="original-price">${product.original_price.toLocaleString()}</span>
            )}
            {product.discountPercentage && (
              <span className="discount-badge">{Math.round(product.discountPercentage)}% OFF</span>
            )}
          </div>

          {product.shipping?.free_shipping && (
            <div className="free-shipping-badge">Envío gratis</div>
          )}

          <div className="quantity-selector">
            <label>Cantidad:</label>
            <div className="quantity-controls">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input 
                type="number" 
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max={product.available_quantity || 10}
              />
              <button 
                onClick={() => setQuantity(prev => Math.min(product.available_quantity || 10, prev + 1))}
                disabled={quantity >= (product.available_quantity || 10)}
              >
                +
              </button>
            </div>
          </div>

          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
          >
            Agregar al carrito
          </button>

          {product.attributes?.length > 0 && (
            <div className="product-attributes">
              <h3>Características principales</h3>
              <ul>
                {product.attributes.slice(0, 6).map(attr => (
                  <li key={attr.name}>
                    <strong>{attr.name}:</strong> {attr.value_name || attr.value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="product-description-section">
        <h2>Descripción del producto</h2>
        <div className="description-content">
          {description ? (
            <p>{description}</p>
          ) : (
            <p className="no-description">
              Este producto no tiene descripción detallada todavía.
              {product.brand && ` Marca: ${product.brand}`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;