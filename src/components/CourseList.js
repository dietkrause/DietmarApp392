import React from 'react';

const cardStyle = {
  border: '1px solid #e0e0e0',
  borderRadius: '5px',
  padding: '15px',
  margin: '10px 0',
  height: '200px',  // Set the desired height
  width: '150px',   // Set the desired width
  overflow: 'hidden' // Hide any content exceeding the card size
};

const titleStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '10px',
  whiteSpace: 'nowrap', // Prevent wrapping, making it a single line
  overflow: 'hidden',   // Hide overflow
  textOverflow: 'ellipsis' // Show ellipsis if the text is too long
};

const contentStyle = {
  fontSize: '1rem',
  marginBottom: '15px',
  maxHeight: '50%',   // Control content height
  overflowY: 'auto'   // Allow scrolling for content if necessary
};

const footerStyle = {
  borderTop: '1px solid #e0e0e0',
  marginTop: '10px',
  paddingTop: '10px',
  fontSize: '0.9rem',
  whiteSpace: 'nowrap', 
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

const CourseCard = ({ title, content, footer }) => {
  return (
    <div style={cardStyle}>
      <div style={titleStyle}>{title}</div>
      <div style={contentStyle}>{content}</div>
      <div style={footerStyle}>{footer}</div>
    </div>
  );
}

export default CourseCard;