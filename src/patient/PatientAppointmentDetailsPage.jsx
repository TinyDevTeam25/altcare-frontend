import React from "react";
import PatientHeader from "./PatientHeader.jsx";
import PatientPageHeader from "./PatientPageHeader.jsx";
import AppointmentInfo from "./AppointmentInfo.jsx";
import ClinicalInterpretation from "./ClinicalInterpretation.jsx";
import RelatedDocuments from "./RelatedDocuments.jsx";
// 1. Make sure the shared Footer is imported from the correct location
import Footer from "../components/Footer.jsx";
import "./AppointmentDetailsPage.css";

function PatientAppointmentDetailsPage() {
  return (
    <div className="professional-body">
      {" "}
      {/* This class provides the main page layout */}
      <PatientHeader />
      <main className="main-content-area-pro">
        <PatientPageHeader />
        <div className="patient-details-grid">
          <AppointmentInfo />
          <ClinicalInterpretation />
        </div>
        <RelatedDocuments />
      </main>
      {/* 2. Add the Footer component at the end */}
      <Footer />
    </div>
  );
}

export default PatientAppointmentDetailsPage;
