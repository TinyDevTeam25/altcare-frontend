import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Import all of your pages
import LandingPage from "./LandingPage.jsx";
import PatientAppointmentDetailsPage from "./patient/appointment-details/PatientAppointmentDetailsPage.jsx";
// This is the one we want to view

//  dashboardupdate
import ProfessionalAppointmentDetailsPage from "./professional/appointment-details/AppointmentDetailsPage.jsx";
import SecureMessagesPage from "./patient/messaging/SecureMessagesPage.jsx";
import PatientDashboard from "./patient/patientdashboard/Dashboard.jsx";
import MyRecordTest from "./patient/MyRecordTest/MyRecordTest.jsx";
import Recordheader from "./patient/TestResult/result.jsx";
import ProfileCard from "./components/PeterComponents/Profile Card/ProfileCard.jsx";
import Nav2 from "./components/PeterComponents/Nav2/Nav2.jsx";
import WalletCard from "./components/PeterComponents/wallet Card/walletCard.jsx";

function App() {
  let [showWalletCard, setshowWalletCard] = useState(false);
  let [showProfileCard, setshowProfileCard] = useState(false);
  let location = useLocation();
  return (
    <>
      {location.pathname !== "/" && (
        <Nav2 setshowProfileCard={setshowProfileCard} setshowWalletCard={setshowWalletCard} />
      )}
      {showProfileCard && <ProfileCard setshowProfileCard={setshowProfileCard} />}
      {showWalletCard && <WalletCard setshowWalletCard={setshowWalletCard} />}
      
      {/* Render the routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/patient/appointment-details/PatientAppointmentDetailsPage"
          element={<PatientAppointmentDetailsPage />}
        />
        {/* This is the route for Patient dashboard */}
        <Route
          path="/patient/patientdashboard/Dashboard"
          element={<PatientDashboard />}
        />
        {/* This is the route for  My record test record */}
        <Route
          path="/patient/MyRecordTest/MyRecordTest"
          element={<MyRecordTest />}
        />

        <Route path="/patient/TestResult/result" element={<Recordheader />} />

        {/* This is the route for the professional page */}
        <Route
          path="/professional/appointment-details/AppointmentDetailsPage"
          element={<ProfessionalAppointmentDetailsPage />}
        />
        <Route
          path="/patient/appointment-details"
          element={<PatientAppointmentDetailsPage />}
        />
        <Route
          path="/patient/messaging/SecureMessagesPage"
          element={<SecureMessagesPage />}
        />
      </Routes>
    </>
  );
}

export default App;
