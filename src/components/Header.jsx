import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { FiShoppingCart, FiX, FiChevronDown } from 'react-icons/fi';
import './Header.css';

const Header = () => {
  const { cart } = useContext(CartContext);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <header className="glass-header">
      <div className="header-container">
        <Link className="logo" to="/">
          <span className="logo-gradient">MERCADO</span>LIBRE
        </Link>
        
        <div className="search-wrapper">
          <SearchBar />
        </div>
        
        <div className="cart-wrapper">
          <button 
            className="cart-icon-button"
            onClick={() => setShowCartDropdown(!showCartDropdown)}
            aria-label="Carrito"
          >
            <FiShoppingCart className="cart-icon" />
            {totalItems > 0 && (
              <span className="cart-counter">
                {totalItems}
              </span>
            )}
            <FiChevronDown className={`dropdown-arrow ${showCartDropdown ? 'rotate' : ''}`} />
          </button>

          {showCartDropdown && (
            <div className="cart-dropdown-panel">
              <div className="dropdown-header d-flex justify-content-between align-items-center">
                <h3 className="m-0">Tu Carrito ({totalItems})</h3>
                <button 
                  onClick={() => setShowCartDropdown(false)}
                  className="close-button"
                >
                  <FiX />
                </button>
              </div>
              
              {cart.length > 0 ? (
                <>
                  <div className="cart-items-scroll">
                    {cart.map((item) => (
                      <div key={item.id} className="cart-item-card">
                        <img 
                          src={item.thumbnail} 
                          alt={item.title}
                          className="item-image"
                        />
                        <div className="item-info">
                          <h4 className="item-title">{item.title}</h4>
                          <div className="item-meta">
                            <span className="item-quantity">{item.quantity} ×</span>
                            <span className="item-price">${item.price.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="cart-summary">
                    <div className="total-amount">
                      <span>Total:</span>
                      <span>${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString()}</span>
                    </div>
                    <Link 
                      to="/cart" 
                      className="checkout-button"
                      onClick={() => setShowCartDropdown(false)}
                    >
                      Ver Carrito Completo
                    </Link>
                  </div>
                </>
              ) : (
                <div className="empty-cart-message">
                  <p>Tu carrito está vacío</p>
                  <Link 
                    to="/" 
                    className="browse-button"
                    onClick={() => setShowCartDropdown(false)}
                  >
                    Explorar Productos
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;