import React, { useState, useEffect } from "react";
import personalInfoIconUrl from "../../assets/user.svg";
import apiClient from "../../utils/axiosConfig";
import { useAuth } from "../../context/AuthContext.jsx";

const PersonalInfoSection = ({ userData, onProfileUpdate }) => {
  const { user } = useAuth();

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    address: "",
  });

  // 🔹 Populate form with initial data
  useEffect(() => {
    if (userData) {
      setPersonalInfo({
        fullName: userData.full_name || "",
        dateOfBirth: userData.date_of_birth
          ? userData.date_of_birth.split("T")[0]
          : "",
        gender: userData.gender || "",
        contactNumber: userData.phone || "",
        address: userData.address || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.token) {
      alert("You must be logged in to update your profile.");
      return;
    }

    try {
      const payload = {
        full_name: personalInfo.fullName,
        date_of_birth: personalInfo.dateOfBirth,
        gender: personalInfo.gender,
        phone: personalInfo.contactNumber,
        address: personalInfo.address,
      };

      console.log("🔹 Sending payload:", payload);

      const response = await apiClient.patch("/patient/profile", payload, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      console.log("✅ Update successful:", response.data);
      alert("Profile updated successfully!");

      // ✅ Immediately update local state so UI reflects new info
      setPersonalInfo((prev) => ({
        ...prev,
        ...{
          fullName: payload.full_name,
          dateOfBirth: payload.date_of_birth,
          gender: payload.gender,
          contactNumber: payload.phone,
          address: payload.address,
        },
      }));

      // ✅ Notify parent component if needed
      if (onProfileUpdate) onProfileUpdate(response.data);
    } catch (err) {
      console.error("❌ Profile Update Error:", err.response?.data || err.message);
      alert(
        err.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
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
          <div>
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={personalInfo.fullName}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={personalInfo.dateOfBirth}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div>
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={personalInfo.gender}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

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
