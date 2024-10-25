import React, { useState } from "react";
import axios from "axios";
import "./index.css";
import Navbar from "../../Navbar";

const DeleteSection = () => {
  const [sectionId, setSectionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [sectionDetails, setSectionDetails] = useState(null);

  const handleDelete = async () => {
    setLoading(true);
    setMessage(""); 
    try {
      const response = await axios.delete(
        `https://localhost:7211/api/Section/DeleteSectionDetailsById/${sectionId}`
      );
      if (response.status.toString()[0]==='2') {
        setMessage(`Section with ID ${sectionId} has been successfully deleted.`);
        setSectionDetails(null); 
      }
    } catch (error) {
      setMessage("Failed to delete class. Please check the ID or try again.");
    }
    setLoading(false);
  };

  const fetchSectionDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://localhost:7211/api/Section/GetSectionDetailsById/${sectionId}`
      );
      setSectionDetails(response.data);
    } catch (error) {
      setMessage("Section not found. Please check the ID.");
      setSectionDetails(null);
    }
    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <div className="delete-class-container">
        <h2>Delete Section</h2>
        <div className="input-section">
          <label htmlFor="sectionId">Enter Section ID to delete:</label>
          <input
            type="text"
            id="sectionId"
            value={sectionId}
            onChange={(e) => setSectionId(e.target.value)}
            placeholder="Section ID"
          />
          <button onClick={fetchSectionDetails} disabled={!sectionId || loading}>
            {loading ? "Loading..." : "Search Section"}
          </button>
        </div>

        {sectionDetails && (
          <div className="section-details">
            <h3>Section Details</h3>
            <p><strong>ID:</strong> {sectionDetails.sectionId}</p>
            <p><strong>Name:</strong> {sectionDetails.sectionName}</p>
            <button onClick={handleDelete} className="delete-btn">
              {loading ? "Deleting..." : "Delete Section"}
            </button>
          </div>
        )}

        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
};

export default DeleteSection;
