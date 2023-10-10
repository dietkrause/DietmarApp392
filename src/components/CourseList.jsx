import React from 'react';
import CourseCard from './CourseCard';
import './CourseList.css';

const CourseList = ({ schedule, selectedCourses, setSelectedCourses }) => {
    const handleCardClick = (id) => {
        if (selectedCourses.includes(id)) {
            setSelectedCourses(prev => prev.filter(courseId => courseId !== id));
        } else {
            setSelectedCourses(prev => [...prev, id]);
        }
    };

    return (
        <div className="App-body">
            {Object.entries(schedule.courses).map(([id, course]) => (
                <CourseCard
                    key={id}
                    title={`${course.term} CS ${course.number}`}
                    content={course.title}
                    footer={course.meets}
                    id={id}
                    isSelected={selectedCourses.includes(id)}
                    onClick={() => handleCardClick(id)}
                />
            ))}
        </div>
    );
}

export default CourseList;





