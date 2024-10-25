import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import Navbar from "../../Navbar";

const SectionsPage = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchId, setSearchId] = useState(""); // state to handle search input
  const [filteredSections, setFilteredSections] = useState([]); // to store filtered sections

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get("https://localhost:7211/api/Section/GetAllSectionDetails");
        setSections(response.data);
        setFilteredSections(response.data); // Initialize with all sections
        setLoading(false);
      } catch (err) {
        setError("Failed to load sections. Please try again.");
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  // Function to handle search input
  const handleSearch = (e) => {
    const id = e.target.value;
    setSearchId(id);

    // If search input is empty, show all sections
    if (id === "") {
      setFilteredSections(sections);
    } else {
      // Filter sections by ID
      const filtered = sections.filter((sectionItem) =>
        sectionItem.sectionId.toString().includes(id)
      );
      setFilteredSections(filtered);
    }
  };

  if (loading) {
    return <div className="loading">Loading sections...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="section-list-container">
        <h2>All Sections</h2>

        {/* Search input */}
        <div className="search-container">
          <input
            type="text"
            value={searchId}
            onChange={handleSearch}
            placeholder="Search by Section ID"
            className="search-input"
          />
        </div>

        <table className="section-table">
          <thead>
            <tr>
              <th>Section ID</th>
              <th>Section Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredSections.length > 0 ? (
              filteredSections.map((sectionItem) => (
                <tr key={sectionItem.sectionId}>
                  <td>{sectionItem.sectionId}</td>
                  <td>{sectionItem.sectionName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="no-results">
                  No sections found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SectionsPage;
