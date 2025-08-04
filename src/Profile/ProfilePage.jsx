import React from 'react';
// All sub-components are now imported from the 'components' sub-directory within the Profile folder
import Header from './Header';
import Footer from './Footer';
import PersonalInfoSection from './PersonalInfoSection';
import EmergencyContactSection from './EmergencyContactSection';
import AccountSettingsSection from './AccountSettingsSection';


import './profile.css';

const ProfilePage = () => {
  return (
    <>
      <Header />
      <main className="profile-page-main-content"> 
        <h1 className="profile-page-title">My Profile</h1> 
        <p className="profile-page-description">View and update your personal and contact information.</p> 

        <PersonalInfoSection />
        <EmergencyContactSection />
        <AccountSettingsSection />
      </main>
      <Footer />
    </>
  );
};

export default ProfilePage;