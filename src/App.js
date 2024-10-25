import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/components/Home/index';

import ClassDirectory from './components/ClassDirectory';
import ClassForm from './components/ClassDirectory/ClassForm';
import ClassesPage from './components/ClassDirectory/ClassesPage';
import DeleteClass from './components/ClassDirectory/DeleteClass';

import HostelDirectory from './components/HostelDirectory';
import DeleteHostel from './components/HostelDirectory/DeleteHostel';
import HostelForm from './components/HostelDirectory/HostelForm';
import HostelsPage from './components/HostelDirectory/HostelsPage';

import SectionDirectory from './components/SectionDirectory';
import SectionForm from './components/SectionDirectory/SectionForm';
import DeleteSection from './components/SectionDirectory/DeleteSection';
import SectionsPage from './components/SectionDirectory/SectionsPage';

import StudentDirectory from './components/StudentDirectory';
import DeleteStudent from './components/StudentDirectory/DeleteStudent';
import StudentForm from './components/StudentDirectory/StudentForm';
import StudentsPage from './components/StudentDirectory/StudentsPage';



const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />

        {/* Student Directory */}

        <Route path="/student-directory" element={<StudentDirectory />} />
        <Route path="/create-student" element={<StudentForm />} />
        <Route path="/all-students" element={<StudentsPage />} />
        <Route path="/delete-student" element={<DeleteStudent />} />

        {/* Hostel Directory */}

        <Route path="/hostel-directory" element={<HostelDirectory/>} />
        <Route path="/create-hostel" element={<HostelForm/>} />
        <Route path="/all-hostels" element={<HostelsPage/>} />
        <Route path="/delete-hostel" element={<DeleteHostel/>} />

        {/* Class Directory */}

        <Route path="/class-directory" element={<ClassDirectory/>} />
        <Route path="/create-class" element={<ClassForm/>} />
        <Route path="/all-classes" element={<ClassesPage/>} />
        <Route path="/delete-class" element={<DeleteClass/>} />

        {/* Section Directory */}

        <Route path="/section-directory" element={<SectionDirectory/>} />
        <Route path="/create-section" element={<SectionForm/>} />
        <Route path="/all-sections" element={<SectionsPage/>} />
        <Route path="/delete-section" element={<DeleteSection/>} />

      </Routes>
    </Router>
  );
};

export default App;
