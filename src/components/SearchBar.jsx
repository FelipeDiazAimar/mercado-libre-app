import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };
  
  return (
    <form onSubmit={handleSearch} className="d-flex flex-grow-1 mx-4">
      <input 
        type="text" 
        className="form-control" 
        placeholder="Buscar productos..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn btn-light ms-2" type="submit">Buscar</button>
    </form>
  );
};

export default SearchBar;