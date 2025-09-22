// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext.jsx";
// import { Navigate } from "react-router-dom";
// import apiClient from "../../utils/axiosConfig.js";

// import PersonalInfoSection from "./PersonalInfoSection.jsx";
// import EmergencyContactSection from "./EmergencyContactSection.jsx";
// import AccountSettingsSection from "./AccountSettingsSection.jsx";
// import "./Profile.css";

// const ProfilePage = () => {
//   const { user, loading: authLoading } = useAuth();
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!authLoading) {
//       if (user && user.patient) {
//         setProfileData(user.patient);
//         setLoading(false);
//       } else if (user && user.token) {
//         const fetchProfile = async () => {
//           try {
//             const response = await apiClient.get("/patient/get-profile", {
//               headers: {
//                 Authorization: `Bearer ${user.token}`,
//               },
//             });
//             console.log("Profile API Response:", response.data);
//             setProfileData(response.data); // ✅ just use the full data
//           } catch (error) {
//             console.error("Failed to fetch profile data", error);
//           } finally {
//             setLoading(false);
//           }
//         };
//         fetchProfile();
//       } else {
//         setLoading(false);
//       }
//     }
//   }, [user, authLoading]);

//   if (loading) {
//     return <div>Loading Profile...</div>;
//   }

//   if (!user) {
//     return <Navigate to="/signin" replace />;
//   }

//   if (!profileData) {
//     return <div>No profile data found.</div>;
//   }

//   return (
//     <main className="profile-page-main-content">
//       <h1 className="profile-page-title">My Profile</h1>
//       <p className="profile-page-description">
//         View and update your personal and contact information.
//       </p>

//       <PersonalInfoSection userData={profileData} />
//       <EmergencyContactSection emergencyData={profileData.emergency_contact} />
//       <AccountSettingsSection />
//     </main>
//   );
// };

// export default ProfilePage;

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

  // ✅ Use user data directly from context
   const account = user.profile;          // main account data (email, role, etc.)
  const profile = user.profile.profile;  // nested profile details
  const emergency = profile?.emergency_contact;
  return (
    <main className="profile-page-main-content">
      <h1 className="profile-page-title">My Profile</h1>
      <p className="profile-page-description">
        View and update your personal and contact information.
      </p>

      <PersonalInfoSection userData={{
          full_name: profile.full_name,
          gender: profile.gender,
          date_of_birth: profile.date_of_birth,
          phone: profile.phone,
          address: profile.address,
          NIN: profile.NIN,
          email: user.email, // from root level
      }} />
      <EmergencyContactSection emergencyData={profile.emergency_contact} />
      <AccountSettingsSection />
    </main>
  );
};

export default ProfilePage;
