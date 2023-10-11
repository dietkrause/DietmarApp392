import React from 'react';
import './CourseCard.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';


const CourseCard = ({ title, content, footer, isSelected, onClick, overlappingWithSelected,id }) => {
    return (
        <div className={`card ${isSelected ? 'selected' : overlappingWithSelected ? 'overlapping' : ''}`} onClick={onClick}>
            <Link className="edit-button" to={`/edit/${id}`}>
            <FontAwesomeIcon icon={faPencilAlt} />
            </Link>
            <div className="title">{title}</div>
            <div className="content">{content}</div>
            <div className="footer">{footer}</div>
        </div>
    );
};

export default CourseCard;