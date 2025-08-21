import React, { useState } from "react";
// This import gives you the URL to the icon
import emergencyContactIconUrl from "../../assets/user-octagon.svg";

const EmergencyContactSection = () => {
  const [emergencyContact, setEmergencyContact] = useState({
    fullName: "John Doe",
    contactNumber: "+234 (0)987-6543",
    relationship: "Spouse",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmergencyContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updating Emergency Contact:", emergencyContact);
    alert("Emergency contact updated successfully!");
  };

  return (
    <section className="profile-section">
      <h2 className="section-heading">
        {/* THIS IS THE FIX: Use a standard <img> tag */}
        <img
          src={emergencyContactIconUrl}
          alt="Emergency Contact"
          className="section-icon emergency"
        />
        Emergency Contact
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Full Name */}
          <div>
            <label htmlFor="ecFullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="ecFullName"
              name="fullName"
              value={emergencyContact.fullName}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          {/* Contact Number */}
          <div>
            <label htmlFor="ecContactNumber" className="form-label">
              Contact Number
            </label>
            <input
              type="text"
              id="ecContactNumber"
              name="contactNumber"
              value={emergencyContact.contactNumber}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          {/* Relationship */}
          <div className="form-field-full-width">
            <label htmlFor="ecRelationship" className="form-label">
              Relationship
            </label>
            <input
              type="text"
              id="ecRelationship"
              name="relationship"
              value={emergencyContact.relationship}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>
        {/* Update Button */}
        <button type="submit" className="btn-primary">
          Update Emergency Info
        </button>
      </form>
    </section>
  );
};

export default EmergencyContactSection;