import React from "react";
import ProfessionalHeader from "./ProfessionalHeader.jsx";
import AppointmentPageHeader from "./AppointmentPageHeader.jsx";
import AppointmentOverview from "./AppointmentOverview.jsx";
import PatientSnapshot from "./PatientSnapshot.jsx";
import AppointmentNotes from "./AppointmentNotes.jsx";
import Footer from "../../components/Footer.jsx";
import "./AppointmentDetailsPage.css";

function AppointmentDetailsPage() {
  return (
    <div className="professional-body">
      <ProfessionalHeader />
      <main className="main-content-area-pro">
        <AppointmentPageHeader />
        <div className="details-grid">
          <AppointmentOverview />
          <PatientSnapshot />
        </div>
        <AppointmentNotes />
      </main>
      <Footer />
    </div>
  );
}

export default AppointmentDetailsPage;
