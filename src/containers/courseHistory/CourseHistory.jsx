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

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found, please log in.');

        const response = await axios.get(`http://localhost:8080/api/students/${studentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const fetchedStudent = response.data;

        // Categorize flat coursesEnrolled list into year/semester structure
        const courses = {
          'Year 01': { 'Semester 01': [], 'Semester 02': [] },
          'Year 02': { 'Semester 01': [], 'Semester 02': [] },
          'Year 03': { 'Semester 01': [], 'Semester 02': [] },
          'Year 04': { 'Semester 01': [], 'Semester 02': [] },
        };

        (fetchedStudent.coursesEnrolled || []).forEach((course) => {
          for (const year in coursesByYear) {
            for (const semester in coursesByYear[year]) {
              if (coursesByYear[year][semester].includes(course)) {
                courses[year][semester].push(course);
                break;
              }
            }
          }
        });

        setStudent({
          firstName: fetchedStudent.firstName,
          lastName: fetchedStudent.lastName,
          degree: fetchedStudent.degree,
          courses,
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

  if (loading) return <div>Loading course history...</div>;
  if (error || !student) return <div>{error || 'Student not found.'}</div>;

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