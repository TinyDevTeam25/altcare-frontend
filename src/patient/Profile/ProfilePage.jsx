import React, { useContext } from "react"; // 1. Import useContext
import { AuthContext } from "../../context/AuthContext.jsx"; // 2. Import our context
import { Navigate } from "react-router-dom"; // To protect the page

// Import the child components
import PersonalInfoSection from "./PersonalInfoSection.jsx";
import EmergencyContactSection from "./EmergencyContactSection.jsx";
import AccountSettingsSection from "./AccountSettingsSection.jsx";
import "./Profile.css";

const ProfilePage = () => {
  // 3. Get the user object from the global context
  const { user } = useContext(AuthContext);

  // 4. Page Protection: If no user is logged in, redirect to the sign-in page
  if (!user) {
    return <Navigate to="/signin" />;
  }

  return (
    <main className="profile-page-main-content">
      <h1 className="profile-page-title">My Profile</h1>
      <p className="profile-page-description">
        View and update your personal and contact information.
      </p>

      {/* 5. Pass the real user data down to the child components as props */}
      <PersonalInfoSection userData={user.patient} />
      <EmergencyContactSection emergencyData={user.patient.emergency_contact} />
      <AccountSettingsSection />
    </main>
  );
};

export default ProfilePage;
