import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import userAvatar from "../../assets/jane-doe-avatar.png";

// The component now accepts a prop called 'activePage'
function PatientHeader({ activePage }) {
  return (
    <header className="patient-header">
      <div className="header-content-patient">
        <div className="logo-container-patient">
          <Link to="/">
            <img src={logo} alt="AltCare Logo" />
          </Link>
        </div>
        <nav className="patient-nav">
          {/* We now check the activePage prop to decide which link is active */}
          <Link to="#" className={activePage === "dashboard" ? "active" : ""}>
            Dashboard
          </Link>
          <Link to="#" className={activePage === "records" ? "active" : ""}>
            My Records
          </Link>
          <Link
            to="/patient/appointment-details"
            className={activePage === "appointments" ? "active" : ""}
          >
            Appointments
          </Link>
          <Link
            to="/patient/messages"
            className={activePage === "messages" ? "active" : ""}
          >
            Messages
          </Link>
          <Link to="#" className={activePage === "profile" ? "active" : ""}>
            Profile
          </Link>
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
        {/* You may want to add the hamburger menu here for consistency */}
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
