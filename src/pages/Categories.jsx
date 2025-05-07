import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';
import Loader from '../components/Loader';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error cargando categorías:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadCategories();
  }, []);
  
  if (loading) return <Loader />;
  
  return (
    <div className="container my-4">
      <h2 className="mb-4">Categorías</h2>
      
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {categories.map(category => (
          <div className="col" key={category.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
                <p className="text-muted">
                  {category.total_items_in_this_category?.toLocaleString()} productos
                </p>
              </div>
              <div className="card-footer bg-transparent">
                <Link 
                  to={`/category/${category.id}`} 
                  className="btn btn-outline-primary btn-sm"
                >
                  Ver productos
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;