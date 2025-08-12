import React from "react";
import PatientHeader from "../../components/headfoot/PatientHeader.jsx";
import PatientPageHeader from "./PatientPageHeader.jsx";
import AppointmentInfo from "./AppointmentInfo.jsx";
import ClinicalInterpretation from "./ClinicalInterpretation.jsx";
import RelatedDocuments from "./RelatedDocuments.jsx";
import Footer from "../../components/headfoot/Footer.jsx";
import "./AppointmentDetailsPage.css";
import "../../components/headfoot/PatientHeader.css";
import "../../components/headfoot/Footer.css";

function PatientAppointmentDetailsPage() {
  return (
    <div className="professional-body">
      {/* Pass the activePage prop */}
      <PatientHeader activePage="appointments" />
      <main className="main-content-area-pro">
        <PatientPageHeader />
        <div className="patient-details-grid">
          <AppointmentInfo />
          <ClinicalInterpretation />
        </div>
        <RelatedDocuments />
      </main>
      <Footer />
    </div>
  );
}

export default PatientAppointmentDetailsPage;
