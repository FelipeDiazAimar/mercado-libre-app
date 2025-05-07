import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const [productResponse, descriptionResponse] = await Promise.all([
          axios.get(`https://api.mercadolibre.com/items/${id}`),
          axios.get(`https://api.mercadolibre.com/items/${id}/description`)
        ]);
        
        setProduct(productResponse.data);
        setDescription(descriptionResponse.data.plain_text);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="product-detail">
      <div className="row">
        <div className="col-md-6">
          <img 
            src={product.pictures[0].url} 
            alt={product.title} 
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p className="text-success fs-3 fw-bold">
            ${product.price.toLocaleString()}
          </p>
          <p>
            <span className="badge bg-info text-dark">
              {product.condition === 'new' ? 'Nuevo' : 'Usado'}
            </span>
            {product.sold_quantity > 0 && (
              <span className="ms-2">
                Vendidos: {product.sold_quantity}
              </span>
            )}
          </p>
          <button className="btn btn-primary btn-lg">
            Comprar ahora
          </button>
          <button className="btn btn-outline-primary btn-lg ms-2">
            Agregar al carrito
          </button>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <h3>Descripción del producto</h3>
          <p className="text-muted" style={{ whiteSpace: 'pre-line' }}>
            {description || 'Este producto no tiene descripción.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;