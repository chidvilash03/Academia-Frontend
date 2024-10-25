import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './index.css'; 

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname; // Get the current pathimport { useLocation } from 'react-router-dom';
  console.log(currentPath)
  return (
    <nav className="navbar">
        <Link to="/" className='nav-logo'>
           <h3 className='nav-head' >AcademiaHub</h3>
        </Link>
        <ul className="navbar-links">
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/student-directory">Student Directory</Link>
            </li>
            <li>
                <Link to="/hostel-directory">Hostel Directory</Link>
            </li>
            <li>
                <Link to="/class-directory">Class Directory</Link>
            </li>
            <li>
                <Link to="/section-directory">Section Directory</Link>
            </li>
        </ul>
    </nav>
  );
};

export default Navbar;      
