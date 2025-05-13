// pages/CategoryProducts.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsByCategory } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

function CategoryProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProductsByCategory(category);
      setProducts(data);
      setLoading(false);
    };
    
    loadProducts();
  }, [category]);

  if (loading) return <Loader />;

  return (
    <div className="category-products">
      <h1>Productos en {category}</h1>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default CategoryProducts;