import React from "react";
import { Routes, Route } from "react-router-dom";

// Import all your page-level components
import LandingPage from "./LandingPage.jsx";
import PatientAppointmentDetailsPage from "./patient/PatientAppointmentDetailsPage.jsx";
import Dashboard from "./patient/patientdashboard/Dashboard.jsx";
// This is the one we want to view
import ProfessionalAppointmentDetailsPage from "./professional/AppointmentDetailsPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/patient/appointment-details"
        element={<PatientAppointmentDetailsPage />}
      />
      <Route
        path="/patient/patientdashboard/dashboard"
        element={<Dashboard />}
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
