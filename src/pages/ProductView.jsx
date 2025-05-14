import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getProductById } from '../services/api';
import Loader from '../components/Loader';
import ProductDetail from '../components/ProductDetail';
import { FaArrowLeft } from 'react-icons/fa';
import './ProductView.css'; 

function ProductView() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // Obtener la query de búsqueda de la ubicación
  const searchQuery = new URLSearchParams(location.state?.fromSearch || '').get('q') || '';
  const fromSearchPage = location.state?.from === 'search';

  useEffect(() => {
    const loadProduct = async () => {
      const data = await getProductById(id);
      setProduct(data);
      setLoading(false);
    };
    loadProduct();
  }, [id]);

  const handleBackToSearch = () => {
    // Navegar a la página anterior o a la búsqueda si viene de ahí
    if (fromSearchPage && searchQuery) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`, { 
        state: { from: 'product' } 
      });
    } else {
      navigate(-1); // Volver a la página anterior genérica
    }
  };

  if (loading) return <Loader />;
  if (!product) return <div>Producto no encontrado</div>;

  return (
    <div className="product-view-container">
      <button 
        onClick={handleBackToSearch}
        className="back-to-search-btn"
      >
        <FaArrowLeft className="back-icon" />
        {fromSearchPage && searchQuery 
          ? `Volver a resultados para "${searchQuery}"` 
          : 'Volver atrás'}
      </button>
      
      <ProductDetail product={product} />
    </div>
  );
}

export default ProductView;