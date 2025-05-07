import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import SearchResults from './pages/SearchResults';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items/:id" element={<ProductDetail />} />
            <Route path="/search/:query" element={<SearchResults />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;