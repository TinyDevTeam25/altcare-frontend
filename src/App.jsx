//final merge
import React from "react";
import { Routes, Route } from "react-router-dom";
import PatientLayout from "./layouts/PatientLayout.jsx";

// Import all pages
import LandingPage from "./LandingPage.jsx";
import AboutPage from "./patient/JOY/About.jsx";
import SignIn from "./patient/JOY/SignIn.jsx";
import SignUp from "./patient/JOY/SignUp.jsx";
import Registration from "./patient/JOY/Registration.jsx";
import FeaturesPage from "./patient/JOY/Features.jsx";
import ContactPage from "./patient/JOY/Contact.jsx";
import PatientDashboardPage from "./patient/patientdashboard/Dashboard.jsx";
import MyRecordTest from "./patient/MyRecordTest/MyRecordTest.jsx";
import HealthRecords from "./patient/healthrecords/healthrecords.jsx";
import PrescriptionRecords from "./patient/prescriptionrecords/prescriptionrecords.jsx";
import ActivityLog from "./patient/activitylog/ActivityLog.jsx";
import MyAppointmentsPage from "./patient/my-appointments/MyAppointmentsPage.jsx";
import PatientAppointmentDetailsPage from "./patient/appointment-details/PatientAppointmentDetailsPage.jsx";
import SecureMessagesPage from "./patient/messaging/SecureMessagesPage.jsx";
import ProfilePage from "./patient/Profile/ProfilePage.jsx";
import ProfessionalAppointmentDetailsPage from "./professional/appointment-details/AppointmentDetailsPage.jsx";
// You will need to create this page for Immunizations
// import ImmunizationRecords from "./patient/immunization/ImmunizationRecords.jsx";

function App() {
  return (
    <Routes>
      {/* --- Public Routes (No Layout) --- */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/registration" element={<Registration />} />

      {/* --- Patient Routes (All use PatientLayout) --- */}
      <Route path="/patient" element={<PatientLayout />}>
        <Route path="dashboard" element={<PatientDashboardPage />} />
        <Route path="appointments" element={<MyAppointmentsPage />} />
        <Route
          path="appointment-details"
          element={<PatientAppointmentDetailsPage />}
        />
        <Route path="messages" element={<SecureMessagesPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="activity-log" element={<ActivityLog />} />

        {/* === CORRECTED & FINAL RECORDS ROUTING === */}
        {/* Main "All Records" page */}
        <Route path="records" element={<MyRecordTest />} />
        {/* Specific page for "Test Results" (can reuse the MyRecordTest component if it's designed to show just that) */}
        <Route path="records/test-results" element={<MyRecordTest />} />
        {/* Specific page for "Medical History" */}
        <Route path="records/history" element={<HealthRecords />} />
        {/* Specific page for "Prescriptions" */}
        <Route path="records/prescriptions" element={<PrescriptionRecords />} />
        {/* A route for the future "Immunizations" page */}
        {/* <Route path="records/immunizations" element={<ImmunizationRecords />} /> */}
      </Route>

      {/* --- Professional Route --- */}
      <Route
        path="/professional/appointment-details"
        element={<ProfessionalAppointmentDetailsPage />}
      />
    </Routes>
  );
}

export default App;
