import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import Orders from './components/Orders';
import Contact from './components/Contact';
import SingleProduct from './components/SingleProduct';
import Cart from './components/Cart';
import ErrorPage from './components/ErrorPage';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';
import AdminHome from './admin_comp/AdminHome';
import { useEffect, useState } from 'react';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  useEffect(() => {
    if (window.location.href.includes("admin")) {
      setShowAdmin(true);
    }
    else {
      setShowAdmin(false);
    }
  }, [])
  return (
    <>
      <Router>
        <Routes>
          <Route path='/admin' element={<AdminHome />}></Route>
        </Routes>
      </Router>
      {showAdmin == false ?
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/orders" element={<Orders />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/singleproduct/:id" element={<SingleProduct />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="*" element={<ErrorPage />}></Route>
          </Routes>
          <Footer />
        </Router>
        :
        ""}
    </>
  );
}

export default App;
