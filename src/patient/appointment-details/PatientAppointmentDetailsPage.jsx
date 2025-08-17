import React from "react";
import PatientHeader from "./PatientHeader.jsx";
import PatientPageHeader from "./PatientPageHeader.jsx";
import AppointmentInfo from "./AppointmentInfo.jsx";
import ClinicalInterpretation from "./ClinicalInterpretation.jsx";
import RelatedDocuments from "./RelatedDocuments.jsx";
import Footer from "../../components/Footer.jsx";
import "./AppointmentDetailsPage.css";
import Nav2 from "../../components/PeterComponents/Nav2/Nav2.jsx";

function PatientAppointmentDetailsPage() {
  return (
    <div className="professional-body">
     
      {/* Pass the activePage prop */}
      {/* <PatientHeader activePage="appointments" /> */}
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
