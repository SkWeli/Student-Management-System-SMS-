import React from 'react';


const Footer = () => {
  return (
    <footer
      className="bg-white border-top small"
      style={{
        padding: '0', // Remove padding to control height precisely
        fontSize: '11px',
        height: '25px', // Fixed height
        marginTop: '20px', // Fixed margin above footer
        overflow: 'hidden', // Prevent content from stretching the footer
        display: 'flex', // Use flex to center content
        alignItems: 'center', // Vertically center content
      }}
    >
      <div
        className="container d-flex justify-content-between align-items-center"
        style={{
          lineHeight: '1', // Reduce line height to fit text within 25px
          height: '100%', // Ensure inner div takes full height
        }}
      >
        <div>
          <a href="#" className="text-dark me-3 text-decoration-none">Privacy Policy</a>
          <a href="#" className="text-dark text-decoration-none">Terms of Use</a>
        </div>
        <div className="text-decoration-none">© 2025 FACULTY OF COMPUTING</div>
      </div>
    </footer>
  );
};

export default Footer;