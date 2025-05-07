import { useState, useEffect } from 'react';
import { searchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        // Podemos cargar productos destacados o populares
        const products = await searchProducts('ofertas destacadas');
        setFeaturedProducts(products.slice(0, 8)); // Tomamos los primeros 8
      } catch (error) {
        console.error('Error cargando productos destacados:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadFeaturedProducts();
  }, []);
  
  if (loading) return <Loader />;
  
  return (
    <div>
      <h2 className="mb-4">Productos Destacados</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {featuredProducts.map(product => (
          <div className="col" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;