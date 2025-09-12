import React, { useState, useEffect } from "react";
import emergencyContactIconUrl from "../../assets/user-octagon.svg";
import apiClient from "../../utils/axiosConfig"; // Import apiClient for API calls

// The component now accepts the initial emergency contact data as a prop
const EmergencyContactSection = ({ emergencyData }) => {
  const [emergencyContact, setEmergencyContact] = useState({
    fullName: "",
    contactNumber: "",
    relationship: "",
  });

  // This hook runs when the component loads, populating the form with real data
  useEffect(() => {
    // The emergency_contact object might be null if the user hasn't added one yet
    if (emergencyData) {
      setEmergencyContact({
        fullName: emergencyData.full_name || "",
        contactNumber: emergencyData.phone || "",
        relationship: emergencyData.relationship || "",
      });
    }
  }, [emergencyData]); // This effect depends on the emergencyData prop

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmergencyContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // This is the REAL API call to update the profile
      // We send the emergency contact fields inside a nested object
      const response = await apiClient.put("/patient/get-profile", {
        emergency_name: emergencyContact.fullName,
        emergency_phone: emergencyContact.contactNumber,
        emergency_relationship: emergencyContact.relationship,
      });
      console.log("Update successful:", response.data);
      alert("Emergency contact updated successfully!");
    } catch (err) {
      console.error("Profile Update Error (Emergency):", err);
      alert("Failed to update emergency contact. Please try again.");
    }
  };

  return (
    <section className="profile-section">
      <h2 className="section-heading">
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
              type="tel"
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
        <button type="submit" className="btn-primary">
          Update Emergency Info
        </button>
      </form>
    </section>
  );
};

export default EmergencyContactSection;
