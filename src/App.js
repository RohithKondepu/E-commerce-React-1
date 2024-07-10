


import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import Modal from './Modal';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import Rating from './Rating';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState('');

 
  const openModal = (product) => {
    setModalData(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalData({});
    setIsModalOpen(false);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: 'ease-in-out', // Animation easing
      // once: true, // Whether animation should happen only once - while scrolling down
      mirror: false // Whether elements should animate out while scrolling past them
    });

    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: {
            query: 'shirts', // Adjust query parameters as needed
            client_id: 'KmCZcV8RA8E2geys9UWd4Gt-GzyocCphym3BwWN8Nvc',
            per_page: 30
          }
        });

        const fetchedProducts = response.data.results.map((photo, index) => ({
          id: `${photo.id}-${index}`, // Ensure each product has a unique ID
          name: photo.alt_description || 'Unnamed Product',
          description: photo.description || 'No description available.',
          image: photo.urls.small,
          price: Math.floor(Math.random() * 2000) + 1, 
          rating: Math.floor(Math.random() * 5) + 1
        }));

        setProducts(fetchedProducts);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this useEffect runs only once on component mount

  useEffect(() => {
    AOS.refresh(); // Refresh AOS after product data is loaded
  }, [products]);
  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Router>
      <div className='App'>
        <Header searchInput={searchInput} setSearchInput={setSearchInput} />
        <Routes>
          <Route  path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={
            <div className="container">
              <ul className="product-list">
                {filteredProducts.map(product => (
                  <li key={product.id} className="product-item" data-aos="fade-up">
                    <div className="product-card">
                      <img className="product-image" src={product.image} alt={product.name} />
                      <div className="product-info">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <Rating rating={product.rating} totalStars={5} />
                        <h4>₹{product.price}</h4>
                        <button className="more-button" onClick={() => openModal(product)}>More</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {isModalOpen && <Modal onClose={closeModal} data={modalData} />}
            </div>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

