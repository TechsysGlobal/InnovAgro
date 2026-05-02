import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import './App.css';

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddCart = (product) => {
    setCartCount(cartCount + 1);
    alert(`${product.name} added to cart!`);
  };

  return (
    <Router>
      <div className="app">
        <Navbar cartCount={cartCount} />
        <Routes>
          <Route path="/" element={<Home cartCount={cartCount} onAddCart={handleAddCart} />} />
          <Route path="/products" element={<Products onAddCart={handleAddCart} />} />
        </Routes>
      </div>
    </Router>
  );
}
