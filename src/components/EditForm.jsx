import React, { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditForm.css';

const EditForm = ({ schedule }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const course = schedule.courses[id];
    const titleRef = useRef(null);
    const meetsRef = useRef(null);
    const [titleError, setTitleError] = useState('');
    const [meetsError, setMeetsError] = useState('');

    const formValidation = () => {
        const title = titleRef.current.value;
        const meets = meetsRef.current.value;
        const meetsPattern = /^(Mo|Tu|We|Th|Fr|Sa|Su)*\s\d{1,2}:\d{2}-\d{1,2}:\d{2}$/;

        if (title.length < 2) {
            setTitleError('Course title should be at least two characters.');
            return false;
        }

        if (meets && !meetsPattern.test(meets)) {
            setMeetsError('Meeting times are not in the correct format.');
            return false;
        }

        setTitleError('');
        setMeetsError('');
        return true;
    };

    const onSubmit = () => {
        if (formValidation()) {
            const data = {
                title: titleRef.current.value,
                meets: meetsRef.current.value,
            };
            console.log(data);
            navigate('/');
        } else {
            console.log("Unable to print data");
        }
    };

    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <div className="editFormContainer">
            <h2>Edit Course</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="formGroup">
                    <label>Title: </label>
                    <input type="text" ref={titleRef} defaultValue={course.title} className={titleError ? 'inputError' : ''} />
                    {titleError && <div className="errorMessage">{titleError}</div>}
                </div>
                <div className="formGroup">
                    <label>Meeting Times: </label>
                    <input type="text" ref={meetsRef} defaultValue={course.meets} className={meetsError ? 'inputError' : ''} />
                    {meetsError && <div className="errorMessage">{meetsError}</div>}
                </div>
                <div className="formActions">
                    <button onClick={onSubmit} className="submitButton">Submit</button>
                    <button onClick={() => navigate('/')} className="cancelButton">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditForm;