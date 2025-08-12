import React from "react";
import { Routes, Route } from "react-router-dom";

// Import all of your pages
import LandingPage from "./LandingPage.jsx";
import PatientAppointmentDetailsPage from "./patient/appointment-details/PatientAppointmentDetailsPage.jsx";
// This is the one we want to view

import ProfessionalAppointmentDetailsPage from "./professional/appointment-details/AppointmentDetailsPage.jsx";
import SecureMessagesPage from "./patient/messaging/SecureMessagesPage.jsx";
import PatientDashboard from"./patient/patientdashboard/Dashboard.jsx";
import MyRecordTest from "./patient/MyRecordTest/MyRecordTest.jsx";


function App() {
  return (
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
        path="/patient/MyRecordTest/MyRecordTest" element={<MyRecordTest />} />
      
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
  );
}

export default App;
