import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Dropdown } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditStudent = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  // State for form fields and loading/error
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    currentAddress: '',
    birthday: '',
    studentId: '',
    degree: '',
  });
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const courses = [
    'CS3202 - UX and UI Engineering',
    'SE3203 - Software Construction Technologies and Tools',
    'SE3202 - Software Modelling',
    'SE3012 - Engineering Foundation for Software',
    'SE3204 - Software Architecture and Design',
    'CS3202 - UX and UI Engineering',
  ];

  // Fetch student data on mount
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
        const student = response.data;
        setFormData({
          firstName: student.firstName || '',
          lastName: student.lastName || '',
          currentAddress: student.currentAddress || '',
          birthday: student.birthday || '', // Assumes ISO format (e.g., "2002-06-12")
          studentId: student.studentId || '',
          degree: student.degree || '',
        });
        // Set courses if available (will be empty with @JsonIgnore)
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

  const handleCourseToggle = (course) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(selectedCourses.filter((c) => c !== course));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found, please log in.');
      }
      const updatedStudent = {
        ...formData,
        coursesEnrolled: selectedCourses, // Matches backend field name
      };
      await axios.put(`http://localhost:8080/api/students/${studentId}`, updatedStudent, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      // Navigate back to student detail page after successful update
      navigate(`/student-detail/${studentId}`);
    } catch (err) {
      console.error('Error updating student:', err);
      setError('Failed to save changes.');
    }
  };

  if (loading) {
    return <div>Loading student data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container
      className="mt-4 p-4"
      style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <h2 className="text-center mb-5" style={{ fontSize: '1.5rem' }}>
        Edit Student Details
      </h2>
      <Form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
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
                placeholder="Enter last name"
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
              placeholder="Enter address"
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
              />
            </Form.Group>
          </div>
          <div className="col-md-6 mb-3">
            <Form.Group controlId="studentId">
              <Form.Label>Student ID</Form.Label>
              <Form.Control
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="Enter student ID"
                disabled // Prevent editing studentId
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
                <Dropdown.Menu style={{ width: '100%' }}>
                  {courses.map((course) => (
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
            <Button variant="secondary">Cancel</Button>
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