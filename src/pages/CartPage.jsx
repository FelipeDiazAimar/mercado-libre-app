import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import './CartPage.css'; // Crearemos este archivo

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotal } = useContext(CartContext);
  
  if (cart.length === 0) {
    return (
      <div className="empty-cart-container text-center py-5">
        <div className="empty-cart-icon">🛒</div>
        <h2 className="mt-3">Tu carrito está vacío</h2>
        <p className="text-muted mb-4">Agrega productos para continuar</p>
        <Link to="/" className="btn btn-primary btn-lg">
          Ir a comprar
        </Link>
      </div>
    );
  }
  
  return (
    <div className="cart-container">
      <h1 className="cart-title mb-4">Mi Carrito</h1>
      
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item card mb-3">
            <div className="row g-0">
              <div className="col-md-2">
                <img 
                  src={item.thumbnail} 
                  alt={item.title}
                  className="img-fluid rounded-start cart-item-image"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="cart-item-title">{item.title}</h5>
                  <p className="cart-item-price">${item.price.toLocaleString()}</p>
                  
                  <div className="quantity-controls">
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <FiMinus />
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-2 d-flex align-items-center justify-content-end">
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary card mt-4">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h4>Total:</h4>
            <h4>${getTotal().toLocaleString()}</h4>
          </div>
          
          <div className="d-grid gap-2 mt-4">
            <button 
              className="btn btn-outline-danger"
              onClick={clearCart}
            >
              Vaciar carrito
            </button>
            <Link 
              to="/checkout" 
              className="btn btn-success"
            >
              Proceder al pago
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;