import React from "react";
import { Link } from "react-router-dom";
import plusIcon from "../../assets/plus-icon.svg"; // Assuming you have a plus icon

function AppointmentsHeaderCard() {
  return (
    <div className="appointments-header-card">
      <h1 className="page-title">My Appointments</h1>
      <p className="page-subtitle">
        Manage your upcoming and past medical appointments.
      </p>
      <Link to="/patient/book-appointment" className="button-schedule">
        <img src={plusIcon} alt="Schedule New Appointment" />
        <span>Schedule New Appointment</span>
      </Link>
    </div>
  );
}

export default AppointmentsHeaderCard;
