import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";
import ProfileSection from "./profileImage.jsx";

import PersonalInfoSection from "./PersonalInfoSection.jsx";
import EmergencyContactSection from "./EmergencyContactSection.jsx";
import AccountSettingsSection from "./AccountSettingsSection.jsx";
import "./Profile.css";

const ProfilePage = () => {
  // ✅ Always call hooks at the top level
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState(user?.profile?.profile || {});

  // Extract top-level account info and emergency contact
  const account = user?.profile || {};
  const emergency = profile?.emergency_contact || {};

  // Redirects / loading states
  if (loading) return <div>Loading Profile...</div>;
  if (!user) return <Navigate to="/signin" replace />;

  // Function to handle profile updates
  const handleProfileUpdate = (updatedData) => {
    setProfile((prev) => ({ ...prev, ...updatedData }));
  };

  return (
    <main className="profile-page-main-content">
      <h1 className="profile-page-title">My Profile</h1>
      <p className="profile-page-description">
        View and update your personal and contact information.
      </p>

      <ProfileSection />

      <PersonalInfoSection
        userData={{
          full_name: profile.full_name,
          gender: profile.gender,
          date_of_birth: profile.date_of_birth,
          phone: profile.phone,
          address: profile.address,
          NIN: profile.NIN,
          email: account?.email, // from top-level account
        }}
        onUpdate={handleProfileUpdate} // pass if the component allows updates
      />

      <EmergencyContactSection emergencyData={emergency} />
      <AccountSettingsSection />
    </main>
  );
};

export default ProfilePage;
