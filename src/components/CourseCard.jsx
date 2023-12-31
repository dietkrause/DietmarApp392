import React from 'react';
import './CourseCard.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
//import { useAuthState } from '../utilities/firebase'; // Import the useAuthState hook
import { useProfile } from '../utilities/profile';

const CourseCard = ({ title, content, footer, isSelected, onClick, overlappingWithSelected, id }) => {
  const [{user,isAdmin}] = useProfile(); // Get the user authentication state

  return (
    <div className={`card ${isSelected ? 'selected' : overlappingWithSelected ? 'overlapping' : ''}`} onClick={onClick}>
      {isAdmin ? ( // Check if the user is logged in
        <Link className="edit-button" to={`/edit/${id}`}>
          <FontAwesomeIcon icon={faPencilAlt} />
        </Link>
      ) : (
        // Render something else or nothing if the user is not logged in
        null
      )}
      <div className="title" data-cy="course">{title}</div>
      <div className="content">{content}</div>
      <div className="footer">{footer}</div>
    </div>
  );
};

export default CourseCard;