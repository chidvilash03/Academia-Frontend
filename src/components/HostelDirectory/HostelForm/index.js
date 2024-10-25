import React, { useState } from "react";
import "./index.css";
import axios from "axios";
import Navbar from "../../Navbar";

const HostelForm = () => {
  const [hostelName, setHostelName] = useState("");
  const [hostelId,setHostelId] = useState(0);
  const [hostelGender, setHostelGender] = useState("Male"); // default to Male
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    const hostelData = {
      hostelId: hostelId,
      hostelName: hostelName,
      hostelGender: hostelGender,
    };

    try {
      const response = await axios.post(
        "https://localhost:7211/api/Hostel/AddHostelDetails",
        hostelData
      );
      if (response.status === 201) {
        setSuccess(true);
        setHostelName(""); // reset the form
        setHostelGender("Male");
      } else {
        setError("Failed to create hostel. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while creating the hostel.");
    }
    setLoading(false);
  };

  return (
    <div>
        <Navbar/>
        <div className="hostel-form-container">
        <h2>Create a New Hostel</h2>
        {success && <p className="success-message">Hostel created successfully!</p>}
        {error && <p className="error-message">{error}</p>}
        <form className="hostel-form" onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="hostelId">Hostel Id</label>
            <input
                type="text"
                id="hostelId"
                value={hostelId}
                onChange={(e) => setHostelId(e.target.value)}
                required
                placeholder="Enter hostel Id"
            />
            <label htmlFor="hostelName">Hostel Name</label>
            <input
                type="text"
                id="hostelName"
                value={hostelName}
                onChange={(e) => setHostelName(e.target.value)}
                required
                placeholder="Enter hostel name"
            />
            </div>

            <div className="form-group">
            <label htmlFor="hostelGender">Hostel Gender</label>
            <select
                id="hostelGender"
                value={hostelGender}
                onChange={(e) => setHostelGender(e.target.value)}
                required
            >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Creating..." : "Create Hostel"}
            </button>
        </form>
        </div>
    </div>
  );
};

export default HostelForm;
