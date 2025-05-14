
import { useEffect, useState } from 'react';
import { getCategories } from '../services/api';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await getCategories();
      setCategories(data);
      setLoading(false);
    };
    
    loadCategories();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="categories">
      <h1>Categorías</h1>
      <div className="categories-list">
        {categories.map(category => (
          <Link key={category} to={`/category/${category}`}>
            <div className="category-card">
              {category}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;