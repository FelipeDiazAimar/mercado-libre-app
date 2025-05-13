import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import ProductView from './pages/ProductView';
import CartPage from './pages/CartPage';
import Categories from './pages/Categories';
import CategoryProducts from './pages/CategoryProducts';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Footer from './components/Footer';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/product/:id" element={<ProductView />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/category/:category" element={<CategoryProducts />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          toastStyle={{
            backgroundColor: '#28a745',
            color: 'white',
          }}
        />
      </Router>
    </CartProvider>
  );
}

export default App;