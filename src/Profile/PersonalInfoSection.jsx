import React, { useState } from 'react';
import PersonalInfoIcon from '../assets/user.svg';

const PersonalInfoSection = () => {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'Jane Doe',
    dateOfBirth: '15/01/1990',
    gender: 'Female',
    contactNumber: '+234 (0)123-4567',
    address: '123, address avenue, Address.',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prevInfo => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updating Personal Info:', personalInfo);
    alert('Personal information updated successfully!');
  };

  return (
    <section className="profile-section">
      <h2 className="section-heading">

        <PersonalInfoIcon className="section-icon personal" />

        Personal Information
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="form-label">Full Name</label>
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
            <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
            <input
              type="text"
              id="dateOfBirth"
              name="dateOfBirth"
              value={personalInfo.dateOfBirth}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          {/* Gender */}
          <div>
            <label htmlFor="gender" className="form-label">Gender</label>
            <select
              id="gender"
              name="gender"
              value={personalInfo.gender}
              onChange={handleChange}
              className="form-select"
            >
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
          </div>
          {/* Contact Number */}
          <div>
            <label htmlFor="contactNumber" className="form-label">Contact Number</label>
            <input
              type="text"
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
          <label htmlFor="address" className="form-label">Address</label>
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
        <button
          type="submit"
          className="btn-primary"
        >
          Update Personal Info
        </button>
      </form>
    </section>
  );
};

export default PersonalInfoSection;