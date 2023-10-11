import React from 'react';
import './CourseCard.css';

const CourseCard = ({ title, content, footer, isSelected, onClick, overlappingWithSelected }) => {
    return (
        <div className={`card ${isSelected ? 'selected' : overlappingWithSelected ? 'overlapping' : ''}`} onClick={onClick}>
            <div className="title">{title}</div>
            <div className="content">{content}</div>
            <div className="footer">{footer}</div>
        </div>
    );
};

export default CourseCard;