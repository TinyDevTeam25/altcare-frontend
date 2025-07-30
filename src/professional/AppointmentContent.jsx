import React from "react";
// Note: We use placeholders here. You must replace 'icon-name.svg'
// with the ACTUAL filenames of your icons in the assets folder.
import backArrowIcon from "../assets/arrow-left-icon.svg";
import overviewIcon from "../assets/calendar-tick.svg";
import tickSquareIcon from "../assets/calendar-tick.svg";
import rotateRightIcon from "../assets/rotate-right.svg";
import trashIcon from "../assets/trash.svg";
import patientIcon from "../assets/user-square-icon.png";
import viewRecordIcon from "../assets/arrow-left-icon.svg";
import notesIcon from "../assets/eye.svg";

function AppointmentContent() {
  return (
    <main className="main-content-area-pro">
      <div className="page-header-card">
        <a href="#" className="back-link">
          <img src={backArrowIcon} alt="Back" />
          <span>Back to Appointments List</span>
        </a>
        <div>
          <h1 className="page-title">Appointment Details</h1>
          <p className="page-subtitle">
            Comprehensive overview of this patient appointment.
          </p>
        </div>
      </div>

      <div className="details-grid">
        <div className="details-card overview-card">
          <div className="card-header">
            <img src={overviewIcon} alt="" className="card-icon" />
            <h2 className="card-title">Appointment Overview</h2>
          </div>
          <div className="card-body">{/*...info grid...*/}</div>
          <div className="card-footer-actions">
            <button className="action-badge primary">
              <img src={tickSquareIcon} alt="" />
              Mark as Completed
            </button>
            <button className="action-badge secondary">
              <img src={rotateRightIcon} alt="" />
              Reschedule
            </button>
            <button className="action-badge tertiary">
              <img src={trashIcon} alt="" />
              Cancel
            </button>
          </div>
        </div>

        <div className="details-card snapshot-card">
          <div className="card-header">
            <img src={patientIcon} alt="" className="card-icon" />
            <h2 className="card-title">Patient Snapshot</h2>
          </div>
          <div className="card-body">{/*...info grid...*/}</div>
          <div className="card-footer-link">
            <a href="#">
              View Full Patient Record <img src={viewRecordIcon} alt="" />
            </a>
          </div>
        </div>
      </div>

      <div className="details-card notes-card">
        <div className="card-header">
          <img src={notesIcon} alt="" className="card-icon" />
          <h2 className="card-title">Appointment Notes</h2>
        </div>
        <div className="card-body">
          <textarea
            className="notes-textarea"
            placeholder="Add notes..."
          ></textarea>
        </div>
        <div className="card-footer-notes">
          <button className="save-notes-button">Save Notes</button>
        </div>
      </div>
    </main>
  );
}

export default AppointmentContent;
