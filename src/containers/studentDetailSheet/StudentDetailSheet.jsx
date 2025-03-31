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

  // Define the courses by year and semester (same as in AddNewStudent.jsx)
  const coursesByYear = {
    'Year 01': {
      'Semester 01': [
        'CS1012 Fundamentals of Programming',
        'CS1101 Programming Laboratory*',
        'CS1022 Foundation of Computer Science',
        'CS1032 Computer Systems Architecture',
        'CS1043 Fundamentals of Databases',
        'CS1052 Fundamentals of Visual Computing',
        'CM1033 Probability and Statistics',
        'CM1012 Engineering Mathematics',
        'DL1132 English: Basic Study Skills for CS/SE/CE',
        'LS1052 Leadership Training',
        'MS1014 Military Studies I',
      ],
      'Semester 02': [
        'CS1062 Developments in Mathematics and Sciences',
        'CS1073 Object Oriented Programming I',
        'CS1082 Web Development',
        'CS1092 Computer Networks I',
        'CM1052 Discrete Mathematics',
        'COE1993 Group Project in Hardware',
        'EE1102 Fundamentals of Electrical Engineering',
        'ET1102 Basic Electronics',
        'DL2142 English: Advance Study Skills for CS/SE/CE',
        'MS1024 Military Studies II',
      ],
    },
    'Year 02': {
      'Semester 01': [
        'CS2013 Data Structures and Algorithms I',
        'CS2022 Operating Systems',
        'CS2032 Object Oriented Programming II',
        'CS2042 Computer Networks II',
        'CS2052 Requirements Engineering',
        'EE2122 Electronics Systems',
        'CM2013 Calculus and Numerical Methods',
        'MF2113 Principles of Management',
        'MS3032 Strategic Defence Studies',
        'DL3152 Writing and Speaking Skills',
        'MS2044 Military Studies III',
      ],
      'Semester 02': [
        'CS2062 Data Structures and Algorithms II',
        'CS2072 Advanced Computer Architecture and Organization',
        'CS2082 Artificial Intelligence',
        'SE2013 Software Project Management',
        'SE2022 Software Process Engineering',
        'CM2032 Statistical Distributions and Inference',
        'EE2222 Computer Interfacing and Microprocessors',
        'CS2993 Group Project in Software Development',
        'DL4162 Research Writing Skills',
        'MS2024 Military Studies IV',
      ],
    },
    'Year 03': {
      'Semester 01': [
        'CS3202 UX and UI Engineering',
        'CS3023 Advanced Databases and Big Data Analytics',
        'CS3032 Concurrent Programming',
        'CS3042 Image Processing and Computer Vision',
        'CS3052 Essentials of Computer Law',
        'CS3062 Research Methodology',
        'CS3072 Logic Programming',
        'CS3082 Mobile Computing',
        'CS3092 Computer and Network Security',
        'CS3102 Bioinformatics',
        'SE3042 Software Architecture and Design',
      ],
      'Semester 02': [
        'CS3112 Computer Graphics and Visualization',
        'CS3122 Automata Theory',
        'CS3132 High Performance Computing',
        'CS3142 Complex Systems and Agent Technology',
        'CS3152 Information Security',
        'CS3162 Social Aspects of Computing',
        'CS3172 Digital Forensics',
        'CS3182 Modeling and Simulation',
        'CS3192 Nature Inspired Computing',
        'CS3992 Independent Study',
        'CM3013 Operational Research',
        'COE3052 Microcontrollers and Embedded Systems',
      ],
    },
    'Year 04': {
      'Semester 01': [
        'CS4012 Emerging Trends in Computing',
        'CS4022 Theory of Programing Languages',
        'CS4032 Natural Language Processing',
        'CS4042 Machine Learning',
        'SE4042 Software Quality Assurance',
        'CS4062 Artificial Cognitive Systems',
        'CS4072 Computability and Complexity',
        'CS4082 Semantic Web and Ontology',
        'CS4092 Distributed Systems',
        'CS4102 Computer Music',
        'COE4022 Advanced Operating Systems',
        'COE4042 Robotics and Automation',
        'SE4012 Formal Methods and Software Verification',
        'CM4012 Advanced Topics in Statistics',
        'CS4999 Individual Research Project',
      ],
      'Semester 02': [
        'CS4999 Individual Research Project',
        'CS4986 Industrial Training',
      ],
    },
  };

  // Map year and semester values to keys in coursesByYear
  const yearMap = {
    '1': 'Year 01',
    '2': 'Year 02',
    '3': 'Year 03',
    '4': 'Year 04',
  };

  const semesterMap = {
    '1': 'Semester 01',
    '2': 'Semester 02',
  };

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

  // Filter coursesEnrolled to only include courses for the student's year and semester
  const studentYear = yearMap[student.year];
  const studentSemester = semesterMap[student.semester];
  const availableCourses = studentYear && studentSemester
    ? coursesByYear[studentYear]?.[studentSemester] || []
    : [];
  const filteredCourses = student.coursesEnrolled?.filter(course =>
    availableCourses.includes(course)
  ) || [];

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
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                <li key={index} className="mb-1" style = {{fontWeight: 'bold'}}>
                  {course}
                </li>
              ))
            ) : (
              <li>No courses enrolled for this year and semester.</li>
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