import React, { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import "./Profile.css";

export default function ProfileSection() {
  const [profileImage, setProfileImage] = useState(null);

  // ✅ Load saved image (Base64) from localStorage on mount
  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    } else {
      setProfileImage("/default-avatar.jpg");
    }
  }, []);

  // ✅ Convert uploaded file to Base64 and save in localStorage
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setProfileImage(base64Image);
        localStorage.setItem("profileImage", base64Image);

        // ✅ Dispatch a custom event to update ProfileCard instantly
        window.dispatchEvent(new Event("profileImageUpdated"));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    setProfileImage("/default-avatar.jpg");
    localStorage.removeItem("profileImage");

    // ✅ Trigger update across components too
    window.dispatchEvent(new Event("profileImageUpdated"));
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <div className="image-section">
          <div className="image-wrapper">
            <img
              src={profileImage || "/default-avatar.jpg"}
              alt="Profile"
              className="profile-img"
            />
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
