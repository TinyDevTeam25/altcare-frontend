import React from 'react';
import UserAvatarImage from '../assets/jane-doe-avatar.png';


const Header = () => {
  return (
    <header className="header">
      {/* Logo Placeholder */}
      <div className="header-logo-container">
        <div className="header-logo-icon">
          A
        </div>
        <span className="header-app-name">My App</span>
      </div>

      {/* Navigation Links */}
      <nav className="header-nav">
        <a href="#" className="header-nav-link">Dashboard</a>
        <a href="#" className="header-nav-link">My Records</a>
        <a href="#" className="header-nav-link">Appointments</a>
        <a href="#" className="header-nav-link">Messages</a>
        <a href="#" className="header-nav-link active">Profile</a>
      </nav>

      {/* User Info & Logout Button */}
      <div className="header-user-info-container">
        <div className="header-user-details">
            
          <UserAvatarIcon className="header-user-avatar" />

          <img src={UserAvatarImage} alt="User Avatar" className="header-user-avatar" /> 

          <span className="header-user-name">JANE DOE</span>
        </div>
        <button className="btn-logout">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;