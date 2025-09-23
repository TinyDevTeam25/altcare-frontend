import React from "react"; // 1. Import useContext
import { useNavigate } from "react-router-dom"; // 2. Import useNavigate
import { useAuth } from "../../../context/AuthContext.jsx"; // 3. Import AuthContext
import "./ProfileCard.css";
import LogOut from "../../../assets/logout.png";
import image from "../../../assets/jane-doe-avatar.png";
import camera from "../../../assets/camera.png";

const ProfileCard = ({ setshowProfileCard }) => {
  //  Get the user and logout function from the context
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // This clears the user's session
    navigate("/"); // This redirects to the landing page
  };

  return (
    <div className="profileCard" onClick={() => setshowProfileCard(false)}>
      <div className="pcard" onClick={(e) => e.stopPropagation()}>
        {/* Display the user's full email from the context */}
        <p className="email">
          {user ? user.profile?.profile?.full_name || user.profile?.profile?.email || "Guest" : "Guest"}
        </p>
        <div className="profile-info">
          <div className="pics">
            <img src={image} className="profile-image" alt="" />
            <img src={camera} alt="" className="relative" />
          </div>
          <div>
            {/* Display user's name and ID from the context */}
            <p>{user ? user.profile?.profile?.full_name || "Jane Doe" : "Jane Doe"}</p>
            <p>{user?.profile?.id? `ID: ${user.profile?.profile?.id}` : "P-001-XYZ"}</p>
          </div>
        </div>
        <button className="green-btn">Manage your AltCare Account</button>

        {/* 5. The Sign Out button now calls our handleLogout function */}
        <button className="red-btn" onClick={handleLogout}>
          <img src={LogOut} alt="" />
          Sign out of AltCare
        </button>

        <div onClick={() => setshowProfileCard(false)} className="cancel">
          X
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
