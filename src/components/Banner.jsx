import React from 'react';

// Styling for the banner
const bannerStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  textAlign: 'center',
  borderRadius: '5px',
  margin: '20px 0'
};

const Banner = ({ content }) => {
  return (
    <div style={bannerStyle}>
      <header className="App-header">
        <h1>{content}</h1>
      </header>
    </div>
  );
}

export default Banner;