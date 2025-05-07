import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = ({ showItems = false }) => {
  const { cart, removeFromCart, getTotal } = useContext(CartContext);
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <div className="cart-widget">
      <div className="d-flex justify-content-between align-items-center">
        <h5>Carrito ({totalItems})</h5>
        <Link to="/cart" className="btn btn-sm btn-primary">
          Ver carrito completo
        </Link>
      </div>
      
      {showItems && cart.length > 0 && (
        <div className="cart-items mt-3">
          {cart.slice(0, 3).map(item => (
            <div key={item.id} className="cart-item d-flex align-items-center mb-2">
              <img 
                src={item.thumbnail} 
                alt={item.title}
                style={{ width: '40px', height: '40px', objectFit: 'contain' }}
              />
              <div className="ms-2 flex-grow-1">
                <div className="text-truncate" style={{ maxWidth: '200px' }}>
                  {item.title}
                </div>
                <small className="text-muted">
                  {item.quantity} x ${item.price.toLocaleString()}
                </small>
              </div>
              <button 
                className="btn btn-sm btn-link text-danger"
                onClick={() => removeFromCart(item.id)}
              >
                ✕
              </button>
            </div>
          ))}
          
          {cart.length > 3 && (
            <div className="text-center text-muted small">
              Y {cart.length - 3} productos más...
            </div>
          )}
          
          <div className="d-flex justify-content-between mt-3 pt-2 border-top">
            <strong>Total:</strong>
            <strong>${getTotal().toLocaleString()}</strong>
          </div>
        </div>
      )}
      
      {showItems && cart.length === 0 && (
        <div className="text-center py-3 text-muted">
          El carrito está vacío
        </div>
      )}
    </div>
  );
};

export default Cart;