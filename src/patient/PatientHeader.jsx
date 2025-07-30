import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import userAvatar from "../assets/jane-doe-avatar.png";

function PatientHeader() {
  return (
    <header className="patient-header">
      <div className="header-content-patient">
        <div className="logo-container-patient">
          <Link to="/">
            <img src={logo} alt="AltCare Logo" />
          </Link>
        </div>
        <nav className="patient-nav">
          <Link to="#">Dashboard</Link>
          <Link to="#">My Records</Link>
          <Link to="#" className="active">
            Appointments
          </Link>
          <Link to="#">Messages</Link>
          <Link to="#">Profile</Link>
        </nav>
        <div className="patient-user-actions">
          <div className="user-profile-patient">
            <img src={userAvatar} alt="Patient Avatar" className="avatar" />
            <span className="user-name">Jane, DOE</span>
          </div>
          <Link to="/logout" className="patient-logout-button">
            Logout
          </Link>
        </div>
        {/* ADD THIS FOR MOBILE */}
        <div className="hamburger-menu">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </header>
  );
}

export default PatientHeader;
