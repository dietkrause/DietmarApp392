import logo from './logo.svg';
import './App.css';


const schedule = {
  "title": "CS Courses for 2023-2024",
  "courses": {
    "F101" : {
      "term": "Fall",
      "number": "101",
      "meets" : "MWF 11:00-11:50",
      "title" : "Computer Science: Concepts, Philosophy, and Connections"
    },
    "F110" : {
      "term": "Fall",
      "number": "110",
      "meets" : "MWF 10:00-10:50",
      "title" : "Intro Programming for non-majors"
    },
    "S313" : {
      "term": "Spring",
      "number": "313",
      "meets" : "TuTh 15:30-16:50",
      "title" : "Tangible Interaction Design and Learning"
    },
    "S314" : {
      "term": "Spring",
      "number": "314",
      "meets" : "TuTh 9:30-10:50",
      "title" : "Tech & Human Interaction"
    }
  }
};


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>{schedule.title}</h1>
      </header>
      <div className="App-body">
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Term</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(schedule.courses).map(([id, course]) => 
              <tr key={id}>
                <td>{course.title}</td>
                <td>{course.meets}</td>
              </tr>
            )}
          </tbody>
        </table>
    </div>
    </div>
  );
}

export default App;
