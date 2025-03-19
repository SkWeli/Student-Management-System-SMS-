import React from "react";
import './studentForm.css';

const StudentForm = () => {
  return (
    <div className="card p-5 shadow-sm" style={{ backgroundColor: '#e9ecef', borderRadius: '15px' }}>
      <h2 className="text-center mb-4" style={{ color: '#333' }}>Register New Student</h2>
      <form>
        <div className="mb-3">
          <label className="form-label fw-bold">Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter student name"
            value="John Doe"
            disabled
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Email:</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value="john.doe@example.com"
            disabled
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Phone Number:</label>
          <input
            type="tel"
            className="form-control"
            placeholder="Enter phone number"
            value="123-456-7890"
            disabled
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled>
          Register
        </button>
      </form>
    </div>
  );
};

export default StudentForm;