import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="bg-white border-top py-1 fixed-bottom small"
     style={{ 
      padding: '5px 0', 
      fontSize: '11px', 
      height: '25px' 
      }}>
      <div className="container d-flex justify-content-between align-items-center">
        <div>
          <a href="#" className="text-dark me-3 text-decoration-none">Privacy Policy</a>
          <a href="#" className="text-dark text-decoration-none">Terms of Use</a>
        </div>
        <div className="text-decoration-none">&copy; 2025 FACULTY OF COMPUTING</div>
      </div>
    </footer>
  );
};

export default Footer;
