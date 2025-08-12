import React from "react";
import noteIcon from "../../assets/note.svg";

function ClinicalInterpretation() {
  return (
    <div className="details-card-patient interpretation-card">
      <div className="card-header">
        <img src={noteIcon} alt="" className="card-icon" />
        <h2 className="card-title">Clinical Interpretation</h2>
      </div>
      <div className="card-body">
        <div className="interpretation-content">
          <div className="interpretation-row">
            <span className="info-label">Reason:</span>
            <p className="info-text">
              [Reason for the appointment would be detailed here.]
            </p>
          </div>
          <div className="interpretation-row">
            <span className="info-label">Additional Notes:</span>
            <p className="info-text italic">
              No additional notes provided for this appointment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClinicalInterpretation;
