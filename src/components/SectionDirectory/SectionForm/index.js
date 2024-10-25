import React, { useState } from "react";
import "./index.css";
import axios from "axios";
import Navbar from "../../Navbar";

const SectionForm = () => {
  const [sectionName, setSectionName] = useState("");
  const [sectionId,setSectionId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    const sectionData = {
      sectionId: sectionId,
      sectionName: sectionName,
    };

    try {
      const response = await axios.post(
        "https://localhost:7211/api/Section/AddSectionDetails",
        sectionData
      );
      if (response.status.toString()[0] === '2') {
        setSuccess(true);
        setSectionName(""); // reset the form
      } else {
        setError("Failed to create section. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while creating the section.");
    }
    setLoading(false);
  };

  return (
    <div className="main-container">
        <Navbar/>
        <div sectionName="section-form-container">
            <h2>Create a New Section</h2>
            {success && <p sectionName="success-message">Section created successfully!</p>}
            {error && <p sectionName="error-message">{error}</p>}
            <form sectionName="section-form" onSubmit={handleSubmit}>
                <div sectionName="form-group">
                <label htmlFor="sectionId">Section Id</label>
                <input
                    type="text"
                    id="sectionId"
                    value={sectionId}
                    onChange={(e) => setSectionId(e.target.value)}
                    required
                    placeholder="Enter section Id"
                />
                <label htmlFor="sectionName">Section Name</label>
                <input
                    type="text"
                    id="sectionName"
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                    required
                    placeholder="Enter section name"
                />
                </div>

                <button type="submit" sectionName="submit-btn" disabled={loading}>
                {loading ? "Creating..." : "Create Section"}
                </button>
        </form>
        </div>
    </div>
  );
};

export default SectionForm
;
