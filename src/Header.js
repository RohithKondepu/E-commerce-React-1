 import React from 'react';
 import './Header.css';
 import { Link } from 'react-router-dom';

 const Header = ({ searchInput, setSearchInput }) => {
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };
   return (
     <div className='header'>
       <div className='header_left'>
         <img className='logo' src='https://images.unsplash.com/photo-1536566482680-fca31930a0bd?ixlib=rb-4.0.3' alt='logo' />
         <h2>E-Commerce</h2>
       </div>
       <div className='header_center'>
         <nav className='nav_links'>
           <Link to="/">Home</Link>
           <Link to="/products">Products</Link>
           <Link to="/contact">Contact</Link>
         </nav>
       </div>
      <div className='header_right'>
                   <input type='text' placeholder='search products..' value={searchInput}
        onChange={handleInputChange}></input>
                 <button>Sign In</button>
                 <button>Sign Up</button>
              </div>
    </div>
   );
 }

 export default Header;

