import React, { useState } from 'react';
import axios from 'axios';
import './index.css'
import Navbar from '../../Navbar';

const DeleteStudent = () => {
    const [studentId, setStudentId] = useState('');
    const [studentDetails, setStudentDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const fetchStudentDetails = async () => {
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');
        try {
            const response = await axios.get(`https://localhost:7211/api/Student/GetStudentDetailsById/${studentId}`);
            setStudentDetails(response.data);
        } catch (error) {
            setErrorMessage('Error fetching student details. Please check the ID.');
        }
        setLoading(false);
    };

    const deleteStudent = async () => {
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');
        try {
            await axios.delete(`https://localhost:7211/api/Student/DeleteStudentDetailsById/${studentId}`);
            setSuccessMessage('Student deleted successfully.');
            setStudentDetails(null); 
        } catch (error) {
            setErrorMessage('Error deleting the student. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div>
            <Navbar/>
            <div className="delete-student-container">
                <h2>Delete a Student</h2>
                <div className="form-group">
                    <label htmlFor="studentId">Enter Student ID</label>
                    <input
                        type="text"
                        id="studentId"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        placeholder="Enter Student ID"
                    />
                    <button onClick={fetchStudentDetails} disabled={!studentId} className="fetch-button">
                        Fetch Details
                    </button>
                </div>

                {loading && <div className="loading-bar">Loading...</div>}

                {errorMessage && <div className="error-message">{errorMessage}</div>}

                {studentDetails && (
                    <div className="student-details">
                        <h3>Student Details</h3>
                        <p><strong>ID:</strong> {studentDetails.enrollmentNo}</p>
                        <p><strong>Name:</strong> {studentDetails.firstName} {studentDetails.lastName}</p>
                        <p><strong>Class ID:</strong> {studentDetails.classId}</p>
                        <p><strong>Section ID:</strong> {studentDetails.sectionId}</p>
                        <button onClick={deleteStudent} className="delete-button">Delete Student</button>
                    </div>
                )}

                {successMessage && <div className="success-message">{successMessage}</div>}
            </div>
        </div>
    );
};

export default DeleteStudent;
