import React from 'react';
import { Container, Button } from 'react-bootstrap';

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
    <Container
      className="mt-4 p-4"
      style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
      }}
    >
      <h2 className="text-center mb-4">Student Detail Sheet</h2>

      {/* Student Details */}
      <div className="mb-4">
        <div className="row">
          <div className="col-md-6 mb-2">
            <strong>First Name</strong>
            <p>{student.firstName}</p>
          </div>
          <div className="col-md-6 mb-2">
            <strong>Last Name</strong>
            <p>{student.lastName}</p>
          </div>
        </div>
        <div className="mb-2">
          <strong>Current Address</strong>
          <p>{student.currentAddress}</p>
        </div>
        <div className="row">
          <div className="col-md-6 mb-2">
            <strong>Birthday</strong>
            <p>{student.birthday}</p>
          </div>
          <div className="col-md-6 mb-2">
            <strong>Student ID</strong>
            <p>{student.studentId}</p>
          </div>
        </div>
        <div className="mb-2">
          <strong>Degree</strong>
          <p>{student.degree}</p>
        </div>
      </div>

      {/* Course History */}
      <div className="mb-4">
        <h5 className="d-flex align-items-center">
          Course History
          <Button variant="link" className="ms-2 p-0" style={{ fontSize: '0.9rem', color: '#007BFF' }}>
            See More
          </Button>
        </h5>
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
  );
};

export default StudentDetailSheet;