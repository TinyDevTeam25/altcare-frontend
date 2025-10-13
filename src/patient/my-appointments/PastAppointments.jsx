// import React from "react";
// import { Link } from "react-router-dom";
// import calendarIcon from "../../assets/calendar.svg";
// import viewDetailsIcon from "../../assets/arrow-right-icon.svg";

// function PastAppointments() {
//   return (
//     <div className="appointments-table-card">
//       <div className="card-header">
//         <img src={calendarIcon} alt="" className="card-icon past" />
//         <h2 className="card-title">Past Appointments</h2>
//       </div>
//       <div className="card-body">
//         <table className="appointments-table">
//           <thead>
//             <tr>
//               <th>DATE</th>
//               <th>TIME</th>
//               <th>TYPE</th>
//               <th>DOCTOR</th>
//               <th>STATUS</th>
//               <th>ACTIONS</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* Appointment Row 1 */}
//             <tr>
//               <td data-label="DATE">June 10, 2025</td>
//               <td data-label="TIME">09:00 AM</td>
//               <td data-label="TYPE">
//                 <Link
//                   to="/patient/appointment-details"
//                   className="appointment-link"
//                 >
//                   General Consultation
//                 </Link>
//               </td>
//               <td data-label="DOCTOR">Dr. John Smith</td>
//               <td data-label="STATUS">
//                 <span className="status-badge past completed">Completed</span>
//               </td>
//               <td data-label="ACTIONS">
//                 <Link to="/patient/appointment-details" className="link-view">
//                   View Summary
//                 </Link>
//               </td>
//             </tr>
//             {/* Appointment Row 2 */}
//             <tr>
//               <td data-label="DATE">May 6, 2025</td>
//               <td data-label="TIME">01:00 PM</td>
//               <td data-label="TYPE">
//                 <Link
//                   to="/patient/appointment-details"
//                   className="appointment-link"
//                 >
//                   Follow-up Visit
//                 </Link>
//               </td>
//               <td data-label="DOCTOR">Dr. Emily White</td>
//               <td data-label="STATUS">
//                 <span className="status-badge past completed">Completed</span>
//               </td>
//               <td data-label="ACTIONS">
//                 <Link to="/patient/appointment-details" className="link-view">
//                   View Summary
//                 </Link>
//               </td>
//             </tr>
//             {/* Appointment Row 3 */}
//             <tr>
//               <td data-label="DATE">April 1, 2025</td>
//               <td data-label="TIME">11:00 AM</td>
//               <td data-label="TYPE">
//                 <Link
//                   to="/patient/appointment-details"
//                   className="appointment-link"
//                 >
//                   Physical Therapy
//                 </Link>
//               </td>
//               <td data-label="DOCTOR">Dr. Sarah Lee</td>
//               <td data-label="STATUS">
//                 <span className="status-badge past cancelled">Cancelled</span>
//               </td>
//               <td data-label="ACTIONS">
//                 <Link to="/patient/appointment-details" className="link-view">
//                   View Details
//                 </Link>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       <div className="card-footer-link-pro">
//         <Link to="#">
//           <span>View Full Medical History</span>
//           <img src={viewDetailsIcon} alt="View medical history" />
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default PastAppointments;

import React from "react";
import { Link } from "react-router-dom";
import calendarIcon from "../../assets/calendar.svg";
// import emptyIcon from "../../assets/empty-calendar.svg"; // optional illustration
// import viewDetailsIcon from "../../assets/arrow-right-icon.svg";

function PastAppointments() {
  // Example: later, you'll fetch this from backend
  const pastAppointments = []; // empty means no past appointments

  return (
    <div className="appointments-table-card">
      <div className="card-header">
        <img src={calendarIcon} alt="" className="card-icon past" />
        <h2 className="card-title">Past Appointments</h2>
      </div>

      <div className="card-body">
        {pastAppointments.length === 0 ? (
          <div className="no-appointments">
            {/* <img
              src={emptyIcon}
              alt="No past appointments"
              className="no-appointments-img"
            /> */}
            <h3>No past appointments</h3>
            <p>When you complete appointments, they’ll appear here.</p>
            <Link to="/patient/book-appointment" className="book-now-btn">
              Book an Appointment
            </Link>
          </div>
        ) : (
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
              {pastAppointments.map((appt, index) => (
                <tr key={index}>
                  <td data-label="DATE">{appt.date}</td>
                  <td data-label="TIME">{appt.time}</td>
                  <td data-label="TYPE">
                    <Link
                      to="/patient/appointment-details"
                      className="appointment-link"
                    >
                      {appt.type}
                    </Link>
                  </td>
                  <td data-label="DOCTOR">{appt.doctor}</td>
                  <td data-label="STATUS">
                    <span
                      className={`status-badge past ${appt.status.toLowerCase()}`}
                    >
                      {appt.status}
                    </span>
                  </td>
                  <td data-label="ACTIONS">
                    <Link to="/patient/appointment-details" className="link-view">
                      {appt.status === "Completed" ? "View Summary" : "View Details"}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* <div className="card-footer-link-pro">
        <Link to="#">
          <span>View Full Medical History</span>
          <img src={viewDetailsIcon} alt="View medical history" />
        </Link>
      </div> */}
    </div>
  );
}

export default PastAppointments;

