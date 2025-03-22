import React from "react";
import { Container, Form, Button } from 'react-bootstrap';

const AddNewStudent = () => {
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
      <h2 className="text-center mb-4">Add New Students</h2>
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
              <Form.Select>
                <option value="">--</option>
                <option value="Course 1">Course 1</option>
                <option value="Course 2">Course 2</option>
                <option value="Course 3">Course 3</option>
              </Form.Select>
            </Form.Group>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-4">
          <Button variant="outline-secondary" className="d-flex align-items-center">
            <i className="bi bi-plus-circle me-2"></i>
            Add another
          </Button>
          <Button variant="primary" type="submit">
            Add student
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default AddNewStudent;
