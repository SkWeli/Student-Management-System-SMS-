import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
import "./studentDetailSheet.css";

const StudentDetailSheet = () => {
  const { studentId } = useParams(); // Get the student ID from the URL
  console.log('studentId from useParams:', studentId);
  const navigate = useNavigate();
  const [student, setStudent] = useState(null); // State to hold student data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found, please log in.');
        }
        console.log('Fetching student with ID:', studentId);
        const response = await axios.get(`http://localhost:8080/api/students/${studentId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log('Student data:', response.data);
        setStudent(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching student:', err);
        setError('Failed to load student details.');
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found, please log in.');
        }
        await axios.delete(`http://localhost:8080/api/students/${studentId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        navigate('/'); // Redirect to student list after deletion
      } catch (err) {
        console.error('Error deleting student:', err);
        setError('Failed to delete student.');
      }
    }
  };


  if (loading) {
    return <div>Loading student details...</div>;
  }

  if (error || !student) {
    return <div>{error || 'Student not found.'}</div>;
  }

  return (
    <div>
      <h2
        className="text-start mb-2 ms-2 mt-4 d-inline-block"
        style={{
          backgroundColor: '#28A745',
          color: 'white',
          padding: '10px 15px',
          borderRadius: '5px',
          fontWeight: 'normal',
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
        <div className="mb-4">
          <h6 className="d-flex align-items-center">
            <span className="me-3">Courses Enrolled</span>
            <Link to={`/course-history/${student.id}`}>
              <Button style={{ backgroundColor: '#003087', borderColor: '#003087' }}>Course History</Button>
            </Link>
          </h6>
          <ul className="list-unstyled">
            {student.coursesEnrolled && student.coursesEnrolled.length > 0 ? (
              student.coursesEnrolled.map((course, index) => (
                <li key={index} className="mb-1">
                  {course}
                </li>
              ))
            ) : (
              <li>No courses enrolled.</li>
            )}
          </ul>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-between">
        <Button variant="danger" onClick={handleDelete}>
            Remove Student
          </Button>
          <Link to={`/edit-student/${student.id}`}>
            <Button variant="primary">Edit Details</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default StudentDetailSheet;