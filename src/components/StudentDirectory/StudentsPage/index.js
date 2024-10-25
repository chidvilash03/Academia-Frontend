import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar';
import './index.css';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch('https://localhost:7211/api/Student/GetAllStudentDetails');
      const data = await response.json();
      setStudents(data);
    };
    fetchStudents();
  }, []);

  const handleShowDetails = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseDetails = () => {
    setSelectedStudent(null);
  };

  // Convert enrollmentNo to string to avoid the error
  const filteredStudents = students.filter(student =>
    student.enrollmentNo.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
        <Navbar/>
        <div className="students-container">
            <h2>All Students</h2>
        <input
            type="text"
            placeholder="Search by enrollment number..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />

        <table className="students-table">
            <thead>
            <tr>
                <th>Enrollment No</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Admission Date</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {filteredStudents.map((student) => (
                <tr key={student.enrollmentNo}>
                <td>{student.enrollmentNo}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{new Date(student.admissionDate).toLocaleDateString()}</td>
                <td>
                    <button className="show-button" onClick={() => handleShowDetails(student)}>
                    Show
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>

        {selectedStudent && (
        <div className="student-details-modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseDetails}>&times;</span>

            {/* Student Information Section */}
            <div className="section">
              <h4 className="section-heading">Student Information</h4>
              <div className="student-info"><strong>Enrollment No:</strong> {selectedStudent.enrollmentNo}</div>
              <div className="student-info"><strong>First Name:</strong> {selectedStudent.firstName}</div>
              <div className="student-info"><strong>Last Name:</strong> {selectedStudent.lastName}</div>
              <div className="student-info"><strong>Admission Date:</strong> {new Date(selectedStudent.admissionDate).toLocaleDateString()}</div>
              <div className="student-info"><strong>Date of Birth:</strong> {new Date(selectedStudent.dateOfBirth).toLocaleDateString()}</div>
              <div className="student-info"><strong>Email:</strong> {selectedStudent.email}</div>
              <div className="student-info"><strong>Mobile:</strong> {selectedStudent.mobile}</div>
            </div>

            {/* Parent Information Section */}
            <div className="section">
              <h4 className="section-heading">Parent Information</h4>
              <div className="student-info"><strong>Father's Name:</strong> {selectedStudent.parent.fatherName}</div>
              <div className="student-info"><strong>Mother's Name:</strong> {selectedStudent.parent.motherName}</div>
              <div className="student-info"><strong>Father Mobile:</strong> {selectedStudent.parent.fatherMobile}</div>
              <div className="student-info"><strong>Mother Mobile:</strong> {selectedStudent.parent.motherMobile}</div>

            </div>

            {/* Guardian Information Section */}
            <div className="section">
              <h4 className="section-heading">Guardian Information</h4>
              <div className="student-info"><strong>Guardian's Name:</strong> {selectedStudent.guardian.guardianName}</div>
              <div className="student-info"><strong>Guardian Mobile:</strong> {selectedStudent.guardian.guardianMobile}</div>

            </div>

            {/* Hostel Information Section */}
            <div className="section">
              <h4 className="section-heading">Hostel Information</h4>
              <div className="student-info"><strong>Hostel Check-In Date:</strong> {new Date(selectedStudent.hosteler.checkInDate).toLocaleDateString()}</div>
              <div className="student-info"><strong>Hostel Check-Out Date:</strong> {new Date(selectedStudent.hosteler.checkOutDate).toLocaleDateString()}</div>
            </div>

          </div>
        </div>
      )}
        </div>
    </div>
  );
};

export default StudentsPage;
