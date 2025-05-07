import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const [searchData, setSearchData] = useState({
    products: [],
    paging: {},
    filters: [],
    availableFilters: []
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const results = await searchProducts(query);
        setSearchData({
          products: results.results,
          paging: results.paging,
          filters: results.filters,
          availableFilters: results.available_filters
        });
      } catch (error) {
        console.error('Error buscando productos:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (query) {
      loadProducts();
    }
  }, [query]);
  
  if (loading) return <Loader />;
  
  return (
    <div>
      <h2 className="mb-4">Resultados para: {query}</h2>
      
      <div className="row">
        {/* Filtros (opcional) */}
        <div className="col-md-3">
          <div className="card mb-4">
            <div className="card-header">
              Filtros
            </div>
            <div className="card-body">
              {searchData.availableFilters.slice(0, 3).map(filter => (
                <div key={filter.id} className="mb-3">
                  <h6>{filter.name}</h6>
                  <div className="list-group">
                    {filter.values.slice(0, 5).map(value => (
                      <button 
                        key={value.id} 
                        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                      >
                        {value.name}
                        <span className="badge bg-primary rounded-pill">{value.results}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Resultados */}
        <div className="col-md-9">
          {searchData.products.length === 0 ? (
            <div className="alert alert-info">
              No se encontraron productos para esta búsqueda.
            </div>
          ) : (
            <>
              <div className="mb-3">
                <span className="text-muted">
                  {searchData.paging.total} resultados | Mostrando página {Math.floor(searchData.paging.offset / searchData.paging.limit) + 1} de {Math.ceil(searchData.paging.total / searchData.paging.limit)}
                </span>
              </div>
              
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {searchData.products.map(product => (
                  <div className="col" key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              
              {/* Paginación básica */}
              <div className="d-flex justify-content-center mt-4">
                <nav>
                  <ul className="pagination">
                    <li className={`page-item ${searchData.paging.offset === 0 ? 'disabled' : ''}`}>
                      <button className="page-link">Anterior</button>
                    </li>
                    <li className="page-item active">
                      <span className="page-link">
                        {Math.floor(searchData.paging.offset / searchData.paging.limit) + 1}
                      </span>
                    </li>
                    <li className={`page-item ${searchData.paging.offset + searchData.paging.limit >= searchData.paging.total ? 'disabled' : ''}`}>
                      <button className="page-link">Siguiente</button>
                    </li>
                  </ul>
                </nav>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;