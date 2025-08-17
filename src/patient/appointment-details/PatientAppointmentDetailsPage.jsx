import React from "react";
// We no longer need to import a header or footer here, App.jsx handles it.
import PatientPageHeader from "./PatientPageHeader.jsx";
import AppointmentInfo from "./AppointmentInfo.jsx";
import ClinicalInterpretation from "./ClinicalInterpretation.jsx";
import RelatedDocuments from "./RelatedDocuments.jsx";
import "./AppointmentDetailsPage.css";

function PatientAppointmentDetailsPage() {
  return (
    // This div provides the background color and main layout structure
    <div className="professional-body">
      {/* 
        The <Nav2> header is now rendered automatically by App.jsx,
        so we do NOT include it here. 
      */}
      <main className="main-content-area-pro">
        <PatientPageHeader />
        <div className="patient-details-grid">
          <AppointmentInfo />
          <ClinicalInterpretation />
        </div>
        <RelatedDocuments />
      </main>
    </div>
  );
}

export default PatientAppointmentDetailsPage;