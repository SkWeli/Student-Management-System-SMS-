import React from 'react';
import { Container } from "react-bootstrap";
import { BsBoxArrowRight } from "react-icons/bs";

const Header = () => {
  return (
    <>
      {/* Top Row for Log Out */}
      <div className="bg-white py-2 shadow-sm">
        <Container className="d-flex justify-content-end">
          <button className="btn btn-light d-flex align-items-center border-0">
            <BsBoxArrowRight size={20} className="me-2 text-secondary" />
            <span className="text-secondary">Log Out</span>
          </button>
        </Container>
      </div>

      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg" style={{ background: 'linear-gradient(to right, #003087, #005EB8)' }}>
        <Container className="d-flex align-items-center">
          <img
            src="C:/Users/senud/sms-frontend/src/assets/KDU_logo.png" 
            alt="Logo"
            style={{ width: '50px', height: '50px', marginRight: '15px' }}
          />
          <span className="navbar-brand text-white" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            DEPARTMENT OF SOFTWARE ENGINEERING<br />
            FACULTY OF COMPUTING<br />
            GENERAL SIR JOHN KOTELAWALA DEFENCE UNIVERSITY
          </span>
        </Container>
      </nav>
    </>
  );
};

export default Header;