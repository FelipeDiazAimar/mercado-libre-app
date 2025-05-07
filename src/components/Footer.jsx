function Footer() {
    return (
      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5>MercadoLibre Clone</h5>
              <p>Una aplicación demo para el trabajo práctico de React</p>
            </div>
            <div className="col-md-6 text-end">
              <p>© {new Date().getFullYear()} - Todos los derechos reservados</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;