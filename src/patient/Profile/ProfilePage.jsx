// import React from "react"; // 1. Import React
// import { useAuth } from "../../context/AuthContext.jsx"; // 2. Import our context
// import { Navigate } from "react-router-dom"; // To protect the page

// // Import the child components
// import PersonalInfoSection from "./PersonalInfoSection.jsx";
// import EmergencyContactSection from "./EmergencyContactSection.jsx";
// import AccountSettingsSection from "./AccountSettingsSection.jsx";
// import "./Profile.css";

// const ProfilePage = () => {
//   // 3. Get the user object and loading state from the global context
//   const { user, loading } = useAuth();

//   if (loading) {
//     // 4a. While loading, show a loading message
//     return <div>Loading profile...</div>;
//   }

//   // 4. Page Protection: If no user is logged in, redirect to the sign-in page
//   if (!user) {
//     return <Navigate to="/signin" replace />;
//   }

//   return (
//     <main className="profile-page-main-content">
//       <h1 className="profile-page-title">My Profile</h1>
//       <p className="profile-page-description">
//         View and update your personal and contact information.
//       </p>

//       {/* 5. Pass the real user data down to the child components as props */}
//       <PersonalInfoSection userData={user.patient} />
//       <EmergencyContactSection emergencyData={user.patient.emergency_contact} />
//       <AccountSettingsSection />
//     </main>
//   );
// };

// export default ProfilePage;
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";
import apiClient from "../../utils/axiosConfig.js";

import PersonalInfoSection from "./PersonalInfoSection.jsx";
import EmergencyContactSection from "./EmergencyContactSection.jsx";
import AccountSettingsSection from "./AccountSettingsSection.jsx";
import "./Profile.css";

const ProfilePage = () => {
  const { user, loading: authLoading } = useAuth();

  // We add a new local state to hold the profile data we fetch
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      // If the user data is already in the context, we can use it directly.
      if (user) {
        setProfileData(user.patient);
        setLoading(false);
        return;
      }

      // If no user in context (e.g., after a refresh), we fetch it from the API.
      try {
        const response = await apiClient.get("/patient/get-profile");
        setProfileData(response.data);
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      } finally {
        setLoading(false);
      }
    };

    // Only run the fetch logic after the AuthContext has finished its initial load
    if (!authLoading) {
      fetchProfileData();
    }
  }, [user, authLoading]); // Re-run if user or authLoading changes

  // While either context or the page is loading, show a loading message.
  if (authLoading || loading) {
    return <div>Loading Profile...</div>;
  }

  // If there's no user or profile data after loading, redirect to sign-in.
  if (!user || !profileData) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <main className="profile-page-main-content">
      <h1 className="profile-page-title">My Profile</h1>
      <p className="profile-page-description">
        View and update your personal and contact information.
      </p>

      {/* Pass the real, fetched profile data to the child components */}
      <PersonalInfoSection userData={profileData} />
      <EmergencyContactSection emergencyData={profileData.emergency_contact} />
      <AccountSettingsSection />
    </main>
  );
};

export default ProfilePage;
