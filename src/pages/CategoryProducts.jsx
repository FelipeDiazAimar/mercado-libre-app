import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsByCategory } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const [categoryData, setCategoryData] = useState({
    products: [],
    paging: {},
    filters: []
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadCategoryProducts = async () => {
      setLoading(true);
      try {
        const data = await getProductsByCategory(categoryId);
        setCategoryData({
          products: data.results,
          paging: data.paging,
          filters: data.filters
        });
      } catch (error) {
        console.error('Error cargando productos por categoría:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (categoryId) {
      loadCategoryProducts();
    }
  }, [categoryId]);
  
  if (loading) return <Loader />;
  
  // Obtener el nombre de la categoría de los filtros
  const categoryName = categoryData.filters.find(filter => filter.id === 'category')?.values[0]?.name || categoryId;
  
  return (
    <div className="container my-4">
      <h2 className="mb-4">Categoría: {categoryName}</h2>
      
      {categoryData.products.length === 0 ? (
        <div className="alert alert-info">
          No se encontraron productos en esta categoría.
        </div>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {categoryData.products.map(product => (
              <div className="col" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="d-flex justify-content-center mt-4">
            <div className="alert alert-secondary">
              Mostrando {categoryData.products.length} de {categoryData.paging.total} productos
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryProducts;