import { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 8;

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const skip = (currentPage - 1) * productsPerPage;
        const { products: fetchedProducts, total } = await fetchProducts(productsPerPage, skip);
        setProducts(fetchedProducts);
        setTotalProducts(total);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, [currentPage]);

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="app-title">Mercado Libre</h1>
        <p className="app-subtitle">Encuentra los mejores productos con descuento</p>
      </div>
      
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="section-title">Productos destacadas</h2>
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card-wrapper">
                {product.discountPercentage && (
                  <div className="discount-badge">
                    {Math.round(product.discountPercentage)}% OFF
                  </div>
                )}
                <ProductCard product={product} />
                <div className="product-description">
                  <p>{product.description ? `${product.description.substring(0, 60)}...` : 'Descripción no disponible'}</p>
                </div>
              </div>
            ))}
          </div>
          
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Home;