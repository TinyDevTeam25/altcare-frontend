import { Routes, Route } from "react-router-dom";

// 1. Import the new Layout component
import PatientLayout from "./layouts/PatientLayout.jsx";

// Import all the pages
import LandingPage from "./LandingPage.jsx";
import AboutPage from "./patient/JOY/About.jsx";
import SignIn from "./patient/JOY/SignIn.jsx";
import SignUp from "./patient/JOY/SignUp.jsx";
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
import ProfessionalAppointmentDetailsPage from "./professional/appointment-details/AppointmentDetailsPage.jsx";

function App() {
  return (
    <Routes>
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
        <Route
          path="appointment-details"
          element={<PatientAppointmentDetailsPage />}
        />
        <Route path="messages" element={<SecureMessagesPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="activity-log" element={<ActivityLog />} />
        <Route path="records" element={<HealthRecords />} />
        <Route path="records/prescriptions" element={<PrescriptionRecords />} />
        <Route path="records/test-results" element={<MyRecordTest />} />
        <Route path="records/result-header" element={<Recordheader />} />
      </Route>

      {/* --- Professional Route (Does NOT use the PatientLayout) --- */}
      <Route
        path="/professional/appointment-details"
        element={<ProfessionalAppointmentDetailsPage />}
      />
    </Routes>
  );
}

export default App;
