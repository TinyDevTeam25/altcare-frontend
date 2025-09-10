import React, { useState, useEffect } from "react";
import personalInfoIconUrl from "../../assets/user.svg";

// The component now accepts 'userData' as a prop
const PersonalInfoSection = ({ userData }) => {
  // The state now includes all fields and is initialized to be empty
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    address: "",
  });

  // This useEffect hook runs when the component loads or when userData changes.
  // It safely populates the form with the real user data from the prop.
  useEffect(() => {
    if (userData) {
      setPersonalInfo({
        fullName: userData.full_name || "",
        // Dates from the backend are often in ISO format (e.g., "1990-01-15T00:00:00.000Z")
        // We split it at the 'T' to get just the 'YYYY-MM-DD' part for the date input.
        dateOfBirth: userData.d_o_b ? userData.d_o_b.split("T")[0] : "",
        gender: userData.gender || "",
        contactNumber: userData.phone || "",
        address: userData.address || "",
      });
    }
  }, [userData]); // This effect depends on the userData prop

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Later, this will be an API call to PUT /api/patient/me
    console.log("Updating Personal Info:", personalInfo);
    alert("Personal information updated successfully!");
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
          {/* Full Name */}
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
          {/* Date of Birth */}
          <div>
            <label htmlFor="dateOfBirth" className="form-label">
              Date of Birth
            </label>
            <input
              type="date" // Using type="date" provides a nice calendar picker
              id="dateOfBirth"
              name="dateOfBirth"
              value={personalInfo.dateOfBirth}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          {/* Gender */}
          <div>
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={personalInfo.gender}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {/* Contact Number */}
          <div>
            <label htmlFor="contactNumber" className="form-label">
              Contact Number
            </label>
            <input
              type="tel" // Using type="tel" is better for phone numbers
              id="contactNumber"
              name="contactNumber"
              value={personalInfo.contactNumber}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>
        {/* Address */}
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
        {/* Update Button */}
        <button type="submit" className="btn-primary">
          Update Personal Info
        </button>
      </form>
    </section>
  );
};

export default PersonalInfoSection;
