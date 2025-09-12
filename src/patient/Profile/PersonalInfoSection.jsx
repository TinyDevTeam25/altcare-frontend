import React, { useState, useEffect } from "react";
import personalInfoIconUrl from "../../assets/user.svg";
import apiClient from "../../utils/axiosConfig"; // For making API calls

// The component now accepts the initial user data as a prop
const PersonalInfoSection = ({ userData }) => {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    address: "",
  });

  // This hook runs when the component loads, populating the form with the user's data
  useEffect(() => {
    if (userData) {
      setPersonalInfo({
        fullName: userData.full_name || "",
        dateOfBirth: userData.d_o_b ? userData.d_o_b.split("T")[0] : "",
        gender: userData.gender || "",
        contactNumber: userData.phone || "",
        address: userData.address || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // This is the API call to update the profile
      const response = await apiClient.put("/patient/get-profile", {
        phone: personalInfo.contactNumber,
        address: personalInfo.address,
        // Add other fields the backend allows to be updated
      });
      // It's good practice to update the UI with the confirmed data from the server
      console.log("Update successful:", response.data);
      alert("Personal information updated successfully!");
    } catch (err) {
      console.error("Profile Update Error:", err);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <section className="profile-section">
      <h2 className="section-heading">
        <img
          src={personalInfoIconUrl}
          alt="Personal Info"
          className="section-icon personal"
        />
        Personal Information
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Full Name (Read-only - users usually can't change their name easily) */}
          <div>
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={personalInfo.fullName}
              className="form-input"
              readOnly
            />
          </div>
          {/* Date of Birth (Read-only) */}
          <div>
            <label htmlFor="dateOfBirth" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={personalInfo.dateOfBirth}
              className="form-input"
              readOnly
            />
          </div>
          {/* Gender (Read-only) */}
          <div>
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={personalInfo.gender}
              className="form-input"
              readOnly
            />
          </div>
          {/* Contact Number (Editable) */}
          <div>
            <label htmlFor="contactNumber" className="form-label">
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={personalInfo.contactNumber}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>
        {/* Address (Editable) */}
        <div className="form-field-full-width">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={personalInfo.address}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="btn-primary">
          Update Personal Info
        </button>
      </form>
    </section>
  );
};

export default PersonalInfoSection;
