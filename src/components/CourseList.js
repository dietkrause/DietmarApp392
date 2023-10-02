import React from 'react';


const CourseList = ({ schedule }) => {
  return (
    <div className="App-body">
        <center>
        <table>
          <thead>
            <tr>
              <th>Term</th>
              <th>Code</th>
              <th>Course</th>
              <th>When</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(schedule.courses).map(([id, course]) => 
              <tr key={id}>
                <td>{course.term}</td>
                <td>CS {course.number}</td>
                <td>{course.title}</td>
                <td>{course.meets}</td>
              </tr>
            )}
          </tbody>
        </table>
        </center>
    </div>
  );
}

export default CourseList;