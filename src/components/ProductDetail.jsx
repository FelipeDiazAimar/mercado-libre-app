import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { FaArrowLeft, FaArrowRight, FaTruck, FaShippingFast, FaUndo, FaMoneyBillWave, FaBan,
  FaShieldAlt, FaCalendarAlt, FaTimes, FaBoxOpen, FaExclamationTriangle,
  FaBox, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState('');
  const [randomAttributes, setRandomAttributes] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const productData = await getProductById(id);
        
        const normalizedProduct = {
          ...productData,
          discountPercentage: productData.discountPercentage || 
                            productData.discount_percentage ||
                            (productData.original_price && productData.price ? 
                              Math.round((1 - productData.price / productData.original_price) * 100) : 
                              0)
        };
        
        setProduct(normalizedProduct);
        
        const productDescription = productData.description || 
                                 productData.descripcion || 
                                 productData.details || 
                                 '';
        setDescription(productDescription);

        generateRandomAttributes();
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error('Error al cargar el producto', {
          position: "bottom-right",
        });
      } finally {
        setLoading(false);
      }
    };

    const generateRandomAttributes = () => {
      const possibleAttributes = [
        { 
          name: 'Envío', 
          values: ['Envío gratis', 'Envío con costo', 'Envío express'],
          icons: [
            <FaTruck className="text-success" size={16} />,
            <FaTruck className="text-warning" size={16} />, 
            <FaShippingFast className="text-primary" size={16} />
          ],
          weights: [70, 20, 10]
        },
        { 
          name: 'Devolución',
          values: ['Devolución gratis', 'Devolución con costo', 'No acepta devoluciones'],
          icons: [
            <FaUndo className="text-success" size={16} />,
            <FaMoneyBillWave className="text-warning" size={16} />,
            <FaBan className="text-danger" size={16} />
          ],
          weights: [60, 30, 10]
        },
        { 
          name: 'Garantía',
          values: ['12 meses', '6 meses', 'Sin garantía'],
          icons: [
            <FaShieldAlt className="text-success" size={16} />,
            <FaCalendarAlt className="text-warning" size={16} />,
            <FaTimes className="text-secondary" size={16} />
          ],
          weights: [50, 30, 20]
        },
        { 
          name: 'Disponibilidad',
          values: ['En stock', 'Últimas unidades'],
          icons: [
            <FaBoxOpen className="text-success" size={16} />,
            <FaExclamationTriangle className="text-warning" size={16} />,
            <FaBox className="text-danger" size={16} />
          ],
          weights: [60, 30, 10]
        },
        { 
          name: 'Calificación vendedor',
          values: ['Excelente', 'Bueno', 'Regular'],
          icons: [
            <FaStar className="text-warning" size={16} />,
            <FaStarHalfAlt className="text-warning" size={16} />,
            <FaRegStar className="text-warning" size={16} />
          ],
          weights: [40, 40, 20]
        }
      ];

      const selectedAttributes = possibleAttributes.map(attr => {
        const totalWeight = attr.weights.reduce((a, b) => a + b, 0);
        let random = Math.random() * totalWeight;
        let selectedIndex = 0;
        
        for (let i = 0; i < attr.weights.length; i++) {
          if (random < attr.weights[i]) {
            selectedIndex = i;
            break;
          }
          random -= attr.weights[i];
        }
        
        return {
          name: attr.name,
          value: attr.values[selectedIndex],
          icon: attr.icons[selectedIndex]
        };
      });

      setRandomAttributes(selectedAttributes);
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

  const navigateImages = (direction) => {
    setTransitionDirection(direction);
    
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentImageIndex(prev => 
          prev === allImages.length - 1 ? 0 : prev + 1
        );
      } else {
        setCurrentImageIndex(prev => 
          prev === 0 ? allImages.length - 1 : prev - 1
        );
      }
      setTransitionDirection('');
    }, 300);
  };

  if (loading) return <Loader />;
  if (!product) return <div className="product-not-found">Producto no encontrado</div>;

  const allImages = [
    product.thumbnail,
    ...(product.images || [])
  ].filter(Boolean);

  // Calcular descuento si hay diferencia de precios
  const showDiscount = product.original_price && product.price < product.original_price;
  const discountPercentage = showDiscount ? 
    Math.round((1 - product.price / product.original_price) * 100) : 
    product.discountPercentage || 0;

  return (
    <div className="product-detail-container">
      <div className="product-main">
        <div className="product-gallery">
          <div className="main-image-container">
            <img 
              src={allImages[currentImageIndex] || 'https://via.placeholder.com/600'} 
              alt={product.title} 
              className={`main-image ${transitionDirection}`}
              loading="lazy"
            />
            {allImages.length > 1 && (
              <>
                <button 
                  className="nav-arrow left-arrow"
                  onClick={() => navigateImages('prev')}
                  aria-label="Imagen anterior"
                >
                  <FaArrowLeft />
                </button>
                <button 
                  className="nav-arrow right-arrow"
                  onClick={() => navigateImages('next')}
                  aria-label="Siguiente imagen"
                >
                  <FaArrowRight />
                </button>
              </>
            )}
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
            
            {showDiscount && (
              <div className="price-comparison">
                <span className="original-price">${product.original_price.toLocaleString()}</span>
                <span className="discount-badge">{discountPercentage}% OFF</span>
              </div>
            )}
          </div>

          <div className="attributes-table">
            <h3 className="attributes-title">Características del producto</h3>
            <table className="attributes-grid">
              <tbody>
                {randomAttributes.map((attr, index) => (
                  <tr key={index} className="attribute-row">
                    <td className="attribute-name">
                      {attr.icon}
                      <span>{attr.name}</span>
                    </td>
                    <td className="attribute-value">{attr.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="quantity-section">
            <h3 className="quantity-title">Cantidad:</h3>
            <div className="quantity-controls">
              <button 
                className="quantity-btn"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input 
                type="number" 
                className="quantity-input"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max={product.available_quantity || 10}
              />
              <button 
                className="quantity-btn"
                onClick={() => setQuantity(prev => Math.min(product.available_quantity || 10, prev + 1))}
                disabled={quantity >= (product.available_quantity || 10)}
              >
                +
              </button>
            </div>
            <p className="stock-available">
              {product.available_quantity ? 
                `(${product.available_quantity} disponibles)` : 
                '(Stock disponible)'}
            </p>
          </div>

          <button 
            className="add-to-cart-btn primary-btn"
            onClick={handleAddToCart}
          >
            Agregar al carrito
          </button>
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