import React from "react";
import { Link } from "react-router-dom";
import backArrowIcon from "../../assets/arrow-left-icon.svg";
import rescheduleIcon from "../../assets/rotate-right.svg";
import cancelIcon from "../../assets/trash.svg";

function PatientPageHeader() {
  return (
    <div className="patient-page-header-card">
      <div>
        <h1 className="page-title">Appointment Details</h1>
        <p className="page-subtitle">
          Details for your appointment at Location.
        </p>
      </div>
      <div className="page-header-actions">
        <Link to="/patient/appointments" className="back-link-patient">
          <img src={backArrowIcon} alt="Back" />
          <span>Back to Appointments List</span>
        </Link>
        <div className="header-buttons">
          <button className="header-action-button">
            <img src={rescheduleIcon} alt="Reschedule" />
            <span>Reschedule</span>
          </button>
          <button className="header-action-button">
            <img src={cancelIcon} alt="Cancel Appointment" />
            <span>Cancel Appointment</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PatientPageHeader;
