import React from 'react';
import { Link } from 'react-router-dom';
import calendarTickIcon from '../../assets/calendar-tick-icon.svg';

function UpcomingAppointments() {
  return (
    <div className="appointments-table-card">
      <div className="card-header">
        <img src={calendarTickIcon} alt="" className="card-icon" />
        <h2 className="card-title">Upcoming Appointments</h2>
      </div>
      <div className="card-body">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>DATE</th>
              <th>TIME</th>
              <th>TYPE</th>
              <th>DOCTOR</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {/* Appointment Row 1 */}
            <tr>
              <td data-label="DATE">July 15, 2025</td>
              <td data-label="TIME">10:00 AM</td>
              <td data-label="TYPE">
                <Link to="/patient/appointment-details" className="appointment-link">
                  Dental Check-up
                </Link>
              </td>
              <td data-label="DOCTOR">Dr. Emily White</td>
              <td data-label="STATUS">
                <span className="status-badge upcoming">Confirmed</span>
              </td>
              <td data-label="ACTIONS">
                <div className="action-links">
                  <Link to="#" className="link-reschedule">Reschedule</Link>
                  <Link to="#" className="link-cancel">Cancel</Link>
                </div>
              </td>
            </tr>
            {/* Appointment Row 2 */}
            <tr>
              <td data-label="DATE">August 2, 2025</td>
              <td data-label="TIME">02:30 PM</td>
              <td data-label="TYPE">
                <Link to="/patient/appointment-details" className="appointment-link">
                  Cardiology Follow-up
                </Link>
              </td>
              <td data-label="DOCTOR">Dr. Emily White</td>
              <td data-label="STATUS">
                <span className="status-badge upcoming">Confirmed</span>
              </td>
              <td data-label="ACTIONS">
                <div className="action-links">
                  <Link to="#" className="link-reschedule">Reschedule</Link>
                  <Link to="#" className="link-cancel">Cancel</Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="card-footer-note">
        <p>You will receive reminders 24 hours before your appointment.</p>
      </div>
    </div>
  );
}

export default UpcomingAppointments;