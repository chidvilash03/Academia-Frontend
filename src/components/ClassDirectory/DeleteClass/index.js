import React, { useState } from "react";
import axios from "axios";
import "./index.css";
import Navbar from "../../Navbar";

const DeleteClass = () => {
  const [classId, setClassId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [classDetails, setClassDetails] = useState(null);

  // Function to handle the deletion process
  const handleDelete = async () => {
    setLoading(true);
    setMessage(""); // Reset message
    try {
      const response = await axios.delete(
        `https://localhost:7211/api/Class/DeleteClassDetailsById/${classId}`
      );
      if (response.status.toString()[0]==='2') {
        setMessage(`Class with ID ${classId} has been successfully deleted.`);
        setClassDetails(null); // Clear class details after deletion
      }
    } catch (error) {
      setMessage("Failed to delete class. Please check the ID or try again.");
    }
    setLoading(false);
  };

  // Fetch and display class details before deletion
  const fetchClassDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://localhost:7211/api/Class/GetClassDetailsById/${classId}`
      );
      setClassDetails(response.data);
    } catch (error) {
      setMessage("Class not found. Please check the ID.");
      setClassDetails(null);
    }
    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <div className="delete-class-container">
        <h2>Delete Class</h2>
        <div className="input-section">
          <label htmlFor="classId">Enter Class ID to delete:</label>
          <input
            type="text"
            id="classId"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            placeholder="Class ID"
          />
          <button onClick={fetchClassDetails} disabled={!classId || loading}>
            {loading ? "Loading..." : "Search Class"}
          </button>
        </div>

        {classDetails && (
          <div className="class-details">
            <h3>Class Details</h3>
            <p><strong>ID:</strong> {classDetails.classId}</p>
            <p><strong>Name:</strong> {classDetails.className}</p>
            <button onClick={handleDelete} className="delete-btn">
              {loading ? "Deleting..." : "Delete Class"}
            </button>
          </div>
        )}

        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
};

export default DeleteClass;
