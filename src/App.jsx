import { Routes, Route } from "react-router-dom";

// 1. Import the new Layout component
import PatientLayout from "./layouts/PatientLayout.jsx";

// Import all the pages
import ProfileCard from "./components/PeterComponents/Profile Card/ProfileCard.jsx";
import WalletCard from "./components/PeterComponents/walletCard/walletCard.jsx";
import Nav2 from "./components/PeterComponents/Nav2/Nav2.jsx";
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
import Recordheader from "./patient/TestResult/result.jsx";
import MyAppointmentsPage from "./patient/my-appointments/MyAppointmentsPage.jsx";
import PatientAppointmentDetailsPage from "./patient/appointment-details/PatientAppointmentDetailsPage.jsx";
import SecureMessagesPage from "./patient/messaging/SecureMessagesPage.jsx";
import ProfilePage from "./patient/Profile/ProfilePage.jsx";
import { useState } from "react";
import TestResult from "./patient/TestResult/result.jsx";
import { useLocation } from "react-router-dom";
// Professional Feature Pages

import ProfessionalAppointmentDetailsPage from "./professional/appointment-details/AppointmentDetailsPage.jsx";
//will need to create this page for Immunizations
// import ImmunizationRecords from "./patient/immunization/ImmunizationRecords.jsx";

function App() {
  let location = useLocation();
  const [showProfileCard, setshowProfileCard] = useState(false);
  const [showWalletCard, setshowWalletCard] = useState(false);
  return (
    <>
      {/* 
        This is the conditional header logic from the 'dashboardupdate' branch.
        It shows the Nav2 header on every page EXCEPT the landing page.
      */}

      {location.pathname === "/" ||
      location.pathname === "/signin" ||
      location.pathname === "/signup" ||
      location.pathname === "/registration" ||
      location.pathname === "/patient/appointment-details" ? (
        ""
      ) : (
        <Nav2
          setshowProfileCard={setshowProfileCard}
          setshowWalletCard={setshowWalletCard}
        />
      )}

      {/* Conditionally render the popover cards */}
      {showProfileCard && (
        <ProfileCard setshowProfileCard={setshowProfileCard} />
      )}
      {showWalletCard && <WalletCard setshowWalletCard={setshowWalletCard} />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/registration" element={<Registration />} />
        {/* --- Patient Routes --- */}
        <Route
          path="/patient/patientdashboard/Dashboard"
          element={<PatientDashboardPage />}
        />
        <Route
          path="/patient/MyRecordTest/MyRecordTest"
          element={<MyRecordTest />}
        />
        <Route path="/patient/appointments" element={<MyAppointmentsPage />} />
        <Route
          path="/patient/appointment-details/PatientAppointmentDetailsPage"
          element={<PatientAppointmentDetailsPage />}
        />
        <Route path="/patient/TestResult/result" element={<TestResult />} />

        <Route
          path="/patient/messaging/SecureMessagesPage"
          element={<SecureMessagesPage />}
        />
        <Route path="/patient/profile" element={<ProfilePage />} />
        <Route path="/patient/activity-log" element={<ActivityLog />} />
        {/* Sub-routes for Records */}
        <Route path="/patient/records" element={<HealthRecords />} />
        <Route
          path="/patient/records/prescriptions"
          element={<PrescriptionRecords />}
        />
        <Route
          path="/patient/records/test-results"
          element={<MyRecordTest />}
        />
        <Route
          path="/patient/records/result-header"
          element={<Recordheader />}
        />
        {/* Assuming this is another records page */}
        {/* --- Professional Route --- */}
        <Route
          path="/professional/appointment-details"
          element={<ProfessionalAppointmentDetailsPage />}
        />
        {/* --- Public Routes (Have NO Layout) --- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />

        {/* --- Patient Routes (ALL use the PatientLayout) --- */}
        <Route path="/patient" element={<PatientLayout />}>
          {/* These child routes will render inside the layout's <Outlet> */}
          <Route path="dashboard" element={<PatientDashboardPage />} />
          <Route path="appointments" element={<MyAppointmentsPage />} />

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


        {/* --- Professional Route (Does NOT use the PatientLayout) --- */}
        <Route
          path="/professional/appointment-details"
          element={<ProfessionalAppointmentDetailsPage />}
        />
      </Routes>
    </>
  );
}

export default App;
