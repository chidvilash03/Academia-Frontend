import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import './index.css';

const StudentDirectory = () => {
  const navigate = useNavigate();

  return (
    <>
     <Navbar/>
     <div className="directory-container">
      <h2 className="directory-heading">Student Directory</h2>
      <div className="directory-options">
        <div className="directory-option" onClick={() => navigate('/create-student')}>
          <h3>Create a New Student</h3>
        </div>
        <div className="directory-option" onClick={() => navigate('/all-students')}>
          <h3>Display All Students</h3>
        </div>
        <div className="directory-option" onClick={() => navigate('/delete-student')}>
          <h3>Delete a Student</h3>
        </div>
      </div>
    </div>
    </>
  );
};

export default StudentDirectory;
