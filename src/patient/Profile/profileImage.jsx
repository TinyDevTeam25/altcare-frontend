import React, { useState } from "react";
import { Camera } from "lucide-react";
import  "./Profile.css";

export default function ProfileSection() {
  const [profileImage, setProfileImage] = useState("/default-avatar.jpg");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleDelete = () => {
    setProfileImage("/default-avatar.jpg");
  };
  

  return (
    <div className="profile-container">

      <div className="profile-box">
        <div className="image-section">
          <div className="image-wrapper">
            <img src={profileImage} alt="Profile" className="profile-img" />
            <label htmlFor="upload" className="camera-btn">
              <Camera size={16} />
              <input
                id="upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden-input"
              />
            </label>
          </div>
        </div>

        <div className="button-section">
          <label htmlFor="upload-btn" className="upload-label">
            Upload New
            <input
              id="upload-btn"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden-input"
            />
          </label>

          <button className="delete-btn" onClick={handleDelete}>
            Delete Photo
          </button>
        </div>
      </div>
    </div>
  );
}
