import React from "react";
import { Routes, Route } from "react-router-dom";

// Import all your page-level components
import LandingPage from "./LandingPage.jsx";
import PatientAppointmentDetailsPage from "./patient/PatientAppointmentDetailsPage.jsx";
// This is the one we want to view
import ProfessionalAppointmentDetailsPage from "./professional/AppointmentDetailsPage.jsx";
import MyProfilePage from "./Profile/ProfilePage.jsx"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/patient/appointment-details"
        element={<PatientAppointmentDetailsPage />}
      />

      {/* This is the route for the professional page */}
      <Route
        path="/professional/appointment-details"
        element={<ProfessionalAppointmentDetailsPage />}
      />
    </Routes>
  );
}

export default App;
