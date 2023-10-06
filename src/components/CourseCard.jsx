import React from 'react';

const cardStyle = {
  border: '1px solid #e0e0e0',
  borderRadius: '5px',
  padding: '15px',
  margin: '10px 0',
  width: '150px'  // Set the desired width
};

const titleStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '10px'
};

const contentStyle = {
  fontSize: '1rem',
  marginBottom: '15px'
};

const footerStyle = {
  borderTop: '1px solid #e0e0e0',
  marginTop: '10px',
  paddingTop: '10px',
  fontSize: '0.9rem'
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