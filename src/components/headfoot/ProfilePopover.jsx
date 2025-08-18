import React from "react";
import { Link } from "react-router-dom";
import "./ProfilePopover.css";
import userAvatar from "../../assets/jane-doe-avatar.png";
import cameraIcon from "../../assets/camera.png";
import logoutIcon from "../../assets/logout.png";

function ProfilePopover({ closePopover }) {
  const handleCardClick = (e) => e.stopPropagation();

  return (
    <div className="popover-overlay" onClick={closePopover}>
      <div className="profile-popover-card" onClick={handleCardClick}>
        <button onClick={closePopover} className="popover-close-btn">
          X
        </button>
        <p className="profile-email">janedoe@example.com</p>
        <div className="profile-info">
          <div className="profile-pics">
            <img src={userAvatar} className="profile-image" alt="Jane Doe" />
            <img src={cameraIcon} alt="Change" className="camera-icon" />
          </div>
          <div className="profile-details">
            <p className="name">Jane Doe</p>
            <p className="id">P-001-XYZ</p>
          </div>
        </div>
        <div className="profile-actions">
          <Link to="/patient/profile/manage" className="popover-button green">
            Manage your AltCare Account
          </Link>
          <Link to="/" className="popover-button red">
            <img src={logoutIcon} alt="Sign out" />
            <span>Sign out of AltCare</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfilePopover;
