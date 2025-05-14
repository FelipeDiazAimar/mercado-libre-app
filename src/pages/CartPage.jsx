import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotal } = useContext(CartContext);
  
  if (cart.length === 0) {
    return (
      <div className="text-center py-5">
        <h2>Tu carrito está vacío</h2>
        <p>¿Por qué no agregas algunos productos?</p>
        <Link to="/" className="btn btn-primary">Ir a comprar</Link>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="mb-4">Tu Carrito</h2>
      
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      style={{ width: '50px', marginRight: '10px' }}
                    />
                    <span>{item.title}</span>
                  </div>
                </td>
                <td>${item.price.toLocaleString()}</td>
                <td>
                  <div className="input-group" style={{ width: '120px' }}>
                    <button 
                      className="btn btn-sm btn-outline-secondary" 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >-</button>
                    <input 
                      type="number" 
                      className="form-control form-control-sm text-center" 
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                      min="1"
                    />
                    <button 
                      className="btn btn-sm btn-outline-secondary" 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >+</button>
                  </div>
                </td>
                <td>${(item.price * item.quantity).toLocaleString()}</td>
                <td>
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="text-end fw-bold">Total:</td>
              <td className="fw-bold">${getTotal().toLocaleString()}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
      
      <div className="d-flex justify-content-between mt-4">
        <button 
          className="btn btn-outline-danger"
          onClick={clearCart}
        >
          Vaciar carrito
        </button>
        <button className="btn btn-success">
          Proceder al pago
        </button>
      </div>
    </div>
  );
};

export default CartPage;