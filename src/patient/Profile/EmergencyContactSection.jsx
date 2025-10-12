import React, { useState, useEffect } from "react";
import emergencyContactIconUrl from "../../assets/user-octagon.svg";
import apiClient from "../../utils/axiosConfig";
import { useAuth } from "../../context/AuthContext.jsx"; // ✅ Import auth context

const EmergencyContactSection = ({ emergencyData }) => {
  const { user } = useAuth(); // ✅ Get the logged-in user (with token)

  const [emergencyContact, setEmergencyContact] = useState({
    fullName: "",
    contactNumber: "",
    relationship: "",
  });

  // Populate existing data
  useEffect(() => {
    if (emergencyData) {
      setEmergencyContact({
        fullName: emergencyData.full_name || "",
        contactNumber: emergencyData.contact_number || "",
        relationship: emergencyData.relationship || "",
      });
    }
  }, [emergencyData]);

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmergencyContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.token) {
      alert("You must be logged in to update your emergency contact.");
      return;
    }

    const payload = {
   emergency_name: emergencyContact.fullName,
  emergency_contact_number: emergencyContact.contactNumber,
  emergency_relationship: emergencyContact.relationship,
};


    try {
      console.log("🔹 Sending emergency payload:", payload);

      const response = await apiClient.patch("/patient/profile", payload, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      console.log("✅ Emergency contact updated successfully:", response.data);
      alert("Emergency contact updated successfully!");
    } catch (err) {
      console.error("❌ Profile Update Error (Emergency):", err.response?.data || err.message);
      alert(
        err.response?.data?.message ||
          "Failed to update emergency contact. Please try again."
      );
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
