import React, { useState } from "react";
import "./index.css";
import axios from "axios";
import Navbar from "../../Navbar";

const ClassForm = () => {
  const [className, setClassName] = useState("");
  const [classId,setClassId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    const classData = {
      classId: classId,
      className: className,
    };

    try {
      const response = await axios.post(
        "https://localhost:7211/api/Class/AddClassDetails",
        classData
      );
      if (response.status.toString()[0] === '2') {
        setSuccess(true);
        setClassName(""); // reset the form
      } else {
        setError("Failed to create class. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while creating the class.");
    }
    setLoading(false);
  };

  return (
    <div>
        <Navbar/>
        <div className="class-form-container">
        <h2>Create a New Class</h2>
        {success && <p className="success-message">Class created successfully!</p>}
        {error && <p className="error-message">{error}</p>}
        <form className="class-form" onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="classId">Class Id</label>
            <input
                type="text"
                id="classId"
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                required
                placeholder="Enter class Id"
            />
            <label htmlFor="className">Class Name</label>
            <input
                type="text"
                id="className"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                required
                placeholder="Enter class name"
            />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Creating..." : "Create Class"}
            </button>
        </form>
        </div>
    </div>
  );
};

export default ClassForm;
