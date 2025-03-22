import React, { useState } from 'react';
import { Container, Button, Nav } from 'react-bootstrap';

const CourseHistory = () => {
  // State for active year and semester
  const [activeYear, setActiveYear] = useState('Year 01');
  const [activeSemester, setActiveSemester] = useState('Semester 01');

  // Dummy data for the student (replace with dynamic data later)
  const student = {
    firstName: 'Senuda',
    lastName: 'Weluwatta',
    degree: 'Software Engineering',
    courses: {
      'Year 01': {
        'Semester 01': [
          'CS3202 - UX and UI Engineering',
          'SE3203 - Software Construction Technologies and Tools',
          'SE3202 - Software Modelling',
          'SE3012 - Engineering Foundation for Software',
          'SE3204 - Software Architecture and Design',
          'CS3202 - UX and UI Engineering',
        ],
        'Semester 02': [
          'CS3203 - Advanced Database and Big Data Analytics',
          'CS3202 - Research Methodology',
          'CS3052 - Essentials of Computer Law',
          'CS3092 - Computer and Network Security',
          'CS3072 - Logic Programming',
        ],
      },
      'Year 02': {
        'Semester 01': [],
        'Semester 02': [],
      },
      'Year 03': {
        'Semester 01': [],
        'Semester 02': [],
      },
      'Year 04': {
        'Semester 01': [],
        'Semester 02': [],
      },
    },
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Course History</h2>

      {/* Year Tabs */}
      <Nav variant="pills" className="justify-content-center mb-3">
        {['Year 01', 'Year 02', 'Year 03', 'Year 04'].map((year) => (
          <Nav.Item key={year}>
            <Nav.Link
              active={activeYear === year}
              onClick={() => setActiveYear(year)}
              className="mx-1"
              style={{
                backgroundColor: activeYear === year ? '#005EB8' : '#E9ECEF',
                color: activeYear === year ? 'white' : 'black',
              }}
            >
              {year}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {/* Student Info */}
      <div className="mb-4">
        <div className="row">
          <div className="col-md-6">
            <strong>Student Name</strong>
            <p>{`${student.firstName} ${student.lastName}`}</p>
          </div>
          <div className="col-md-6">
            <strong>Degree</strong>
            <p>{student.degree}</p>
          </div>
        </div>
      </div>

      {/* Semester Tabs and Courses */}
      <Container
        className="p-4"
        style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Nav variant="pills" className="mb-3">
          {['Semester 01', 'Semester 02'].map((semester) => (
            <Nav.Item key={semester}>
              <Nav.Link
                active={activeSemester === semester}
                onClick={() => setActiveSemester(semester)}
                className="mx-1"
                style={{
                  backgroundColor: activeSemester === semester ? '#F28C38' : '#E9ECEF',
                  color: activeSemester === semester ? 'white' : 'black',
                }}
              >
                {semester}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <h5>Courses Enrolled in {activeSemester}</h5>
        <div className="row">
          <div className="col-md-6">
            <ul className="list-unstyled">
              {student.courses[activeYear]['Semester 01'].map((course, index) => (
                <li key={index} className="mb-1">
                  {course}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-6">
            <ul className="list-unstyled">
              {student.courses[activeYear]['Semester 02'].map((course, index) => (
                <li key={index} className="mb-1">
                  {course}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default CourseHistory;