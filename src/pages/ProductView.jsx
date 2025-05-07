import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails, getProductDescription } from '../services/api';
import ProductDetail from '../components/ProductDetail';
import Loader from '../components/Loader';

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    const loadProductDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Usar la API específica que mencionaste para MLA1377454181
        // Aquí usamos el ID dinámico de los parámetros de ruta
        const productData = await getProductDetails(id);
        setProduct(productData);
        
        // Obtener la descripción del producto
        const descriptionData = await getProductDescription(id);
        setDescription(descriptionData.plain_text || '');
      } catch (error) {
        console.error('Error cargando detalles del producto:', error);
        setError('No pudimos cargar los detalles del producto. Por favor, intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      loadProductDetails();
    }
  }, [id]);
  
  if (loading) return <Loader />;
  
  if (error) {
    return (
      <div className="alert alert-danger">
        <h4>Error</h4>
        <p>{error}</p>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="alert alert-warning">
        Producto no encontrado. El ID proporcionado no existe o no está disponible.
      </div>
    );
  }
  
  return (
    <div className="container my-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Inicio</a></li>
          {product.category_id && (
            <li className="breadcrumb-item">
              <a href={`/category/${product.category_id}`}>
                {product.category_id}
              </a>
            </li>
          )}
          <li className="breadcrumb-item active" aria-current="page">{product.title}</li>
        </ol>
      </nav>
      
      <ProductDetail 
        product={product} 
        description={description}
        quantity={quantity}
        setQuantity={setQuantity}
      />
      
      {/* Sección adicional para mostrar productos relacionados */}
      {product.catalog_product_id && (
        <div className="mt-5">
          <h3>Productos similares</h3>
          <div className="alert alert-info">
            Para implementar esta sección, puedes usar:
            <code>https://api.mercadolibre.com/products/{product.catalog_product_id}/items</code>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductView;