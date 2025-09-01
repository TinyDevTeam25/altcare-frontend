import React from "react";

// DELETED: import Header from './Header';
// DELETED: import Footer from './Footer';

// These are the components that are UNIQUE to the profile page, which is correct.
import PersonalInfoSection from "./PersonalInfoSection.jsx";
import EmergencyContactSection from "./EmergencyContactSection.jsx";
import AccountSettingsSection from "./AccountSettingsSection.jsx";

import "./Profile.css";

const ProfilePage = () => {
  // It now ONLY returns the <main> content for the profile page.
  // The header and footer are provided automatically by the PatientLayout.
  return (
    <main className="profile-page-main-content">
      <h1 className="profile-page-title">My Profile</h1>
      <p className="profile-page-description">
        View and update your personal and contact information.
      </p>

      <PersonalInfoSection />
      <EmergencyContactSection />
      <AccountSettingsSection />
    </main>
  );
};

export default ProfilePage;
