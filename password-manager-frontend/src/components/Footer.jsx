import React from 'react';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
import '../styles/Footer.css';
const Footer = () => {
  return (
    <footer className="footer-container">
      {/* Contact Section */}
      
      <div className="footer-contact">
        <p><strong>Contact Me:</strong></p>
        <p>sanjaykumardk753@gmail.com</p>
        <p>+91 9786773268</p>
      </div>

      {/* Follow Me Section */}
      <div className="footer-follow">
        <p><strong>Follow Me:</strong></p>
        <div className="footer-icons">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://github.com/sanjaykumardk" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/sanjaykumardk" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-copyright">
        <p>&copy; 2025 Sanjay Kumar DK. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
