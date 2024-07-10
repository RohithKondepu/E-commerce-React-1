import React from 'react';
import Star from './Star';

const Rating = ({ rating, totalStars = 5 }) => {
  return (
    <div>
      {Array.from({ length: totalStars }, (v, i) => (
        <Star key={i} filled={i < rating} />
      ))}
    </div>
  );
};

export default Rating;