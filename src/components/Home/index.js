import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import './index.css'; // Import the CSS file for styling

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
        <Navbar/>
        <div className="home-container">
            <h1>Welcome to AcademiaHub</h1>
            {/* <div className="options-container">
                <button className="option-button" onClick={() => navigate('/create-student')}>
                Student Registration
                </button>
                <button className="option-button" onClick={() => navigate('/all-students')}>
                All Students
                </button>
            </div> */}
        </div>
    </>
  );
};

export default Home;
