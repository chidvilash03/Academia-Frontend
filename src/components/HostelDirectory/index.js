import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import './index.css';

const HostelDirectory = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="directory-container">
        <h2 className="directory-heading">Hostel Directory</h2>
        <div className="directory-options">
          <div className="directory-option" onClick={() => navigate('/create-hostel')}>
            <h3>Create a New Hostel</h3>
          </div>
          <div className="directory-option" onClick={() => navigate('/all-hostels')}>
            <h3>Display All Hostels</h3>
          </div>
          <div className="directory-option" onClick={() => navigate('/delete-hostel')}>
            <h3>Delete a Hostel</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default HostelDirectory;
