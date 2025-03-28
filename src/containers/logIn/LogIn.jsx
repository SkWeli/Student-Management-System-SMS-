import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/KDU_logo.png';
import backgroundImage from '../../assets/backgroundImage.jpeg';

const LogIn = () => {
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting login request with:", formData); // Log the form data
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });
      console.log("Response from backend:", response); // Log the full response
      console.log("Response data:", response.data); // Log the response data

      // Check if the response contains a token
      if (response.data && response.data.token) {
        // Store the token in localStorage
        localStorage.setItem('token', response.data.token);
        console.log('JWT Token stored:', response.data.token); // For debugging
        // Navigate to the homepage
        navigate('/');
      } else {
        setError('Login successful, but no token received. Please contact support.');
        console.log('No token in response:', response.data);
      }
    } catch (err) {
      console.error("Login request failed:", err); // Log the full error
      // Improved error handling
      if (err.response) {
        // Backend responded with an error status (e.g., 401, 400)
        setError(err.response.data.error || 'Invalid email or password');
        console.log("Error response from backend:", err.response);
      } else if (err.request) {
        // No response from backend (e.g., network error)
        setError('Network error. Please check if the backend is running.');
        console.log("No response received:", err.request);
      } else {
        // Other errors (e.g., request setup error)
        setError('An unexpected error occurred. Please try again.');
        console.log("Unexpected error:", err.message);
      }
      console.error('Login error:', err); // For debugging
    }
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
                src={logo}
                alt="KDU Logo"
                style={{width: '120px', height: '120px'}}
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
            backgroundImage: `url(${backgroundImage})`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></Col>
      </Row>
    </div>
  );
};

export default LogIn;