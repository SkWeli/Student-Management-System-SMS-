import React, { useState, useEffect } from 'react';
import { Container, Nav } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CourseHistory = () => {
  const { studentId } = useParams();
  const [activeYear, setActiveYear] = useState('Year 01');
  const [activeSemester, setActiveSemester] = useState('Semester 01');
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found, please log in.');
        }
        const response = await axios.get(`http://localhost:8080/api/students/${studentId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const fetchedStudent = response.data;
        // Structure courses by year and semester (assuming flat list for now)
        const coursesByYear = {
          'Year 01': {
            'Semester 01': fetchedStudent.coursesEnrolled || [],
            'Semester 02': [], // Adjust based on actual data structure
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
        };
        setStudent({
          firstName: fetchedStudent.firstName,
          lastName: fetchedStudent.lastName,
          degree: fetchedStudent.degree,
          courses: coursesByYear,
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching student:', err);
        setError('Failed to load course history.');
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  if (loading) {
    return <div>Loading course history...</div>;
  }

  if (error || !student) {
    return <div>{error || 'Student not found.'}</div>;
  }

  return (
    <div>
      <h2
        className="text-start px-5 mb-3 ms-2 mt-4 d-inline-block"
        style={{
          backgroundColor: '#28A745',
          color: 'white',
          padding: '10px 15px',
          borderRadius: '5px',
          fontWeight: 'normal',
          fontSize: '1rem',
        }}
      >
        Course History
      </h2>
      <Container className="mt-4">
        {/* Year Tabs */}
        <Nav variant="pills" className="justify-content-center mb-3">
          {['Year 01', 'Year 02', 'Year 03', 'Year 04'].map((year) => (
            <Nav.Item key={year}>
              <Nav.Link
                active={activeYear === year}
                onClick={() => setActiveYear(year)}
                className="mx-3 px-5"
                style={{
                  fontWeight: 'bold',
                  backgroundColor: activeYear === year ? '#005EB8' : 'white',
                  color: activeYear === year ? 'white' : 'black',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                }}
              >
                {year}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        {/* Semester Tabs and Courses */}
        <Container
          className="p-4 px-5"
          style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Nav variant="pills" className="justify-content-end mb-3">
            {['Semester 01', 'Semester 02'].map((semester) => (
              <Nav.Item key={semester}>
                <Nav.Link
                  active={activeSemester === semester}
                  onClick={() => setActiveSemester(semester)}
                  className="mx-0"
                  style={{
                    backgroundColor: activeSemester === semester ? '#F28C38' : '#E6E8EB',
                    color: activeSemester === semester ? 'white' : 'black',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {semester}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>

          {/* Student Info */}
          <div className="mb-4">
            <div className="row">
              <div className="col-md-6">
                <small style={{ color: '#6C757D' }}>Student Name</small>
                <p style={{ fontWeight: 'bold', color: 'black' }}>{`${student.firstName} ${student.lastName}`}</p>
              </div>
              <div className="col-md-6">
                <small style={{ color: '#6C757D' }}>Degree</small>
                <p style={{ fontWeight: 'bold', color: 'black' }}>{student.degree}</p>
              </div>
            </div>
          </div>

          <h5
            className="text-center mb-5"
            style={{
              fontSize: '1.5rem',
              color: '#003087',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            Courses Enrolled in {activeSemester}
          </h5>
          <div className="row">
            <div className="col-md-12">
              <ul className="list-unstyled">
                {student.courses[activeYear][activeSemester].length > 0 ? (
                  student.courses[activeYear][activeSemester].map((course, index) => (
                    <li key={index} className="mb-1" style={{ fontWeight: 'bold', color: 'black' }}>
                      {course}
                    </li>
                  ))
                ) : (
                  <li>No courses enrolled in this semester.</li>
                )}
              </ul>
            </div>
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default CourseHistory;