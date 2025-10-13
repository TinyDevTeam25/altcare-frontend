import React from 'react';
import { Link } from 'react-router-dom';
import calendarTickIcon from '../../assets/calendar-tick-icon.svg';

function UpcomingAppointments() {
 
     const appointments = []; // empty = no upcoming appointments

  return (
    <div className="appointments-table-card">
      <div className="card-header">
        <img src={calendarTickIcon} alt="" className="card-icon" />
        <h2 className="card-title">Upcoming Appointments</h2>
      </div>

      <div className="card-body">
        {appointments.length === 0 ? (
          <div className="no-appointments">
            {/* <img
              src={emptyIcon}
              alt="No appointments"
              className="no-appointments-img"
            /> */}
            <h3>No upcoming appointments</h3>
            <p>When you book an appointment, it will appear here.</p>
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
              {appointments.map((appt, index) => (
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
                    <span className={`status-badge ${appt.status.toLowerCase()}`}>
                      {appt.status}
                    </span>
                  </td>
                  <td data-label="ACTIONS">
                    <div className="action-links">
                      <Link to="#" className="link-reschedule">
                        Reschedule
                      </Link>
                      <Link to="#" className="link-cancel">
                        Cancel
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="card-footer-note">
        <p>You will receive reminders 24 hours before your appointment.</p>
      </div>
    </div>
  );
}

export default UpcomingAppointments;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import calendarTickIcon from '../../assets/calendar-tick-icon.svg';
// // import emptyIcon from '../../assets/empty-calendar.svg'; // optional: add an illustration

// function UpcomingAppointments() {
//   // Example: later, you'll fetch this from the backend
//   const appointments = []; // empty = no upcoming appointments

//   return (
//     <div className="appointments-table-card">
//       <div className="card-header">
//         <img src={calendarTickIcon} alt="" className="card-icon" />
//         <h2 className="card-title">Upcoming Appointments</h2>
//       </div>

//       <div className="card-body">
//         {appointments.length === 0 ? (
//           <div className="no-appointments">
//             {/* <img
//               src={emptyIcon}
//               alt="No appointments"
//               className="no-appointments-img"
//             /> */}
//             <h3>No upcoming appointments</h3>
//             <p>When you book an appointment, it will appear here.</p>
//             <Link to="/patient/book-appointment" className="book-now-btn">
//               Book an Appointment
//             </Link>
//           </div>
//         ) : (
//           <table className="appointments-table">
//             <thead>
//               <tr>
//                 <th>DATE</th>
//                 <th>TIME</th>
//                 <th>TYPE</th>
//                 <th>DOCTOR</th>
//                 <th>STATUS</th>
//                 <th>ACTIONS</th>
//               </tr>
//             </thead>
//             <tbody>
//               {appointments.map((appt, index) => (
//                 <tr key={index}>
//                   <td data-label="DATE">{appt.date}</td>
//                   <td data-label="TIME">{appt.time}</td>
//                   <td data-label="TYPE">
//                     <Link
//                       to="/patient/appointment-details"
//                       className="appointment-link"
//                     >
//                       {appt.type}
//                     </Link>
//                   </td>
//                   <td data-label="DOCTOR">{appt.doctor}</td>
//                   <td data-label="STATUS">
//                     <span className={`status-badge ${appt.status.toLowerCase()}`}>
//                       {appt.status}
//                     </span>
//                   </td>
//                   <td data-label="ACTIONS">
//                     <div className="action-links">
//                       <Link to="#" className="link-reschedule">
//                         Reschedule
//                       </Link>
//                       <Link to="#" className="link-cancel">
//                         Cancel
//                       </Link>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       <div className="card-footer-note">
//         <p>You will receive reminders 24 hours before your appointment.</p>
//       </div>
//     </div>
//   );
// }

// export default UpcomingAppointments;
