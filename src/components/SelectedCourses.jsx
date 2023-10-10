// SelectedCourses.jsx
import React from 'react';
import './SelectedCourses.css';

const SelectedCourses = ({ selectedCourses, schedule }) => {
    return (
        <div className="SelectedCourses">
            {selectedCourses.map(id => {
                const course = schedule.courses[id];
                return (
                    <div key={id} className="course-item">
                        {course.term} CS {course.number}: {course.title}
                    </div>
                );
            })}
        </div>
    );
};

export default SelectedCourses;