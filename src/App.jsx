import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage.jsx";
import MyAppointmentsPage from "./patient/my-appointments/MyAppointmentsPage.jsx";
import PatientAppointmentDetailsPage from "./patient/appointment-details/PatientAppointmentDetailsPage.jsx";
import SecureMessagesPage from "./patient/messaging/SecureMessagesPage.jsx";
import PatientDashboardPage from "./patient/patientdashboard/Dashboard.jsx";
import MyRecordTest from "./patient/MyRecordTest/MyRecordTest.jsx";
import HealthRecords from "./patient/healthrecords/healthrecords.jsx";
import PrescriptionRecords from "./patient/prescriptionrecords/prescriptionrecords.jsx";
import ActivityLog from "./patient/activitylog/ActivityLog.jsx";
import Recordheader from "./patient/TestResult/result.jsx"; // Note: component names should be PascalCase
import ProfessionalAppointmentDetailsPage from "./professional/appointment-details/AppointmentDetailsPage.jsx";
import ProfilePage from "./patient/Profile/ProfilePage.jsx";

function App() {
  return (
    <Routes>
      {/* --- CORE PUBLIC ROUTE --- */}
      <Route path="/" element={<LandingPage />} />

      {/* --- PATIENT ROUTES (Main Pages) --- */}
      <Route path="/patient/appointments" element={<MyAppointmentsPage />} />
      <Route path="/patient/messages" element={<SecureMessagesPage />} />

      {/* --- PATIENT ROUTES (Detail Pages) --- */}
      <Route
        path="/patient/appointment-details"
        element={<PatientAppointmentDetailsPage />}
      />

      {/* ---  PATIENT ROUTES --- */}
      <Route path="/patient/dashboard" element={<PatientDashboardPage />} />
      <Route path="/patient/records/test-results" element={<MyRecordTest />} />
      <Route
        path="/patient/records/health-history"
        element={<HealthRecords />}
      />
      <Route
        path="/patient/records/prescriptions"
        element={<PrescriptionRecords />}
      />
      <Route path="/patient/activity-log" element={<ActivityLog />} />
      <Route path="/patient/records" element={<Recordheader />} />
      <Route path="/patient/profile" element={<ProfilePage />} />

      {/* --- PROFESSIONAL ROUTE --- */}
      <Route
        path="/professional/appointment-details"
        element={<ProfessionalAppointmentDetailsPage />}
      />
    </Routes>
  );
}

export default App;
