import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function ProfessionalHeader() {
  return (
    <header className="professional-header">
      <div className="header-content-pro">
        <div className="logo-container-pro">
          <Link to="/">
            <img src={logo} alt="AltCare Logo" />
          </Link>
        </div>
        <nav className="professional-nav">
          <Link to="#" className="active">
            Dashboard
          </Link>
          <Link to="#">Patients</Link>
          <Link to="#">Appointments</Link>
          <Link to="#">Messages</Link>
          <Link to="#">My Profile</Link>
        </nav>
        <div className="professional-user-actions">
          <span className="logged-in-as">Logged in as Dr. Erica Browne</span>
          <Link to="/logout" className="professional-logout-button">
            Logout
          </Link>
        </div>

        <div className="hamburger-menu">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </header>
  );
}

export default ProfessionalHeader;
