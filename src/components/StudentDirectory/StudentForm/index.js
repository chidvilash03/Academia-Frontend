import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import Navbar from '../../Navbar';

const StudentForm = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('student');
  const [sections, setSections] = useState([]);
  const [classes, setClasses] = useState([]);
  const [hostels, setHostels] = useState([]);
  
  const [student, setStudent] = useState({
    enrollmentNo: 0,
    firstName: '',
    lastName: '',
    admissionDate: '',
    classId: '',
    sectionId: '',
    motherTongue: '',
    religion: '',
    dateOfBirth: '',
    gender: '',
    village: '',
    town: '',
    state: '',
    email: '',
    placeOfBirth: '',
    mobile: '',
    aadharNumber: '',
    parentId: 0,
    parent: {
      parentId: 0,
      fatherName: '',
      fatherOccupation: '',
      fatherMobile: '',
      fatherEmail: '',
      fatherAddress: '',
      motherName: '',
      motherOccupation: '',
      motherMobile: '',
      motherEmail: '',
      motherAddress: ''
    },
    guardianId: 0,
    guardian: {
      guardianId: 0,
      guardianName: '',
      guardianOCCupation: '',
      guardianMobile: '',
      guardianEmail: '',
      guardianAddress: '',
      guardianRelationShip: ''
    },
    hostelerId: 0,
    hosteler: {
      hostelerId: 0,
      checkInDate: '',
      checkOutDate: '',
      isActive: true,
      hostelId: ''
    },
    Photo: '',
    isActive: true
  });

  // console.log(student)

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'student-photo'); 

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/dcqgdxcz3/image/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
            });
            // console.log(response.data.secure_url);
            setStudent({ ...student, Photo: response.data.secure_url }); 
        } catch (error) {
            console.error("Error uploading image:", error.response ? error.response.data : error.message); 
        }
    } else {
        console.error("No file selected."); 
    }
};


  useEffect(() => {
    axios.get('https://localhost:7211/api/Section/GetAllSectionDetails')
      .then(response => setSections(response.data))
      .catch(error => console.error("Error fetching sections:", error));

    axios.get('https://localhost:7211/api/Class/GetAllClassDetails')
      .then(response => setClasses(response.data))
      .catch(error => console.error("Error fetching classes:", error));

    axios.get('https://localhost:7211/api/Hostel/GetAllHostelDetails')
      .then(response => setHostels(response.data))
      .catch(error => console.error("Error fetching hostels:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleParentChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, parent: { ...student.parent, [name]: value } });
  };

  const handleGuardianChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, guardian: { ...student.guardian, [name]: value } });
  };

  const handleHostelerChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, hosteler: { ...student.hosteler, [name]: value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const studentData = { ...student };
    // Send studentData to your API
    axios.post('https://localhost:7211/api/Student/AddStudentDetails', studentData)
      .then(response => {
        console.log("Student added successfully:", response.data);
        navigate('/all-students');
      })
      .catch(error => console.error("Error adding student:", error));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'student':
        return (
          <div className="tab-content">
            <h3>Student Information</h3>
            {renderStudentFields()}
            <div className="form-navigation">
              <button type="button" onClick={() => setActiveTab('parent')} className="next-button">Next</button>
            </div>
          </div>
        );
      case 'parent':
        return (
          <div className="tab-content">
            <h3>Parent Information</h3>
            {renderParentFields()}
            <div className="form-navigation">
              <button type="button" onClick={() => setActiveTab('student')} className="prev-button">Previous</button>
              <button type="button" onClick={() => setActiveTab('guardian')} className="next-button">Next</button>
            </div>
          </div>
        );
      case 'guardian':
        return (
          <div className="tab-content">
            <h3>Guardian Information</h3>
            {renderGuardianFields()}
            <div className="form-navigation">
              <button type="button" onClick={() => setActiveTab('parent')} className="prev-button">Previous</button>
              <button type="button" onClick={() => setActiveTab('hosteler')} className="next-button">Next</button>
            </div>
          </div>
        );
      case 'hosteler':
        return (
          <div className="tab-content">
            <h3>Hosteler Information</h3>
            {renderHostelerFields()}
            <div className="form-navigation">
              <button type="button" onClick={() => setActiveTab('guardian')} className="prev-button">Previous</button>
              <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderStudentFields = () => (
    <>
      <div className="form-group">
        <label>Enrollment No:</label>
        <input type="text" placeholder="Automatically Generated" disabled />
      </div>
      <div className="form-group">
        <label>First Name:</label>
        <input type="text" name="firstName" value={student.firstName} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Last Name:</label>
        <input type="text" name="lastName" value={student.lastName} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Admission Date:</label>
        <input type="date" name="admissionDate" value={student.admissionDate} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Class:</label>
        <select name="classId" value={student.classId} onChange={handleChange} required>
          <option value="">Select Class</option>
          {classes.map(classItem => (
            <option key={classItem.classId} value={classItem.classId}>{classItem.className}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Section:</label>
        <select name="sectionId" value={student.sectionId} onChange={handleChange} required>
          <option value="">Select Section</option>
          {sections.map(section => (
            <option key={section.sectionId} value={section.sectionId}>{section.sectionName}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Gender:</label>
        <select name="gender" value={student.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="form-group">
        <label>Date of Birth:</label>
        <input type="date" name="dateOfBirth" value={student.dateOfBirth} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Mobile:</label>
        <input type="text" name="mobile" value={student.mobile} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" name="email" value={student.email} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Mother Tongue:</label>
        <input type="text" name="motherTongue" value={student.motherTongue} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Religion:</label>
        <input type="text" name="religion" value={student.religion} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Village:</label>
        <input type="text" name="village" value={student.village} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Town:</label>
        <input type="text" name="town" value={student.town} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>State:</label>
        <input type="text" name="state" value={student.state} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Place of Birth:</label>
        <input type="text" name="placeOfBirth" value={student.placeOfBirth} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Aadhar Number:</label>
        <input type="text" name="aadharNumber" value={student.aadharNumber} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Upload Photo:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} required />
      </div>
    </>
  );

  const renderParentFields = () => (
    <>
      <div className="form-group">
        <label>Father's Name:</label>
        <input type="text" name="fatherName" value={student.parent.fatherName} onChange={handleParentChange} required />
      </div>
      <div className="form-group">
        <label>Father's Occupation:</label>
        <input type="text" name="fatherOccupation" value={student.parent.fatherOccupation} onChange={handleParentChange} required />
      </div>
      <div className="form-group">
        <label>Father's Mobile:</label>
        <input type="text" name="fatherMobile" value={student.parent.fatherMobile} onChange={handleParentChange} required />
      </div>
      <div className="form-group">
        <label>Father's Email:</label>
        <input type="email" name="fatherEmail" value={student.parent.fatherEmail} onChange={handleParentChange} required />
      </div>
      <div className="form-group">
        <label>Father's Address:</label>
        <input type="text" name="fatherAddress" value={student.parent.fatherAddress} onChange={handleParentChange} required />
      </div>
      <div className="form-group">
        <label>Mother's Name:</label>
        <input type="text" name="motherName" value={student.parent.motherName} onChange={handleParentChange} required />
      </div>
      <div className="form-group">
        <label>Mother's Occupation:</label>
        <input type="text" name="motherOccupation" value={student.parent.motherOccupation} onChange={handleParentChange} required />
      </div>
      <div className="form-group">
        <label>Mother's Mobile:</label>
        <input type="text" name="motherMobile" value={student.parent.motherMobile} onChange={handleParentChange} required />
      </div>
      <div className="form-group">
        <label>Mother's Email:</label>
        <input type="email" name="motherEmail" value={student.parent.motherEmail} onChange={handleParentChange} required />
      </div>
      <div className="form-group">
        <label>Mother's Address:</label>
        <input type="text" name="motherAddress" value={student.parent.motherAddress} onChange={handleParentChange} required />
      </div>
    </>
  );

  const renderGuardianFields = () => (
    <>
      <div className="form-group">
        <label>Guardian's Name:</label>
        <input type="text" name="guardianName" value={student.guardian.guardianName} onChange={handleGuardianChange} required />
      </div>
      <div className="form-group">
        <label>Guardian's Occupation:</label>
        <input type="text" name="guardianOccupation" value={student.guardian.guardianOccupation} onChange={handleGuardianChange} required />
      </div>
      <div className="form-group">
        <label>Guardian's Mobile:</label>
        <input type="text" name="guardianMobile" value={student.guardian.guardianMobile} onChange={handleGuardianChange} required />
      </div>
      <div className="form-group">
        <label>Guardian's Email:</label>
        <input type="email" name="guardianEmail" value={student.guardian.guardianEmail} onChange={handleGuardianChange} required />
      </div>
      <div className="form-group">
        <label>Guardian's Address:</label>
        <input type="text" name="guardianAddress" value={student.guardian.guardianAddress} onChange={handleGuardianChange} required />
      </div>
      <div className="form-group">
        <label>Relationship:</label>
        <input type="text" name="guardianRelationShip" value={student.guardian.guardianRelationShip} onChange={handleGuardianChange} required />
      </div>
    </>
  );

  const renderHostelerFields = () => (
    <>
      <div className="form-group">
        <label>Check In Date:</label>
        <input type="date" name="checkInDate" value={student.hosteler.checkInDate} onChange={handleHostelerChange} required />
      </div>
      <div className="form-group">
        <label>Check Out Date:</label>
        <input type="date" name="checkOutDate" value={student.hosteler.checkOutDate} onChange={handleHostelerChange} required />
      </div>
      <div className="form-group">
        <label>Hostel:</label>
        <select name="hostelId" value={student.hosteler.hostelId} onChange={handleHostelerChange} required>
          <option value="">Select Hostel</option>
          {hostels.map(hostel => (
            <option key={hostel.hostelId} value={hostel.hostelId}>{hostel.hostelName}</option>
          ))}
        </select>
      </div>
    </>
  );

  return (
    <div className='student-form' >
      <Navbar />
      <form onSubmit={handleSubmit}>
        {renderTabContent()}
      </form>
    </div>
  );
};

export default StudentForm;
