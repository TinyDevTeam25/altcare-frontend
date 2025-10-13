import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import logo from "../../assets/Logo.png";
import userAvatar from "../../assets/jane-doe-avatar.png";
import "./HospitalHeader.css";
import { clearHospitalAuth } from "../../utils/hospitalAuth.js";

// Hospital admin navigation links
const hospitalNavLinks = [
  { path: "/hospital-portal", label: "Dashboard" },
  { path: "/hospital-portal/personnel", label: "Personnel" },
  { path: "/hospital-portal/appointments", label: "Appointments" },
  { path: "/hospital-portal/reports", label: "Reports" },
  { path: "/hospital-portal/settings", label: "Settings" },
];

function HospitalHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsProfileOpen(false);
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    logout();
    clearHospitalAuth();
    setTimeout(() => {
      window.location.href = "/professional/hospital-signin";
    }, 1000);
  };

  const navLinks = hospitalNavLinks.map((link) => (
    <Link
      key={link.path}
      to={link.path}
      className={
        location.pathname === link.path ||
        (link.path !== "/hospital-portal" &&
          location.pathname.startsWith(link.path))
          ? "active"
          : ""
      }
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={`hospital-header ${isMenuOpen ? "menu-open" : ""}`}>
      <div className="header-content-hospital">
        <div className="logo-container-hospital">
          <Link to="/">
            <img src={logo} alt="AltCare Logo" />
          </Link>
        </div>

        <nav className="hospital-nav-desktop">{navLinks}</nav>

        <div className="hospital-user-actions">
          <div
            className="user-profile-hospital"
            onClick={toggleProfile}
            style={{ cursor: "pointer" }}
          >
            <img
              src={userAvatar}
              alt="Hospital Admin Avatar"
              className="avatar"
            />
            <span className="user-name">
              {user?.hospital?.admin_name || "Admin"}
            </span>
          </div>

          <div className="hamburger-menu" onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </div>

      <nav className="hospital-nav-mobile">{navLinks}</nav>

      {/* Profile Dropdown */}
      {isProfileOpen && (
        <div className="profile-dropdown">
          <div className="profile-info">
            <img src={userAvatar} alt="Admin Avatar" />
            <div>
              <p className="profile-name">
                {user?.hospital?.admin_name || "Admin"}
              </p>
              <p className="profile-role">Hospital Administrator</p>
            </div>
          </div>
          <div className="profile-actions">
            <Link to="/hospital-portal/settings" className="profile-link">
              Settings
            </Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default HospitalHeader;
