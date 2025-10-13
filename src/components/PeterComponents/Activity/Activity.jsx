// import React from "react";
// import "./Activity.css";
// import { Link } from "react-router";
// export function Activity(){
//   return (
    
//       <div className="cardactivity">
//         <h3>Recent Activity</h3>
//         <ul className="activity-list">
//           <li className="activity-item">
//             <span className="dot green"></span>
//             You updated your emergency contact information.
//             <span className="time">2 hours ago</span>
//           </li>
//           <li className="activity-item">
//             <span className="dot red"></span>
//             New test result for Cholesterol Check available.
//             <span className="time">Yesterday</span>
//           </li>
//           <li className="activity-item">
//             <span className="dot blue"></span>
//             Upcoming appointment reminder for Dr. Smith on July 15th.
//             <span className="time">3 days ago</span>
//           </li>
//         </ul>

//         <Link to="/Activitylog" className="view-log">
//           view Full Activity Log &rarr;
//         </Link>
//       </div>

//   );
// };
// export default Activity;

import React from "react";
import "./Activity.css";
import { Link } from "react-router-dom";

export function Activity() {
  const recentActivities = []; // empty array = new user
  const isNewUser = recentActivities.length === 0;

  return (
    <div className="cardactivity">
      <h3>Recent Activity</h3>

      {isNewUser ? (
        <div className="no-activity">
          <p>You haven’t performed any actions yet.</p>
          <p>Once you start booking appointments, taking tests, or updating your profile, your activity will appear here.</p>
          <Link to="/patient/book-appointment" className="start-btn">
            Book Your First Appointment
          </Link>
        </div>
      ) : (
        <ul className="activity-list">
          {recentActivities.map((activity, index) => (
            <li key={index} className="activity-item">
              <span className={`dot ${activity.color}`}></span>
              {activity.message}
              <span className="time">{activity.time}</span>
            </li>
          ))}
        </ul>
      )}

      <Link to="/Activitylog" className="view-log">
        View Full Activity Log &rarr;
      </Link>
    </div>
  );
}

export default Activity;

