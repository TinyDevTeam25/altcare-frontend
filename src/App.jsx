import React from "react";
import { Routes, Route } from "react-router-dom";

// COMBINED IMPORTS from both branches
import LandingPage from "./LandingPage.jsx";
 feature/Victor/appointment-details-page
import PatientAppointmentDetailsPage from "./patient/appointment-details/PatientAppointmentDetailsPage.jsx";
// This is the one we want to view



//  dashboardupdate
 main
import ProfessionalAppointmentDetailsPage from "./professional/appointment-details/AppointmentDetailsPage.jsx";
import PatientAppointmentDetailsPage from "./patient/appointment-details/PatientAppointmentDetailsPage.jsx";
import SecureMessagesPage from "./patient/messaging/SecureMessagesPage.jsx";
import PatientDashboardPage from "./patient/patientdashboard/Dashboard.jsx";
import MyAppointmentsPage from "./patient/my-appointments/MyAppointmentsPage.jsx";
import MyRecordTest from "./patient/MyRecordTest/MyRecordTest.jsx";

function App() {
  return (
    <Routes>
      {/* --- CORE PUBLIC ROUTE --- */}
      <Route path="/" element={<LandingPage />} />

      {/* --- PATIENT ROUTES --- */}
      <Route path="/patient/appointments" element={<MyAppointmentsPage />} />
      <Route
        path="/patient/appointment-details"
        element={<PatientAppointmentDetailsPage />}
      />
      <Route path="/patient/messages" element={<SecureMessagesPage />} />

      {/* ---  PATIENT ROUTES --- */}
      <Route path="/patient/dashboard" element={<PatientDashboardPage />} />
      <Route
        path="/patient/records/test-results" // Using a cleaner URL is a good practice
        element={<MyRecordTest />}
      />

      {/* --- PROFESSIONAL ROUTE --- */}
      <Route
        path="/professional/appointment-details"
        element={<ProfessionalAppointmentDetailsPage />}
      />
    </Routes>
  );
}

export default App;
