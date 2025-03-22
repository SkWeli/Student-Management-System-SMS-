import React from 'react';
import { Container } from "react-bootstrap";
import { BsBoxArrowRight } from "react-icons/bs";
import logo from '../../assets/KDU_logo.png';

const Header = () => {
  return (
    <>
      {/* Top Row for Log Out */}
      <div className="bg-white py-1 shadow-sm">
        <Container className="d-flex justify-content-end">
          <button className="btn btn-light btn-sm d-flex align-items-center border-0">
            <BsBoxArrowRight size={16} className="me-2 text-secondary" />
            <span className="text-secondary">Log Out</span>
          </button>
        </Container>
      </div>

      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg " 
      style={{ 
        background: 'linear-gradient(to right, #003087,rgb(21, 83, 200),rgb(12, 131, 243))',
        borderRadius: '0 0 15px 15px',
         }}>
        <Container className="d-flex align-items-center justify-content-start" style={{ gap: '10px', padding: 0, margin: 0 }}>
          <img
            src= {logo}
            alt="Logo"
            style={{ width: '120px', height: '120px', marginLeft: '120px', marginRight: '50px' }}
          />
          <span
            className="text-white"
            style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              lineHeight: '1.2',
              margin: 0,
              padding: 0
            }}
          >
            <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              Department of Software Engineering
            </span>
            <br />
            <span style={{ fontSize: '1.5rem', fontWeight: 'normal' }}>
              Faculty Of Computing
            </span>
            <br />
            <span style={{ fontSize: '1.3rem', fontStyle: 'italic' }}>
              General Sir John Kotelawala Defence University
            </span>
          </span>
        </Container>
      </nav>
    </>
  );
};

export default Header;