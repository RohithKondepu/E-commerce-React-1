import React from 'react';
import './Modal.css';
import Rating from './Rating';
const Modal = ({ onClose, data }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>₹{data.price}</h2>
        <img src={data.image} alt={data.id} width="200" />
        <p>{data.name}</p>
        <Rating rating={data.rating} totalStars={5} />
        <button onClick={onClose}>Back to List</button>
      </div>
    </div>
  );
};

export default Modal;
