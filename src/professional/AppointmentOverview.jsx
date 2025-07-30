import React from "react";
import overviewIcon from "../assets/calendar-tick.svg";
import tickSquareIcon from "../assets/calendar.svg";
import rotateRightIcon from "../assets/rotate-right.svg";
import trashIcon from "../assets/trash.svg";

function AppointmentOverview() {
  return (
    <div className="details-card overview-card">
      <div className="card-header">
        <img src={overviewIcon} alt="" className="card-icon" />
        <h2 className="card-title">Appointment Overview</h2>
      </div>
      <div className="card-body">
        <div className="info-grid">
          <span className="info-label">Patient:</span>
          <span className="info-value">John Doe (P-001-XYZ)</span>
          <span className="info-label">Date:</span>
          <span className="info-value">July 15, 2025</span>
          <span className="info-label">Type:</span>
          <span className="info-value">General Check-up</span>
          <span className="info-label">Time:</span>
          <span className="info-value">10:00 AM</span>
          <span className="info-label">Status:</span>
          <span className="info-value">
            <div className="status-badge confirmed">Confirmed</div>
          </span>
          <span className="info-label">Method:</span>
          <span className="info-value">In-person (Clinic Room 3)</span>
          <span className="info-label full-width">Reason for Visit:</span>
          <p className="info-text full-width">
            Annual physical examination and routine blood work.
          </p>
        </div>
      </div>
      <div className="card-footer-actions">
        <button className="action-button primary">
          <img src={tickSquareIcon} alt="Mark as Completed" />
          Mark as Completed
        </button>
        <button className="action-button secondary">
          <img src={rotateRightIcon} alt="Reschedule" />
          Reschedule
        </button>
        <button className="action-button tertiary">
          <img src={trashIcon} alt="Cancel" />
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AppointmentOverview;
