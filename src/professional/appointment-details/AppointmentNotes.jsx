import React from "react";
import notesIcon from "../../assets/eye.svg";
function AppointmentNotes() {
  return (
    <div className="details-card notes-card">
      <div className="card-header">
        <img src={notesIcon} alt="" className="card-icon" />
        <h2 className="card-title">Appointment Notes</h2>
      </div>
      <div className="card-body">
        <textarea
          className="notes-textarea"
          placeholder="Add notes about the appointment here..."
        ></textarea>
      </div>
      <div className="card-footer-notes">
        <button className="save-notes-button">Save Notes</button>
      </div>
    </div>
  );
}

export default AppointmentNotes;
