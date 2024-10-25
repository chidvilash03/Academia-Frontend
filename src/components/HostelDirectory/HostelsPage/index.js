import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import Navbar from "../../Navbar";

const HostelsPage = () => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchId, setSearchId] = useState(""); // state to handle search input
  const [filteredHostels, setFilteredHostels] = useState([]); // to store filtered hostels

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await axios.get("https://localhost:7211/api/Hostel/GetAllHostelDetails");
        setHostels(response.data);
        setFilteredHostels(response.data); // Initialize with all hostels
        setLoading(false);
      } catch (err) {
        setError("Failed to load hostels. Please try again.");
        setLoading(false);
      }
    };

    fetchHostels();
  }, []);

  // Function to handle search input
  const handleSearch = (e) => {
    const id = e.target.value;
    setSearchId(id);

    // If search input is empty, show all hostels
    if (id === "") {
      setFilteredHostels(hostels);
    } else {
      // Filter hostels by ID
      const filtered = hostels.filter((hostel) =>
        hostel.hostelId.toString().includes(id)
      );
      setFilteredHostels(filtered);
    }
  };

  if (loading) {
    return <div className="loading">Loading hostels...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="hostel-list-container">
        <h2>All Hostels</h2>

        {/* Search input */}
        <div className="search-container">
          <input
            type="text"
            value={searchId}
            onChange={handleSearch}
            placeholder="Search by Hostel ID"
            className="search-input"
          />
        </div>

        <table className="hostel-table">
          <thead>
            <tr>
              <th>Hostel ID</th>
              <th>Hostel Name</th>
              <th>Hostel Gender</th>
            </tr>
          </thead>
          <tbody>
            {filteredHostels.length > 0 ? (
              filteredHostels.map((hostel) => (
                <tr key={hostel.hostelId}>
                  <td>{hostel.hostelId}</td>
                  <td>{hostel.hostelName}</td>
                  <td>{hostel.hostelGender}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-results">
                  No hostels found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HostelsPage;
