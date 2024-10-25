import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import './index.css';

const SectionDirectory = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="directory-container">
        <h2 className="directory-heading">Section Directory</h2>
        <div className="directory-options">
          <div className="directory-option" onClick={() => navigate('/create-section')}>
            <h3>Create a Section Class</h3>
          </div>
          <div className="directory-option" onClick={() => navigate('/all-sections')}>
            <h3>Display All Sections</h3>
          </div>
          <div className="directory-option" onClick={() => navigate('/delete-section')}>
            <h3>Delete a Section</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionDirectory;
