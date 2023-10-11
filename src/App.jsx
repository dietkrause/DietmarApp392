import React, { useState, useEffect } from 'react';
import './App.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import useFetching from './utilities/fetching';
import Selector from './components/Selector';
import SelectedCourses from './components/SelectedCourses'; // Import the new component
import Modal from 'react-modal';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const options = ['Fall', 'Winter', 'Spring'];
    const defaultOption = 'Fall';
    const [selection, setSelection] = useState(defaultOption);
    const [filteredCourses, setFilteredCourses] = useState({});
    const [selectedCourses, setSelectedCourses] = useState([]); // New state for selected courses

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

    useEffect(() => {
      console.log(selectedCourses);
  }, [selectedCourses]);

    if (result.status === 0 || result.status === 1) {
        return <div>{result.message}</div>;
    }

    return (
        <div className="App">
            <Modal 
            isOpen={isModalOpen} 
            onRequestClose={() => setIsModalOpen(false)}
            ariaHideApp={false}
            contentLabel="Your course plan"
            >
            <h2>Your course plan</h2>
            <SelectedCourses
                selectedCourses={selectedCourses}
                schedule={result.data}
            />
            <button onClick={() => setIsModalOpen(false)} className="close-button">X</button>
            </Modal>
            <Banner content={result.data.title} />
            <div className="selector-container">
            <button 
            onClick={() => setIsModalOpen(true)}
                    >
                        Course Plan
            </button>
            <Selector 
                className="Selector"
                options={options}
                defaultOption={defaultOption}
                selection={selection}
                setSelection={setSelection}
            />
            </div>
            
            <CourseList 
                schedule={{...result.data, courses: filteredCourses}} 
                selectedCourses={selectedCourses} 
                setSelectedCourses={setSelectedCourses} 
            />
        </div>
    );
}

export default App;
