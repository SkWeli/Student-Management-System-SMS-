import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/KDU_logo.png';
import backgroundImage from '../../assets/backgroundImage.jpeg';
import './resetPassword.css'; // Reuse the same CSS file as LogIn.jsx

const ResetPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setSuccess(''); // Clear previous success messages
    console.log("Submitting reset password request with:", formData);
    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/reset-password',
        {
          email: formData.email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Response from backend:", response);
      console.log("Response data:", response.data);

      // Assuming the backend returns a success message
      setSuccess('A password reset link has been sent to your email.');
      setFormData({ email: '' }); // Clear the form
    } catch (err) {
      console.error("Reset password request failed:", err);
      if (err.response) {
        setError(err.response.data.error || 'Failed to send reset link. Please try again.');
        console.log("Error response from backend:", err.response);
      } else if (err.request) {
        setError('Network error. Please check if the backend is running.');
        console.log("No response received:", err.request);
      } else {
        setError('An unexpected error occurred. Please try again.');
        console.log("Unexpected error:", err.message);
      }
    }
  };

  return (
    <div className="login-page">
      <Row className="m-0">
        {/* Left Side: Reset Password Form */}
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <Container className="login-container" style={{ paddingTop: '40px' }}>
            {/* Logo */}
            <div className="text-center mb-4">
              <img
                src={logo}
                alt="KDU Logo"
                style={{ width: '120px', height: '120px' }}
                className="login-logo"
              />
            </div>

            {/* University Name */}
            <h2 className="text-center mb-2">
              GENERAL SIR JOHN KOTELAWALA DEFENCE UNIVERSITY
            </h2>
            <h4 className="text-center mb-4">FACULTY OF COMPUTING</h4>

            {/* Reset Password Form */}
            <h5 className="text-center mb-4">Reset Password</h5>
            <p className="text-center mb-4">
              Enter your email address & we’ll send you an email with instructions to reset your password
            </p>
            {error && <p className="text-danger text-center">{error}</p>}
            {success && <p className="text-success text-center">{success}</p>}
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

              <Button variant="primary" type="submit" className="w-100">
                Reset
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

export default ResetPassword;