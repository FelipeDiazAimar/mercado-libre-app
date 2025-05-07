import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">MercadoLibre Clone</Link>
        
        <form className="d-flex w-50" onSubmit={handleSearch}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-light" type="submit">
            <FaSearch />
          </button>
        </form>

        <div className="ms-auto">
          <Link className="btn btn-light" to="#">
            <FaShoppingCart /> Carrito
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;