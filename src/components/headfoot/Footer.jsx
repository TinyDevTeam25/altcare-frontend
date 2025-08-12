import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="main-footer-container">
      <div className="footer-content">
        <div className="footer-copyright">
          © 2025 AltCare Pro. All rights reserved.
        </div>
        <nav className="footer-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/faq">FAQ</Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
