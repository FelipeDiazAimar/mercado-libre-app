import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Header = () => {
  const { cart } = useContext(CartContext);
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">Mi Tienda MeLi</Link>
        <div className="d-flex flex-grow-1 justify-content-between">
          <SearchBar />
          <Link to="/cart" className="btn btn-outline-light">
            🛒 {totalItems > 0 && <span className="badge bg-danger">{totalItems}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;