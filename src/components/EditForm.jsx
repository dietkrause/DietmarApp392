import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditForm.css';

const EditForm = ({ schedule }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const course = schedule.courses[id];
    console.log("this is the course id: ",id);
    if(!course) {
        return <div>Course not found</div>;
    }

    return (
        <div>
            <h2>Edit Course</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label>Title: </label>
                    <input type="text" defaultValue={course.title} />
                </div>
                <div>
                    <label>Meeting Times: </label>
                    <input type="text" defaultValue={course.meets} />
                </div>
                <button onClick={() => navigate('/')}>Cancel</button>
            </form>
        </div>
    );
};

export default EditForm;