import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditForm.css';
import {crud} from '../utilities/crud.js'; // Import the crud module
import Modal from 'react-modal';

const EditForm = ({ schedule }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const course = schedule.courses[id];
    const titleRef = useRef(null);
    const meetsRef = useRef(null);
    const [titleError, setTitleError] = useState('');
    const [meetsError, setMeetsError] = useState('');
    const [formData, setFormData] = useState({
      title: course.title,
      meets: course.meets,
    });
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
    const [modalContent, setModalContent] = useState(''); // Modal content state
  
    useEffect(() => {
      setFormData({
        title: course.title,
        meets: course.meets,
      });
    }, [course]);
  
    const meetsPattern = /^(M|Tu|W|Th|F|Sa|Su)*\s\d{1,2}:\d{2}-\d{1,2}:\d{2}$/;
  
    const formValidation = () => {
      const { title, meets } = formData;
  
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
  
    const openModal = (content) => {
      setModalContent(content);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    const onSubmit = async () => {
      if (formValidation()) {
        const data = {
          title: formData.title,
          meets: formData.meets,
        };
  
        // Update the course in Firebase database
        await crud.updateEntry(`/schedule/courses/${id}`, data);
  
        console.log('Course updated successfully');
        openModal('Course updated successfully');
      } else {
        console.log('Unable to update course');
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
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={titleError ? 'inputError' : ''}
            />
            {titleError && <div className="errorMessage">{titleError}</div>}
          </div>
          <div className="formGroup">
            <label>Meeting Times: </label>
            <input
              type="text"
              value={formData.meets}
              onChange={(e) => setFormData({ ...formData, meets: e.target.value })}
              className={meetsError ? 'inputError' : ''}
            />
            {meetsError && <div className="errorMessage">{meetsError}</div>}
          </div>
          <div className="formActions">
            <button onClick={onSubmit} className="submit-button">
              Submit
            </button>
            <button onClick={() => navigate('/')} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
  
        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Success Modal"
        >
          <div>{modalContent}</div>
          <button onClick={closeModal}>Close</button>
        </Modal>
      </div>
    );
  };
  
  export default EditForm;