import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img 
          src={product.thumbnail} 
          className="card-img-top p-2" 
          alt={product.title} 
          style={{ height: '200px', objectFit: 'contain' }}
        />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text text-success fw-bold">
            ${product.price.toLocaleString()}
          </p>
          <Link to={`/items/${product.id}`} className="btn btn-primary">
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;