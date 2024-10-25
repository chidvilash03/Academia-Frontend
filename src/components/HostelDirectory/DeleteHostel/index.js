import React, { useState } from "react";
import axios from "axios";
import "./index.css";
import Navbar from "../../Navbar";

const DeleteHostel = () => {
  const [hostelId, setHostelId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [hostelDetails, setHostelDetails] = useState(null);

  // Function to handle the deletion process
  const handleDelete = async () => {
    setLoading(true);
    setMessage(""); // Reset message
    try {
      const response = await axios.delete(
        `https://localhost:7211/api/Hostel/DeleteHostelDetailsById/${hostelId}`
      );
      if (response.status.toString()[0]==='2') {
        setMessage(`Hostel with ID ${hostelId} has been successfully deleted.`);
        setHostelDetails(null); // Clear hostel details after deletion
      }
    } catch (error) {
      setMessage("Failed to delete hostel. Please check the ID or try again.");
    }
    setLoading(false);
  };

  // Fetch and display hostel details before deletion
  const fetchHostelDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://localhost:7211/api/Hostel/GetHostelDetailsById/${hostelId}`
      );
      setHostelDetails(response.data);
    } catch (error) {
      setMessage("Hostel not found. Please check the ID.");
      setHostelDetails(null);
    }
    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <div className="delete-hostel-container">
        <h2>Delete Hostel</h2>
        <div className="input-section">
          <label htmlFor="hostelId">Enter Hostel ID to delete:</label>
          <input
            type="text"
            id="hostelId"
            value={hostelId}
            onChange={(e) => setHostelId(e.target.value)}
            placeholder="Hostel ID"
          />
          <button onClick={fetchHostelDetails} disabled={!hostelId || loading}>
            {loading ? "Loading..." : "Search Hostel"}
          </button>
        </div>

        {hostelDetails && (
          <div className="hostel-details">
            <h3>Hostel Details</h3>
            <p><strong>ID:</strong> {hostelDetails.hostelId}</p>
            <p><strong>Name:</strong> {hostelDetails.hostelName}</p>
            <p><strong>Gender:</strong> {hostelDetails.hostelGender}</p>

            <button onClick={handleDelete} className="delete-btn">
              {loading ? "Deleting..." : "Delete Hostel"}
            </button>
          </div>
        )}

        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
};

export default DeleteHostel;
