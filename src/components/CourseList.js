import React from 'react';
import CourseCard from './CourseCard';

const CourseList = ({ schedule }) => {
  const containerStyle = {
    display: 'flex',       // Using flexbox
    flexDirection: 'row', // Align items in a row
    overflowX: 'auto',    // Horizontal scroll
    padding: '10px 0',
    alignItems: 'stretch' // Make all cards grow to the height of the tallest card
  };

  const cardWrapperStyle = {
    marginRight: '15px',
    flexShrink: 0 // Prevent flex items from shrinking
  };

  return (
    <div className="App-body" style={containerStyle}>
      {Object.entries(schedule.courses).map(([id, course]) => (
        <div key={id} style={cardWrapperStyle}>
          <CourseCard 
            title={`${course.term} CS ${course.number}`}
            content={course.title}
            footer={course.meets}
          />
        </div>
      ))}
    </div>
  );
}

export default CourseList;