function ErrorMessage({ message }) {
    return (
      <div className="alert alert-danger" role="alert">
        {message || 'Ocurrió un error al cargar los datos.'}
      </div>
    );
  }
  
  export default ErrorMessage;