import React from "react";
import { Link } from "react-router-dom";
import patientIcon from "../../assets/user-square-icon.png";
import arrowIcon from "../../assets/arrow-left-icon.svg";

function PatientSnapshot() {
  return (
    <div className="details-card snapshot-card">
      <div className="card-header">
        <img src={patientIcon} alt="" className="card-icon" />
        <h2 className="card-title">Patient Snapshot</h2>
      </div>
      <div className="card-body">
        <div className="info-grid snapshot-grid">
          <span className="info-label">Patient ID:</span>
          <span className="info-value">P-001-XYZ</span>
          <span className="info-label">Date of Birth:</span>
          <span className="info-value">1990-01-15 (35 years old)</span>
          <span className="info-label">Primary Condition:</span>
          <span className="info-value">Hypertension</span>
          <span className="info-label">Last Visit:</span>
          <span className="info-value">June 10, 2025</span>
          <span className="info-label">Allergies:</span>
          <span className="info-value">
            Penicillin (<span className="severe">Severe</span>)
          </span>
          <span className="info-label">Current Medications:</span>
          <span className="info-value">Medication X (10mg daily)</span>
        </div>
      </div>
      <div className="card-footer-link">
        <Link to="#">
          View Full Patient Record
          <img
            src={arrowIcon}
            alt="View record"
            className="arrow-right-transformed"
          />
        </Link>
      </div>
    </div>
  );
}

export default PatientSnapshot;
