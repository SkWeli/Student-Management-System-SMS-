import React, { useState } from 'react';
import { Container, Form, Button, Dropdown } from 'react-bootstrap';

const AddNewStudent = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const courses = [
          'CS3202 - UX and UI Engineering',
          'SE3203 - Software Construction Technologies and Tools',
          'SE3202 - Software Modelling',
          'SE3012 - Engineering Foundation for Software',
          'SE3204 - Software Architecture and Design',
          'CS3202 - UX and UI Engineering',
        ];

  const handleCourseToggle = (course) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(selectedCourses.filter((c) => c !== course));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

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
        Add New Student
      </h2>
      <Form>
        <div className="row">
          <div className="col-md-6 mb-3">
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
          </div>
          <div className="col-md-6 mb-3">
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
          </div>
        </div>

        <div className="mb-3">
          <Form.Group controlId="currentAddress">
            <Form.Label>Current Address</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <Form.Group controlId="birthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control type="date" placeholder="" />
            </Form.Group>
          </div>
          <div className="col-md-6 mb-3">
            <Form.Group controlId="idNumber">
              <Form.Label>ID Number</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <Form.Group controlId="degree">
              <Form.Label>Degree</Form.Label>
              <Form.Select>
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
                  Select Courses
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ width: '100%' }}>
                  {courses.map((course) => (
                    <div
                      key={course}
                      className="px-3 py-2 d-flex align-items-center"
                      onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
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
          <Button variant="outline-secondary" className="d-flex align-items-center">
            <span
              className="me-2"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '20px',
                height: '20px',
                border: '1px solid #6c757d',
                borderRadius: '50%',
                fontSize: '14px',
              }}
            >
              +
            </span>
            Add another
          </Button>
          <Button variant="primary" type="submit">
            Add student
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddNewStudent;