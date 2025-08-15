// import React from "react";
// import { Link } from "react-router-dom";
// import readMessageIcon from "../../assets/arrow-right -icon.svg";

// function MessageList() {
//   return (
//     <>
//       <div className="messages-tabs">
//         <Link to="#" className="tab-item active">
//           Inbox (3)
//         </Link>
//         <Link to="#" className="tab-item">
//           Sent
//         </Link>
//         <Link to="#" className="tab-item">
//           Archived
//         </Link>
//       </div>

//       <div className="message-list-container">
//         {/* Unread Message Item */}
//         <div className="message-item unread">
//           <div className="message-item-header">
//             <span className="message-status-unread">Unread</span>
//             <span className="message-date">July 1, 2025, 10:30 AM</span>
//           </div>
//           <div className="message-item-body">
//             <h4 className="message-subject">
//               Regarding your recent blood test results
//             </h4>
//             <p className="message-sender">
//               From: Dr. John Smith (Cardiology Dept.)
//             </p>
//             <p className="message-preview">
//               Hello Jane, your recent blood test results are now available for
//               review. Please l...
//             </p>
//           </div>
//           <div className="message-item-footer">
//             <Link to="#" className="read-message-link">
//               <span>Read Message</span>
//               <img src={readMessageIcon} alt="Read message" />
//             </Link>
//           </div>
//         </div>

//         {/* Read Message Item */}
//         <div className="message-item read">
//           <div className="message-item-header">
//             <span className="message-status-read">Read</span>
//             <span className="message-date">June 28, 2025, 03:15 PM</span>
//           </div>
//           <div className="message-item-body">
//             <h4 className="message-subject">
//               Follow-up on your prescription refill request
//             </h4>
//             <p className="message-sender">From: Pharmacy Support (AltCare)</p>
//             <p className="message-preview">
//               Dear Jane, your prescription refill for Medication X has been
//               successfully proc...
//             </p>
//           </div>
//           <div className="message-item-footer">
//             <Link to="#" className="read-message-link">
//               <span>Read Message</span>
//               <img src={readMessageIcon} alt="Read message" />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default MessageList;
