import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import userAvatar from "../../assets/jane-doe-avatar.png";
import walletIcon from "../../assets/wallet-icon.png";
import "./PatientHeader.css";

function PatientHeader({ activePage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // We define the links once and reuse them for both desktop and mobile
  const navLinks = (
    <>
      <Link
        to="/patient/dashboard"
        className={activePage === "dashboard" ? "active" : ""}
      >
        Dashboard
      </Link>
      <Link
        to="/patient/records/test-result-header"
        className={activePage === "records" ? "active" : ""}
      >
        My Records
      </Link>
      <Link
        to="/patient/appointments"
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
      <Link
        to="/patient/profile"
        className={activePage === "profile" ? "active" : ""}
      >
        Profile
      </Link>
    </>
  );

  return (
    <header className={`patient-header ${isMenuOpen ? "menu-open" : ""}`}>
      <div className="header-content-patient">
        <div className="logo-container-patient">
          <Link to="/">
            <img src={logo} alt="AltCare Logo" />
          </Link>
        </div>

        <nav className="patient-nav-desktop">{navLinks}</nav>

        <div className="patient-user-actions">
          <div className="user-profile-patient">
            <img src={userAvatar} alt="Patient Avatar" className="avatar" />
            <span className="user-name">Jane, DOE</span>
          </div>
          <Link to="/" className="patient-logout-button">
            Logout
          </Link>
          <div className="wallet-display">
            <img src={walletIcon} alt="Wallet" className="wallet-icon" />
            <span className="wallet-balance">100,000 NGN</span>
          </div>
        </div>

        <div className="hamburger-menu" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>

      <nav className="patient-nav-mobile">{navLinks}</nav>
    </header>
  );
}

export default PatientHeader;
