import logo from './logo.svg';
import './App.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import React, { useState, useEffect } from 'react';
import useFetching from './utilities/fetching';


function App() {
  const url = "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php";
  const result = useFetching(url)
  
  if (result.status === 0 || result.status == 1) {
    return <div>{result.message}</div>;
  }
  return (
    <div>
      <div className="App">
      <Banner content={result.data.title} />
      <CourseList schedule={result.data}/>
      </div>
    </div>

  );
}

export default App;
