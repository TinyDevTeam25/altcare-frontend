import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

import PersonalInfoSection from "./PersonalInfoSection.jsx";
import EmergencyContactSection from "./EmergencyContactSection.jsx";
import AccountSettingsSection from "./AccountSettingsSection.jsx";
import "./Profile.css";

const ProfilePage = () => {
  const { user, loading } = useAuth();
  console.log("USER FROM CONTEXT ===>", user);

  if (loading) return <div>Loading Profile...</div>;
  if (!user) return <Navigate to="/signin" replace />;

  // ✅ Safely extract data
  // const account = user?.profile;             // main account data (email, role, etc.)
  const profile = user?.profile?.profile;    // nested profile details
  const emergency = profile?.emergency_contact;

  if (!profile) {
    return <div>No profile data found.</div>;
  }

  return (
    <main className="profile-page-main-content">
      <h1 className="profile-page-title">My Profile</h1>
      <p className="profile-page-description">
        View and update your personal and contact information.
      </p>

      <PersonalInfoSection
        userData={{
          full_name: profile?.full_name,
          gender: profile?.gender,
          date_of_birth: profile?.date_of_birth,
          phone: profile?.phone,
          address: profile?.address,
          NIN: profile?.NIN,
          email: user?.email, // from root level
        }}
      />
      <EmergencyContactSection emergencyData={emergency} />
      <AccountSettingsSection />
    </main>
  );
};

export default ProfilePage;
