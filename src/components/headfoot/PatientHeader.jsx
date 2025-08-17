import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Use both Link and useLocation
import logo from "../../assets/logo.png";
import userAvatar from "../../assets/jane-doe-avatar.png";
import walletIcon from "../../assets/wallet-icon.png";
import "./PatientHeader.css";

// Define the navigation links as a single, clean data source
const patientNavLinks = [
  { path: "/patient/dashboard", label: "Dashboard" },
  { path: "/patient/records", label: "My Records" },
  { path: "/patient/appointments", label: "Appointments" },
  { path: "/patient/messages", label: "Messages" },
  { path: "/patient/profile", label: "Profile" },
];

function PatientHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Use the useLocation hook to get the current URL path automatically
  const location = useLocation();

  // Create the list of links by mapping over the data array
  const navLinks = patientNavLinks.map((link) => (
    <Link
      key={link.path}
      to={link.path}
      // The 'active' class is now set automatically by comparing paths
      className={location.pathname === link.path ? "active" : ""}
    >
      {link.label}
    </Link>
  ));

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
