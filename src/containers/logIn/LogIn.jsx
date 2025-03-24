import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './logIn.css'; // Create this CSS file for custom styles

const LogIn = () => {
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here (e.g., API call to authenticate user)
    console.log('Login Data:', formData);
    // For now, navigate to StudentListPage on successful login
    navigate('/');
  };

  return (
    <div className="login-page">
      <Row className="m-0">
        {/* Left Side: Login Form */}
        <Col md={6} className="d-flex align-items-center justify-content-center">
          <Container className="login-container">
            {/* Logo */}
            <div className="text-center mb-4">
              <img
                src="https://via.placeholder.com/100" // Replace with actual logo URL
                alt="KDU Logo"
                className="login-logo"
              />
            </div>

            {/* University Name */}
            <h2 className="text-center mb-2">
              GENERAL SIR JOHN KOTELAWALA DEFENCE UNIVERSITY
            </h2>
            <h4 className="text-center mb-4">FACULTY OF COMPUTING</h4>

            {/* Login Form */}
            <h5 className="text-center mb-4">Log In</h5>
            <p className="text-center mb-4">Sign in to stay connected.</p>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <Form.Check
                  type="checkbox"
                  id="rememberMe"
                  label="Remember me?"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <a href="#" className="forgot-password">
                  Forgot Password
                </a>
              </div>

              <Button variant="primary" type="submit" className="w-100">
                Sign in
              </Button>
            </Form>
          </Container>
        </Col>

        {/* Right Side: Background Image */}
        <Col
          md={6}
          className="d-none d-md-block background-image"
          style={{
            backgroundImage: `url('https://via.placeholder.com/600x800')`, // Replace with actual image URL
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></Col>
      </Row>
    </div>
  );
};

export default LogIn;