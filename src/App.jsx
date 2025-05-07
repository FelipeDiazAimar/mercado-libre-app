import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import ProductView from './pages/ProductView';
import CartPage from './pages/CartPage';
import Categories from './pages/Categories';
import CategoryProducts from './pages/CategoryProducts';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/product/:id" element={<ProductView />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:categoryId" element={<CategoryProducts />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;