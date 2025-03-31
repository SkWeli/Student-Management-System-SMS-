import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Dropdown } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditStudent = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    currentAddress: '',
    birthday: '',
    idNumber: '',
    degree: '',
    studentId: '',
  });
  const [selectedCourses, setSelectedCourses] = useState([]);
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

  const allCourses = Object.values(coursesByYear).flatMap(semesters =>
    Object.values(semesters).flat()
  );

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
        const student = response.data;
        setFormData({
          firstName: student.firstName || '',
          lastName: student.lastName || '',
          currentAddress: student.currentAddress || '',
          birthday: student.birthday || '',
          idNumber: student.idNumber || '',
          degree: student.degree || '',
          studentId: student.studentId || '',
        });
        setSelectedCourses(student.coursesEnrolled || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching student:', err);
        setError('Failed to load student data.');
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCourseToggle = (course) => {
    setSelectedCourses((prev) =>
      prev.includes(course)
        ? prev.filter((c) => c !== course)
        : [...prev, course]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found, please log in.');

      const updatedStudent = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        currentAddress: formData.currentAddress,
        birthday: formData.birthday,
        idNumber: formData.idNumber,
        degree: formData.degree,
        studentId: formData.studentId,
        coursesEnrolled: selectedCourses,
      };

      console.log('PUT Payload for /api/students:', JSON.stringify(updatedStudent, null, 2));
      const response = await axios.put(
        `http://localhost:8080/api/students/${studentId}`,
        updatedStudent,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Student updated:', response.data);
      navigate(`//${studentId}`);
    } catch (err) {
      console.error('Error updating student:', err);
      const errorMessage = err.response?.data?.error || 'Failed to update student.';
      if (errorMessage.includes('duplicate key value violates unique constraint')) {
        alert(`The student ID "${formData.studentId}" is already registered. Please check your ID number and try again.`);
      } else {
        setError(errorMessage);
      }
    }
  };

  if (loading) return <div>Loading student data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container
      className="mt-4 p-4"
      style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <h2 className="text-center mb-5" style={{ fontSize: '1.5rem' }}>
        Edit Student Details
      </h2>
      <Form onSubmit={handleSubmit}>
        {error && <p className="text-danger text-center">{error}</p>}
        <div className="row">
          <div className="col-md-6 mb-3">
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col-md-6 mb-3">
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </div>
        </div>

        <div className="mb-3">
          <Form.Group controlId="currentAddress">
            <Form.Label>Current Address</Form.Label>
            <Form.Control
              type="text"
              name="currentAddress"
              value={formData.currentAddress}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <Form.Group controlId="birthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col-md-6 mb-3">
            <Form.Group controlId="idNumber">
              <Form.Label>ID Number (Student ID)</Form.Label>
              <Form.Control
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                required
                disabled // Prevent changing studentId
              />
            </Form.Group>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <Form.Group controlId="degree">
              <Form.Label>Degree</Form.Label>
              <Form.Select
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                required
              >
                <option value="">--</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Computer Engineering">Computer Engineering</option>
                <option value="Data Science">Data Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Information Systems">Information Systems</option>
              </Form.Select>
            </Form.Group>
          </div>
          <div className="col-md-6 mb-3">
            <Form.Group controlId="coursesEnrolled">
              <Form.Label>Courses Enrolled</Form.Label>
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="dropdown-courses"
                  style={{ width: '100%', textAlign: 'left' }}
                >
                  {selectedCourses.length > 0 ? `${selectedCourses.length} courses selected` : 'Select Courses'}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ width: '100%', maxHeight: '300px', overflowY: 'auto' }}>
                  {allCourses.map((course) => (
                    <div
                      key={course}
                      className="px-3 py-2 d-flex align-items-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Form.Check
                        type="checkbox"
                        id={`course-${course}`}
                        checked={selectedCourses.includes(course)}
                        onChange={() => handleCourseToggle(course)}
                        label={course}
                      />
                    </div>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-5">
          <Link to={`/student-detail/${studentId}`}>
            <Button variant="outline-secondary">Cancel</Button>
          </Link>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditStudent;