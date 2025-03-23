import React from 'react';
import { Container, Button } from 'react-bootstrap';
import "./studentDetailSheet.css";

const StudentDetailSheet = () => {
  // Dummy data for the student (replace with dynamic data later)
  const student = {
    firstName: 'Senuda',
    lastName: 'Weluwatta',
    currentAddress: 'No. 38, Old Road, Kottawa, Pannipitiya',
    birthday: '12-06-2002',
    studentId: '57660',
    degree: 'Software Engineering',
    courses: [
      'CS3202 - UX and UI Engineering',
      'CS3203 - Advanced Database and Big Data Analytics',
      'SE3202 - Software Construction Technologies and Tools',
      'CS3202 - Research Methodology',
      'SE3202 - Software Modelling',
      'CS3052 - Essentials of Computer Law',
      'SE3202 - Engineering Foundation for Software',
      'CS3092 - Computer and Network Security',
      'SE3204 - Software Architecture and Design',
      'CS3072 - Logic Programming',
    ],
  };

  return (
    <div>
      {/* Heading outside the container */}
      <h2 
        className="text-start mb-2 ms-2 mt-4 d-inline-block"
        style={{
          backgroundColor: '#28A745',
          color: 'white',
          padding: '10px 15px',
          borderRadius: '5px',
          fontWeight: 'normal', // Not bold
          fontSize: '1.25rem',
        }}
      >
        Student Detail Sheet
      </h2>
    <Container
      className="mt-4 p-5 custom-container"
      style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '1200px',
      }}
    >
      {/* Student Details */}
      <div className="mb-4">
          <div className="row">
            <div className="col-md-6 mb-2">
              <small style={{ color: '#6C757D' }}>First Name</small>
              <p style={{ fontWeight: 'bold', color: 'black' }}>{student.firstName}</p>
            </div>
            <div className="col-md-6 mb-2">
              <small style={{ color: '#6C757D' }}>Last Name</small>
              <p style={{ fontWeight: 'bold', color: 'black' }}>{student.lastName}</p>
            </div>
          </div>
          <div className="mb-2">
            <small style={{ color: '#6C757D' }}>Current Address</small>
            <p style={{ fontWeight: 'bold', color: 'black' }}>{student.currentAddress}</p>
          </div>
          <div className="row">
            <div className="col-md-6 mb-2">
              <small style={{ color: '#6C757D' }}>Birthday</small>
              <p style={{ fontWeight: 'bold', color: 'black' }}>{student.birthday}</p>
            </div>
            <div className="col-md-6 mb-2">
              <small style={{ color: '#6C757D' }}>Student ID Number</small>
              <p style={{ fontWeight: 'bold', color: 'black' }}>{student.studentId}</p>
            </div>
          </div>
          <div className="mb-2">
            <small style={{ color: '#6C757D' }}>Degree</small>
            <p style={{ fontWeight: 'bold', color: 'black' }}>{student.degree}</p>
          </div>
        </div>

      {/* Course History */}
      <div className="mb-">
        <h6 className="d-flex align-items-center">
        <span className="me-3">Course Enrolled</span>
          <Button style={{ backgroundColor: '#003087', borderColor: '#003087' }}>Course History</Button>
        </h6>
        <ul className="list-unstyled">
          {student.courses.map((course, index) => (
            <li key={index} className="mb-1">
              {course}
            </li>
          ))}
        </ul>
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-between">
        <Button variant="danger">Remove Student</Button>
        <Button variant="primary">Edit Details</Button>
      </div>
    </Container>
    </div>
  );
};

export default StudentDetailSheet;