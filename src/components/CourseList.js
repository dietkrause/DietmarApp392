import React from 'react';
import CourseCard from './CourseCard';

const CourseList = ({ schedule }) => {
  const containerStyle = {
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    padding: '10px 0'
  };

  const cardWrapperStyle = {
    display: 'inline-block',
    marginRight: '15px'
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