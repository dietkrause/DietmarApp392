import React, { useState, useEffect } from 'react';
import './App.css';
import Banner from './components/Banner';
import Selector from './components/Selector';
import SelectedCourses from './components/SelectedCourses';
import Modal from 'react-modal';
import crud from './utilities/crud';
import AuthButton from './components/AuthButton';
import AppRoutes from './components/AppRoutes';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const options = ['Fall', 'Winter', 'Spring'];
    const defaultOption = 'Fall';
    const [selection, setSelection] = useState(defaultOption);
    const [filteredCourses, setFilteredCourses] = useState({});
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [result, setResult] = useState({
        status: 'loading',
        data: null,
        message: 'Loading...'
    });

    useEffect(() => {
        crud.readEntry("schedule", (data, error) => {
            if (data) {
                setResult({
                    status: 'success',
                    data: data,
                    message: ''
                });
            } else {
                setResult({
                    status: 'error',
                    data: null,
                    message: error || 'Failed to fetch data from Firebase.'
                });
            }
        });
    }, []);

    useEffect(() => {
        if (result && result.data && result.data.courses) {
            const courses = {};
            for (const key in result.data.courses) {
                if (result.data.courses[key].term === selection) {
                    courses[key] = result.data.courses[key];
                }
            }
            setFilteredCourses(courses);
        }
    }, [selection, result]);

    useEffect(() => {
        console.log(selectedCourses);
    }, [selectedCourses]);

    if (result.status === 'loading') {
        return <div>{result.message}</div>;
    }

    if (result.status === 'error') {
        return <div>Error: {result.message}</div>;
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
                <SelectedCourses selectedCourses={selectedCourses} schedule={result.data} />
                <button onClick={() => setIsModalOpen(false)} className="close-button">X</button>
            </Modal>
            <Banner content={result.data.title} />
            <AuthButton />
            <div className="selector-container">
                <button onClick={() => setIsModalOpen(true)}>
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
            <AppRoutes data={{ ...result.data, courses: filteredCourses, selectedCourses, setSelectedCourses }} />
        </div>
    );
}

export default App;
