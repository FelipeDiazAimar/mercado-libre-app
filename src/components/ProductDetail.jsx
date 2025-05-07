import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductDetail = ({ product, description, quantity, setQuantity }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${quantity} ${product.title} agregado al carrito`);
  };

  return (
    <div className="product-detail">
      <div className="row">
        <div className="col-md-6">
          <div className="product-images">
            {product.pictures && product.pictures.length > 0 ? (
              <img 
                src={product.pictures[0].url} 
                alt={product.title} 
                className="img-fluid rounded main-image"
              />
            ) : (
              <img 
                src={product.thumbnail} 
                alt={product.title} 
                className="img-fluid rounded main-image"
              />
            )}
            
            {product.pictures && product.pictures.length > 1 && (
              <div className="thumbnail-gallery d-flex mt-3">
                {product.pictures.slice(0, 4).map((pic, index) => (
                  <img 
                    key={index}
                    src={pic.url} 
                    alt={`${product.title} - imagen ${index + 1}`}
                    className="img-thumbnail me-2"
                    style={{ width: '70px', cursor: 'pointer' }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="product-info">
            <span className="text-muted">
              {product.condition === 'new' ? 'Nuevo' : 'Usado'} | {product.sold_quantity} vendidos
            </span>
            <h1 className="h3 mb-2">{product.title}</h1>
            
            <div className="price mb-3">
              <span className="text-success fw-bold fs-3">${product.price.toLocaleString()}</span>
              {product.original_price && (
                <span className="text-decoration-line-through text-muted ms-2">
                  ${product.original_price.toLocaleString()}
                </span>
              )}
            </div>
            
            {product.shipping?.free_shipping && (
              <div className="badge bg-success mb-3">Envío gratis</div>
            )}
            
            <div className="stock mb-3">
              <span className="text-dark">
                Stock disponible: {product.available_quantity} unidades
              </span>
            </div>
            
            <div className="quantity mb-3">
              <label className="form-label">Cantidad:</label>
              <div className="input-group" style={{ maxWidth: "150px" }}>
                <button 
                  className="btn btn-outline-secondary" 
                  type="button"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >-</button>
                <input 
                  type="number" 
                  className="form-control text-center" 
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  max={product.available_quantity}
                />
                <button 
                  className="btn btn-outline-secondary" 
                  type="button"
                  onClick={() => setQuantity(q => Math.min(product.available_quantity, q + 1))}
                  disabled={quantity >= product.available_quantity}
                >+</button>
              </div>
            </div>
            
            <div className="d-grid gap-2 mb-4">
              <button 
                className="btn btn-primary" 
                onClick={handleAddToCart}
              >
                Agregar al carrito
              </button>
            </div>
            
            {product.attributes && product.attributes.length > 0 && (
              <div className="attributes mb-4">
                <h5>Características:</h5>
                <div className="row">
                  {product.attributes.slice(0, 6).map(attr => (
                    <div className="col-6 mb-2" key={attr.id}>
                      <strong>{attr.name}:</strong> {attr.value_name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="description mt-4">
        <h4>Descripción</h4>
        <div className="card">
          <div className="card-body">
            {description ? (
              <p style={{ whiteSpace: 'pre-line' }}>{description}</p>
            ) : (
              <p className="text-muted">No hay descripción disponible para este producto.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;