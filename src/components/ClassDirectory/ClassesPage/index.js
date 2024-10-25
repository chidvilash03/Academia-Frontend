import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import Navbar from "../../Navbar";

const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchId, setSearchId] = useState(""); // state to handle search input
  const [filteredClasses, setFilteredClasses] = useState([]); // to store filtered classes

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("https://localhost:7211/api/Class/GetAllClassDetails");
        setClasses(response.data);
        setFilteredClasses(response.data); // Initialize with all classes
        setLoading(false);
      } catch (err) {
        setError("Failed to load classes. Please try again.");
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  // Function to handle search input
  const handleSearch = (e) => {
    const id = e.target.value;
    setSearchId(id);

    // If search input is empty, show all classes
    if (id === "") {
      setFilteredClasses(classes);
    } else {
      // Filter classes by ID
      const filtered = classes.filter((classItem) =>
        classItem.classId.toString().includes(id)
      );
      setFilteredClasses(filtered);
    }
  };

  if (loading) {
    return <div className="loading">Loading classes...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <Navbar/>
      <div className="class-list-container">
        <h2> All Classes</h2>

        {/* Search input */}
        <div className="search-container">
          <input
            type="text"
            value={searchId}
            onChange={handleSearch}
            placeholder="Search by Class ID"
            className="search-input"
          />
        </div>

        <table className="class-table">
          <thead>
            <tr>
              <th>Class ID</th>
              <th>Class Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredClasses.length > 0 ? (
              filteredClasses.map((classItem) => (
                <tr key={classItem.classId}>
                  <td>{classItem.classId}</td>
                  <td>{classItem.className}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="no-results">
                  No classes found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassesPage;
