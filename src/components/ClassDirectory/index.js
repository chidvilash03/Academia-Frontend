import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import './index.css';

const ClassDirectory = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="directory-container">
        <h2 className="directory-heading">Class Directory</h2>
        <div className="directory-options">
          <div className="directory-option" onClick={() => navigate('/create-class')}>
            <h3>Create a New Class</h3>
          </div>
          <div className="directory-option" onClick={() => navigate('/all-classes')}>
            <h3>Display All Classes</h3>
          </div>
          <div className="directory-option" onClick={() => navigate('/delete-class')}>
            <h3>Delete a Class</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassDirectory;
