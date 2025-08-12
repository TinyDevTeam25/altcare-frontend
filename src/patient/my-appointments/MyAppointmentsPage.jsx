import React from "react";
import PatientHeader from "../../components/headfoot/PatientHeader.jsx";
import Footer from "../../components/headfoot/Footer.jsx";
import AppointmentsHeaderCard from "./AppointmentsHeaderCard.jsx";
import UpcomingAppointments from "./UpcomingAppointments.jsx";
import PastAppointments from "./PastAppointments.jsx";
import "./MyAppointments.css";

function MyAppointmentsPage() {
  return (
    <div className="patient-page-body">
      {" "}
      {/* Using the consistent body class */}
      <PatientHeader activePage="appointments" />
      <main className="main-content-area">
        <AppointmentsHeaderCard />
        <UpcomingAppointments />
        <PastAppointments />
        {/* The list of appointments will go here next */}
      </main>
      <Footer />
    </div>
  );
}

export default MyAppointmentsPage;
