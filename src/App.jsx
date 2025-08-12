import React from "react";
import { Routes, Route } from "react-router-dom";

// Import all of your pages
import LandingPage from "./LandingPage.jsx";
import ProfessionalAppointmentDetailsPage from "./professional/appointment-details/AppointmentDetailsPage.jsx";
import PatientAppointmentDetailsPage from "./patient/appointment-details/PatientAppointmentDetailsPage.jsx";
import SecureMessagesPage from "./patient/messaging/SecureMessagesPage.jsx";
import PatientDashboardPage from "./patient/patientdashboard/Dashboard.jsx";
import MyAppointmentsPage from "./patient/my-appointments/MyAppointmentsPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/professional/appointment-details"
        element={<ProfessionalAppointmentDetailsPage />}
      />
      <Route
        path="/patient/appointment-details"
        element={<PatientAppointmentDetailsPage />}
      />
      <Route path="/patient/messages" element={<SecureMessagesPage />} />
      <Route path="/patient/dashboard" element={<PatientDashboardPage />} />
      <Route path="/patient/appointments" element={<MyAppointmentsPage />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;
