import React from 'react';
import './Banner.css'; 

const Banner = ({ content }) => {
  return (
    <div className="banner-container">
      <h1>{content}</h1>
    </div>
  );
}

export default Banner;