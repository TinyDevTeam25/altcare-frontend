import React from "react";
import "./ProfileCard.css";
import LogOut from "../../../assets/logout.png";
import image from "../../../assets/jane-doe-avatar.png";
import camera from "../../../assets/camera.png";
const ProfileCard = ({ setshowProfileCard }) => {
  return (
    <div className="profileCard" onClick={() => setshowProfileCard(false)}>
      <div className="pcard" onClick={(e) => e.stopPropagation()}>
        <p className="email">janedoe@example.com</p>
        <div className="profile-info">
          <div className="pics">
            <img src={image} className="profile-image" alt="" />
            <img src={camera} alt="" className="relative" />
          </div>
          <div>
            <p>Jane Doe</p>
            <p>P-001-XYZ</p>
          </div>
        </div>
        <button className="green-btn">Manage your AltCare Account</button>
        <button className="red-btn">
          <img src={LogOut} alt="" />
          SIgn out of AltCare
        </button>

        <div onClick={() => setshowProfileCard(false)} className="cancel">X</div>
      </div>
    </div>
  );
};

export default ProfileCard;
