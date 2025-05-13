import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import EmptyResults from '../components/EmptyResults';
import './SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q') || '';
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    let isMounted = true; // Para evitar actualizaciones en componentes desmontados

    if (!query) {
      navigate('/');
      return;
    }

    const fetchResults = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const { products } = await searchProducts(query, { limit: 50 });
        if (isMounted) {
          setResults(products);
        }
      } catch (err) {
        console.error("Search failed:", err);
        if (isMounted) {
          setError("Error al realizar la búsqueda");
          setResults([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchResults();

    return () => {
      isMounted = false; // Limpieza al desmontar
    };
  }, [query, navigate]);

  const filteredResults = activeFilter === 'all' 
    ? results 
    : results.filter(product => 
        activeFilter === 'exact'
          ? product.title.toLowerCase().includes(query.toLowerCase())
          : product.category.toLowerCase() === activeFilter
      );

  const categories = [...new Set(results.map(p => p.category))];

  if (isLoading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="search-results-page">
      <div className="search-results-header">
        <h1 className="search-results-title">
          Resultados para: <span className="search-query">"{query}"</span>
        </h1>
        <p className="results-count">{filteredResults.length} productos encontrados</p>
      </div>

      <div className="search-results-layout">
        <div className="filters-sidebar">
          <div className="filters-container">
            <h3 className="filters-title">Filtrar por:</h3>
            <div className="filters-list">
              <button
                onClick={() => setActiveFilter('all')}
                className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
              >
                Todos los resultados
              </button>
              <button
                onClick={() => setActiveFilter('exact')}
                className={`filter-button ${activeFilter === 'exact' ? 'active' : ''}`}
              >
                Coincidencia exacta
              </button>
              
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category.toLowerCase())}
                  className={`filter-button ${activeFilter === category.toLowerCase() ? 'active' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="results-main-content">
          {filteredResults.length > 0 ? (
            <div className="products-grid">
              {filteredResults.map(product => (
                <ProductCard key={product.id} 
                product={product}
                state={{ from: 'search', fromSearch: location.search }}
                />
              ))}
            </div>
          ) : (
            <EmptyResults 
              query={query} 
              onReset={() => {
                setActiveFilter('all');
                navigate('/search?q=' + encodeURIComponent(query));
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;