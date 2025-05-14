import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FaCheckCircle, FaShoppingBag } from 'react-icons/fa';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Verificación segura del carrito
  if (!cart || cart.length === 0) {
    navigate('/cart');
    return null; // Evita renderizado mientras redirige
  }

  const handleContinueShopping = () => {
    clearCart();
    navigate('/');
  };

  return (
    <div className="checkout-container">
      <div className="checkout-success">
        <FaCheckCircle className="success-icon" />
        <h1>¡Compra exitosa!</h1>
        <p className="order-summary">
          Has comprado {cart.reduce((total, item) => total + item.quantity, 0)} productos.
        </p>
        
        <div className="order-details">
          <h3>Resumen de tu pedido:</h3>
          <ul>
            {cart.map(item => (
              <li key={item.id} className="order-item">
                <img 
                  src={item.thumbnail || 'https://via.placeholder.com/50'} 
                  alt={item.title} 
                  className="item-thumbnail"
                />
                <div>
                  <p>{item.title || 'Producto sin nombre'}</p>
                  <small>
                    {item.quantity} x ${item.price?.toLocaleString() || '0'}
                  </small>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button 
          onClick={handleContinueShopping}
          className="continue-shopping-btn"
        >
          <FaShoppingBag /> Seguir comprando
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;