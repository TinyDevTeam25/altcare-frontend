import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import userAvatar from "../../assets/jane-doe-avatar.png";
import walletIcon from "../../assets/wallet.png";
import "./PatientHeader.css";
import WalletPopover from "./WalletPopover.jsx";
import ProfilePopover from "./ProfilePopover.jsx";

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
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsWalletOpen(false);
    setIsProfileOpen(false);
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleWallet = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    setIsWalletOpen(!isWalletOpen);
  };

  const toggleProfile = () => {
    setIsMenuOpen(false);
    setIsWalletOpen(false);
    setIsProfileOpen(!isProfileOpen);
  };

  const navLinks = patientNavLinks.map((link) => (
    <Link
      key={link.path}
      to={link.path}
      className={
        location.pathname === link.path ||
        (link.path !== "/patient/dashboard" &&
          location.pathname.startsWith(link.path))
          ? "active"
          : ""
      }
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
          <div
            className="user-profile-patient"
            onClick={toggleProfile}
            style={{ cursor: "pointer" }}
          >
            <img src={userAvatar} alt="Patient Avatar" className="avatar" />
            <span className="user-name">Jane, DOE</span>
          </div>

          {/* THIS IS THE FIX: The standalone Logout button has been removed */}

          <div className="wallet-container">
            <div
              className="wallet-display"
              onClick={toggleWallet}
              style={{ cursor: "pointer" }}
            >
              <img src={walletIcon} alt="Wallet" className="wallet-icon" />
              <span className="wallet-balance">100,000 NGN</span>
            </div>
          </div>
        </div>

        <div className="hamburger-menu" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>

      <nav className="patient-nav-mobile">{navLinks}</nav>

      {/* RENDER POPOVERS */}
      {isWalletOpen && (
        <WalletPopover closePopover={() => setIsWalletOpen(false)} />
      )}
      {isProfileOpen && (
        <ProfilePopover closePopover={() => setIsProfileOpen(false)} />
      )}
    </header>
  );
}

export default PatientHeader;
