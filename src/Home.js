import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className='home'>
      <div className='home-content'>
        <h1>Welcome to Our Store</h1>
        <p>Discover our exclusive range of products tailored just for you.</p>
        <p>Click on the Products tab above to start exploring!</p>
        <div className='button-container'>
          <a href="/products" className='explore-button'>Explore Products</a>
        </div>
      </div>
    </div>
  );
}

export default Home;
