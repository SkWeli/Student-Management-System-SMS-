import React from 'react';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ background: 'linear-gradient(to right, #003087, #005EB8)' }}>
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <img
            src="https://via.placeholder.com/50" // Replace with actual logo URL
            alt="Logo"
            style={{ width: '50px', height: '50px', marginRight: '15px' }}
          />
          <span className="navbar-brand text-white" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            DEPARTMENT OF SOFTWARE ENGINEERING<br />
            FACULTY OF COMPUTING<br />
            GENERAL SIR JOHN KOTELAWALA DEFENCE UNIVERSITY
          </span>
        </div>
        <div className="ms-auto">
          <button className="btn btn-outline-light">
            <i className="bi bi-box-arrow-right me-2"></i>Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;