import React,{useState} from 'react';
import CourseCard from './CourseCard';

const CourseList = ({ schedule, selectedCourses, setSelectedCourses }) => {

  const handleCardClick = (id) => {
    if (selectedCourses.includes(id)) {
        setSelectedCourses(prev => prev.filter(courseId => courseId !== id));
    } else {
        setSelectedCourses(prev => [...prev, id]);
    }
};
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
    <center>
    <div className="App-body" style={containerStyle}>
      {Object.entries(schedule.courses).map(([id, course]) => (
        <div key={id} style={cardWrapperStyle}>
          <CourseCard
              title={`${course.term} CS ${course.number}`}
              content={course.title}
              footer={course.meets}
              id={id}
              isSelected={selectedCourses.includes(id)}
              onClick={() => handleCardClick(id)}
          />
        </div>
      ))}
    </div>
    </center>
  );
}

export default CourseList;