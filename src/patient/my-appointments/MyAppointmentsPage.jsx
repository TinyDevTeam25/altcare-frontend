import React from "react";
import AppointmentsHeaderCard from "./AppointmentsHeaderCard.jsx";
import UpcomingAppointments from "./UpcomingAppointments.jsx";
import PastAppointments from "./PastAppointments.jsx";
import "./MyAppointments.css";

function MyAppointmentsPage() {
  // It now ONLY returns the <main> content. The footer is handled by the layout.
  return (
    <main className="main-content-area">
      <AppointmentsHeaderCard />
      <UpcomingAppointments />
      <PastAppointments />
    </main>
  );
}

export default MyAppointmentsPage;
