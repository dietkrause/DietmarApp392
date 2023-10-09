import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import useFetching from './utilities/fetching';
import Selector from './components/Selector';

function App() {
  const options = ['Fall', 'Winter', 'Spring'];
  const defaultOption = 'Fall';
  const [selection, setSelection] = useState(defaultOption);
  const [filteredCourses, setFilteredCourses] = useState({});

  const url = `https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php?`;
  const result = useFetching(url);

  useEffect(() => {
    if (result.data && result.data.courses) {
      const courses = {};
      for (const key in result.data.courses) {
        if (result.data.courses[key].term === selection) {
          courses[key] = result.data.courses[key];
        }
      }
      setFilteredCourses(courses);
    }
  }, [selection, result.data]);

  if (result.status === 0 || result.status === 1) {
    return <div>{result.message}</div>;
  }

  return (
    <div className="App">
      <Banner content={result.data.title} />
      <Selector 
        options={options} 
        defaultOption={defaultOption} 
        selection={selection} 
        setSelection={setSelection} 
      />
      <CourseList schedule={{...result.data, courses: filteredCourses}} />
    </div>
  );
}

export default App;
