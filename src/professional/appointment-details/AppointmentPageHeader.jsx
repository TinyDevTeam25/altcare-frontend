import React from "react";
import { Link } from "react-router-dom";
import backArrowIcon from "../../assets/arrow-left-icon.svg";

function AppointmentPageHeader() {
  return (
    <div className="page-header-card">
      <h1 className="page-title">Appointment Details</h1>
      <p className="page-subtitle">
        Comprehensive overview of this patient appointment.
      </p>
      <Link to="/appointments" className="back-link">
        <img src={backArrowIcon} alt="Back to appointments" />
        <span>Back to Appointments List</span>
      </Link>
    </div>
  );
}

export default AppointmentPageHeader;
