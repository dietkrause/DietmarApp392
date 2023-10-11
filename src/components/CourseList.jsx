import React from 'react';
import CourseCard from './CourseCard';
import './CourseList.css';

const CourseList = ({ schedule, selectedCourses, setSelectedCourses }) => {
    const timeToInt = time => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
      };
      
    const overlap = (time1, time2) => {
        const [start1, end1] = time1.split('-').map(timeToInt);
        const [start2, end2] = time2.split('-').map(timeToInt);
        
        return !(end1 <= start2 || end2 <= start1);
      };
      
    const overlapDays = (days1, days2) => {
        for (let day of days1) {
          if (days2.includes(day)) return true;
        }
        return false;
      };

      const handleCardClick = (id) => {
        if (selectedCourses.includes(id)) {
            setSelectedCourses(prev => prev.filter(courseId => courseId !== id));
        } else {
            const selectedCourse = schedule.courses[id];
            const overlaps = selectedCourses.some(selId => {
                const existingCourse = schedule.courses[selId];
                return overlapDays(selectedCourse.meets.split(' ')[0], existingCourse.meets.split(' ')[0]) && overlap(selectedCourse.meets.split(' ')[1], existingCourse.meets.split(' ')[1]);
            });
            if (!overlaps) {
                setSelectedCourses(prev => [...prev, id]);
            }
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
                overlappingWithSelected={selectedCourses.some(selId => {
                    const selectedCourse = schedule.courses[selId];
                    return overlapDays(course.meets.split(' ')[0], selectedCourse.meets.split(' ')[0]) && overlap(course.meets.split(' ')[1], selectedCourse.meets.split(' ')[1]);
                })}
            />
            ))}
        </div>
    );
};

export default CourseList;





