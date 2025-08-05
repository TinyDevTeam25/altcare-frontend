import React from "react";
import infoIcon from "../../assets/info-icon.svg";

function AppointmentInfo() {
  return (
    <div className="details-card-patient info-card">
      <div className="card-header">
        <img src={infoIcon} alt="" className="card-icon" />
        <h2 className="card-title">Appointment Information</h2>
      </div>
      <div className="card-body">
        {/* THIS IS THE CORRECTED GRID STRUCTURE */}
        <div className="info-grid-patient">
          <span className="info-label">Appointment ID:</span>
          <span className="info-value">CARD-001-20250718</span>

          <span className="info-label">Date Performed:</span>
          <span className="info-value">July 18, 2025</span>

          <span className="info-label">Time:</span>
          <span className="info-value">10:00 AM</span>

          <span className="info-label">Doctor:</span>
          <span className="info-value">Dr. Emily White</span>

          <span className="info-label">Type:</span>
          <span className="info-value">Clinic appointment</span>

          <span className="info-label">Location:</span>
          <span className="info-value">Cardiac Cath. lab</span>

          <span className="info-label">Status:</span>
          <span className="info-value">
            <div className="status-badge-patient completed">
              Completed & Reviewed
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default AppointmentInfo;
