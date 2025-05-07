import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="card h-100">
      <img 
        src={product.thumbnail} 
        className="card-img-top p-3" 
        alt={product.title} 
        style={{ objectFit: 'contain', height: '200px' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text text-success fw-bold fs-4">
          ${product.price.toLocaleString()}
        </p>
        {product.shipping.free_shipping && (
          <p className="text-success">Envío gratis</p>
        )}
        <Link 
          to={`/product/${product.id}`} 
          className="btn btn-primary mt-auto"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;