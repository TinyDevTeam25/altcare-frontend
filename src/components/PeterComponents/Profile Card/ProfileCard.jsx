// // import React from "react"; // 1. Import useContext
// // import { useNavigate } from "react-router-dom"; // 2. Import useNavigate
// // import { useAuth } from "../../../context/AuthContext.jsx"; // 3. Import AuthContext
// // import "./ProfileCard.css";
// // import LogOut from "../../../assets/logout.png";
// // import image from "../../../assets/jane-doe-avatar.png";
// // import camera from "../../../assets/camera.png";
// // import LogoutModal from "../../modals/LogoutModal.jsx";

// // const ProfileCard = ({ setshowProfileCard }) => {
// //   //  Get the user and logout function from the context
// //   const { user, logout } = useAuth();
// //   const navigate = useNavigate();

// //   // ⬅️ modal open/close state
// //   const [showLogoutModal, setShowLogoutModal] = useState(false);

// //   const handleLogout = async () => {
// //     try {
// //       await logout(); // This clears the user's session
// //       navigate("/"); // This redirects to the landing page
// //     } finally {
// //       setShowLogoutModal(false); // Close the modal
// //       setshowProfileCard(false); // Close the profile card
// //     }
// //   };

// //   return (
// //     <div className="profileCard" onClick={() => setshowProfileCard(false)}>
// //       <div className="pcard" onClick={(e) => e.stopPropagation()}>
// //         {/* Display the user's full email from the context */}
// //         <p className="email">
// //           {user
// //             ? user.profile?.profile?.full_name ||
// //               user.profile?.profile?.email ||
// //               "Guest"
// //             : "Guest"}
// //         </p>
// //         <div className="profile-info">
// //           <div className="pics">
// //             <img src={image} className="profile-image" alt="" />
// //             <img src={camera} alt="" className="relative" />
// //           </div>
// //           <div>
// //             {/* Display user's name and ID from the context */}
// //             <p>
// //               {user
// //                 ? user.profile?.profile?.full_name || "Jane Doe"
// //                 : "Jane Doe"}
// //             </p>
// //             <p>
// //               {user?.profile?.id
// //                 ? `ID: ${user.profile?.profile?.id}`
// //                 : "P-001-XYZ"}
// //             </p>
// //           </div>
// //         </div>
// //         <button className="green-btn">Manage your AltCare Account</button>

// //         {/* 5. The Sign Out button now calls our handleLogout function */}
// //         <button className="red-btn" onClick={handleLogout}>
// //           <img src={LogOut} alt="" />
// //           Sign out of AltCare
// //         </button>

// //         <div onClick={() => setshowProfileCard(false)} className="cancel">
// //           X
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProfileCard;
// // ProfileCard.jsx
// // import React, { useState } from "react"; // ⬅️ added useState
// // import { useNavigate } from "react-router-dom";
// // import { useAuth } from "../../../context/AuthContext.jsx";
// // import "./ProfileCard.css";
// // import LogOut from "../../../assets/logout.png";
// // import image from "../../../assets/jane-doe-avatar.png";
// // import camera from "../../../assets/camera.png";

// // // ⬅️ import the modal (adjust the relative path if your file structure differs)
// // import LogoutModal from "../../../components/modals/LogoutModal.jsx";

// // const ProfileCard = ({ setshowProfileCard }) => {
// //   const { user, logout } = useAuth();
// //   const navigate = useNavigate();

// //   // ⬅️ modal open/close state
// //   const [showLogoutModal, setShowLogoutModal] = useState(false);

// //   // ⬅️ actual logout when user confirms in the modal
// //   const handleLogout = async () => {
// //     try {
// //       await logout(); // clears session via your AuthContext
// //       // optional: also clear any local tokens if you use them
// //       // localStorage.removeItem("altcare_token");
// //       // localStorage.removeItem("userData");
// //       navigate("/"); // redirect to landing/login
// //     } finally {
// //       setShowLogoutModal(false);
// //       setshowProfileCard(false);
// //     }
// //   };

// //   return (
// //     <>
// //       <div className="profileCard" onClick={() => setshowProfileCard(false)}>
// //         <div className="pcard" onClick={(e) => e.stopPropagation()}>
// //           {/* Display the user's full email from the context */}
// //           <p className="email">
// //             {user
// //               ? user.profile?.profile?.full_name ||
// //                 user.profile?.profile?.email ||
// //                 "Guest"
// //               : "Guest"}
// //           </p>

// //           <div className="profile-info">
// //             <div className="pics">
// //               <img src={image} className="profile-image" alt="" />
// //               <img src={camera} alt="" className="relative" />
// //             </div>
// //             <div>
// //               {/* Display user's name and ID from the context */}
// //               <p>
// //                 {user
// //                   ? user.profile?.profile?.full_name || "Jane Doe"
// //                   : "Jane Doe"}
// //               </p>
// //               <p>
// //                 {user?.profile?.id
// //                   ? `ID: ${user.profile?.profile?.id}`
// //                   : "P-001-XYZ"}
// //               </p>
// //             </div>
// //           </div>

// //           <button className="green-btn">Manage your AltCare Account</button>

// //           {/* 🔴 Changed: Instead of logging out immediately, open the caution modal */}
// //           <button
// //             className="red-btn"
// //             onClick={() => setShowLogoutModal(true)}
// //             type="button"
// //           >
// //             <img src={LogOut} alt="" />
// //             Sign out of AltCare
// //           </button>

// //           <div onClick={() => setshowProfileCard(false)} className="cancel">
// //             X
// //           </div>
// //         </div>
// //       </div>

// //       {/* 🚪 Logout Caution Modal */}
// //       <LogoutModal
// //         open={showLogoutModal}
// //         onCancel={() => setShowLogoutModal(false)}
// //         onConfirm={handleLogout}
// //         title="Log out?"
// //         description="You’re about to be signed out of AltCare. Unsaved changes may be lost."
// //         confirmLabel="Log out"
// //         cancelLabel="Stay logged in"
// //         dangerous
// //       />
// //     </>
// //   );
// // };

// // export default ProfileCard;

// // ProfileCard.jsx
// // ProfileCard.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../../context/AuthContext.jsx";
// import "./ProfileCard.css";
// import LogOut from "../../../assets/logout.png";
// import image from "../../../assets/jane-doe-avatar.png";
// import camera from "../../../assets/camera.png";
// import CopyIcon from "../../../assets/copy.png"; // ⬅️ NEW: Import copy icon image

// /** ─────────────────────────────────────────────────────────────
//  * Inline, self-contained Logout Caution Modal
//  * (No external imports. Copy-paste will just work.)
//  * Figma target: width ~412px, min-height ~294px
//  * ───────────────────────────────────────────────────────────── */
// function LogoutCautionModal({
//   open,
//   onCancel,
//   onConfirm,
//   title = "Are you sure you want to log out?",
//   description = "You’ll need to sign in again  to continue using your account.",
//   confirmLabel = "Logout",
//   cancelLabel = "Cancel",
// }) {
//   if (!open) return null;

//   // --- tokens close to your screenshot ---
//   const COLORS = {
//     overlay: "rgba(17,24,39,0.55)", // dark overlay
//     border: "#EAECF0", // card/border
//     text: "#101828", // heading
//     muted: "#667085", // body
//     danger: "#EF4444", // red
//     pillBorder: "#D0D5DD", // cancel pill border
//     pillText: "#111827", // cancel text
//     primary: "#0F766E", // teal button bg
//     primaryHover: "#0D6A63",
//     white: "#FFFFFF",
//   };

//   const overlayStyle = {
//     position: "fixed",
//     inset: 0,
//     background: COLORS.overlay,
//     display: "grid",
//     placeItems: "center",
//     zIndex: 9999,
//     padding: 16,
//   };

//   const modalStyle = {
//     width: "100%",
//     maxWidth: 412,
//     minHeight: 294,
//     background: COLORS.white,
//     color: COLORS.text,
//     borderRadius: 16,
//     border: `1px solid ${COLORS.border}`,
//     boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
//     boxSizing: "border-box",
//     padding: "24px",
//     position: "relative",
//     textAlign: "center",
//   };

//   const closeBtnStyle = {
//     position: "absolute",
//     right: 12,
//     top: 12,
//     height: 28,
//     width: 28,
//     display: "grid",
//     placeItems: "center",
//     borderRadius: "999px",
//     border: `1px solid ${COLORS.border}`,
//     background: COLORS.white,
//     color: "#667085",
//     cursor: "pointer",
//   };

//   const iconWrapStyle = {
//     height: 44,
//     width: 44,
//     borderRadius: 999,
//     background: "#FEF2F2", // very light red
//     display: "grid",
//     placeItems: "center",
//     margin: "0 auto 12px",
//   };

//   const titleStyle = {
//     fontSize: 20,
//     fontWeight: 700,
//     margin: "6px 0 6px",
//     color: COLORS.text,
//   };

//   const descStyle = {
//     fontSize: 14,
//     lineHeight: 1.5,
//     color: COLORS.muted,
//     margin: "0 0 18px",
//   };

//   const actionsStyle = {
//     display: "flex",
//     gap: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 6,
//   };

//   const pillBase = {
//     height: 50,
//     minWidth: 158,
//     padding: "0 18px",
//     borderRadius: 9999,
//     fontSize: 15,
//     fontWeight: 700,
//     cursor: "pointer",
//     border: "1px solid transparent",
//   };

//   const cancelBtnStyle = {
//     ...pillBase,
//     background: COLORS.white,
//     borderColor: COLORS.pillBorder,
//     color: COLORS.pillText,
//   };

//   const logoutBtnStyle = {
//     ...pillBase,
//     background: COLORS.primary,
//     color: COLORS.white,
//   };

//   return (
//     <div
//       style={overlayStyle}
//       onMouseDown={(e) => {
//         if (e.target === e.currentTarget) onCancel?.();
//       }}
//       onClick={(e) => e.stopPropagation()}
//     >
//       <div
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="logout-title"
//         aria-describedby="logout-desc"
//         style={modalStyle}
//       >
//         <button
//           onClick={onCancel}
//           aria-label="Close"
//           title="Close"
//           style={closeBtnStyle}
//           onMouseEnter={(e) => (e.currentTarget.style.background = "#F9FAFB")}
//           onMouseLeave={(e) =>
//             (e.currentTarget.style.background = COLORS.white)
//           }
//         >
//           <svg
//             width="16"
//             height="16"
//             viewBox="0 0 24 24"
//             fill="none"
//             aria-hidden="true"
//           >
//             <path
//               d="M6 6l12 12M18 6L6 18"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//             />
//           </svg>
//         </button>

//         {/* Alert circle icon */}
//         <div style={iconWrapStyle} aria-hidden="true">
//           <svg
//             width="22"
//             height="22"
//             viewBox="0 0 24 24"
//             fill="none"
//             aria-hidden="true"
//           >
//             <circle cx="12" cy="12" r="9.5" stroke={COLORS.danger} />
//             <path d="M12 7v6" stroke={COLORS.danger} strokeWidth="2" />
//             <circle cx="12" cy="16.5" r="1.25" fill={COLORS.danger} />
//           </svg>
//         </div>

//         {/*  when you have an icon asset, use this instead of the SVG above
//         <div style={iconWrapStyle} aria-hidden="true">
//           <img src={AlertCircle} alt="" width={22} height={22} />
//         </div>  */}

//         <h2 id="logout-title" style={titleStyle}>
//           {title}
//         </h2>
//         <p id="logout-desc" style={descStyle}>
//           {description}
//         </p>

//         <div style={actionsStyle}>
//           <button type="button" onClick={onCancel} style={cancelBtnStyle}>
//             {cancelLabel}
//           </button>
//           <button
//             type="button"
//             onClick={onConfirm}
//             style={logoutBtnStyle}
//             onMouseEnter={(e) =>
//               (e.currentTarget.style.background = COLORS.primaryHover)
//             }
//             onMouseLeave={(e) =>
//               (e.currentTarget.style.background = COLORS.primary)
//             }
//           >
//             {confirmLabel}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// const ProfileCard = ({ setshowProfileCard }) => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const [showLogout, setShowLogout] = useState(false);
//   const [copyStatus, setCopyStatus] = useState(""); // ⬅️ NEW: State for "Copied!" message

//   const handleLogout = () => {
//     logout(); // clears the user's session
//     navigate("/"); // redirects to the landing page
//     setShowLogout(false);
//     setshowProfileCard(false);
//   };

//   // ⬅️ NEW: Function to copy text to clipboard
//   const copyToClipboard = async (text) => {
//     try {
//       await navigator.clipboard.writeText(text);
//       setCopyStatus("Copied!");
//       setTimeout(() => setCopyStatus(""), 2000); // Clear message after 2 seconds
//     } catch (err) {
//       console.error("Failed to copy: ", err);
//       setCopyStatus("Failed to copy!");
//       setTimeout(() => setCopyStatus(""), 2000); // Clear message after 2 seconds
//     }
//   };

//   // ⬅️ NEW: Determine the ID to display and copy
//   const userId =
//     user?.profile?.profile?.id || user?.profile?.id || "P-001-XYZ";

//   return (
//     <>
//       <div className="profileCard" onClick={() => setshowProfileCard(false)}>
//         <div className="pcard" onClick={(e) => e.stopPropagation()}>
//           {/* Display the user's full email from the context */}
//           <p className="email">
//             {user
//               ? user.profile?.profile?.full_name ||
//                 user.profile?.profile?.email ||
//                 "Guest"
//               : "Guest"}
//           </p>

//           <div className="profile-info">
//             <div className="pics">
//               <img src={image} className="profile-image" alt="Profile avatar" />
//               <img src={camera} alt="Camera icon" className="relative" />
//             </div>
//             <div>
//               {/* Display user's name */}
//               <p>
//                 {user
//                   ? user.profile?.profile?.full_name || "Jane Doe"
//                   : "Jane Doe"}
//               </p>
//               {/* Display and allow copying of user ID */}
//               <div className="user-id-wrapper">
//                 <p className="user-id-text">ID: {userId}</p>

//                 <button
//                   className="copy-id-btn"
//                   onClick={() => copyToClipboard(userId)}
//                   title="Copy ID to clipboard"
//                   aria-label="Copy ID to clipboard"
//                   type="button"
//                 >
//                   <img src={CopyIcon} alt="" className="copy-icon" />
//                 </button>

//                 {copyStatus && (
//                   <span className="copy-status" role="status" aria-live="polite">
//                     {copyStatus}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>

//           <button className="green-btn">Manage your AltCare Account</button>

//           <button
//             className="red-btn"
//             onClick={() => setShowLogout(true)}
//             type="button"
//           >
//             <img src={LogOut} alt="Logout icon" />
//             Sign out of AltCare
//           </button>

//           <div onClick={() => setshowProfileCard(false)} className="cancel">
//             X
//           </div>
//         </div>
//       </div>

//       {/* Logout Caution Modal */}
//       <LogoutCautionModal
//         open={showLogout}
//         onCancel={() => setShowLogout(false)}
//         onConfirm={handleLogout}
//         title="Are you sure you want to log out?"
//         description="You’re about to be signed out of AltCare. Unsaved changes may be lost."
//         confirmLabel="Log out"
//         cancelLabel="Cancel"
//       />
//     </>
//   );
// };

// export default ProfileCard;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import "./ProfileCard.css";
import LogOut from "../../../assets/logout.png";
import camera from "../../../assets/camera.png";
import CopyIcon from "../../../assets/copy.png";

/** ───────────────────────────────────────────────
 * Inline Logout Modal (unchanged)
 * ─────────────────────────────────────────────── */
function LogoutCautionModal({
  open,
  onCancel,
  onConfirm,
  title = "Are you sure you want to log out?",
  description = "You’ll need to sign in again to continue using your account.",
  confirmLabel = "Logout",
  cancelLabel = "Cancel",
}) {
  if (!open) return null;

  const COLORS = {
    overlay: "rgba(17,24,39,0.55)",
    border: "#EAECF0",
    text: "#101828",
    muted: "#667085",
    danger: "#EF4444",
    pillBorder: "#D0D5DD",
    pillText: "#111827",
    primary: "#0F766E",
    primaryHover: "#0D6A63",
    white: "#FFFFFF",
  };

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    background: COLORS.overlay,
    display: "grid",
    placeItems: "center",
    zIndex: 9999,
    padding: 16,
  };

  const modalStyle = {
    width: "100%",
    maxWidth: 412,
    minHeight: 294,
    background: COLORS.white,
    color: COLORS.text,
    borderRadius: 16,
    border: `1px solid ${COLORS.border}`,
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
    padding: "24px",
    textAlign: "center",
  };

  const closeBtnStyle = {
    position: "absolute",
    right: 12,
    top: 12,
    height: 28,
    width: 28,
    display: "grid",
    placeItems: "center",
    borderRadius: "999px",
    border: `1px solid ${COLORS.border}`,
    background: COLORS.white,
    color: "#667085",
    cursor: "pointer",
  };

  const iconWrapStyle = {
    height: 44,
    width: 44,
    borderRadius: 999,
    background: "#FEF2F2",
    display: "grid",
    placeItems: "center",
    margin: "0 auto 12px",
  };

  const titleStyle = {
    fontSize: 20,
    fontWeight: 700,
    margin: "6px 0 6px",
    color: COLORS.text,
  };

  const descStyle = {
    fontSize: 14,
    lineHeight: 1.5,
    color: COLORS.muted,
    margin: "0 0 18px",
  };

  const actionsStyle = {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
  };

  const pillBase = {
    height: 50,
    minWidth: 158,
    padding: "0 18px",
    borderRadius: 9999,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    border: "1px solid transparent",
  };

  const cancelBtnStyle = {
    ...pillBase,
    background: COLORS.white,
    borderColor: COLORS.pillBorder,
    color: COLORS.pillText,
  };

  const logoutBtnStyle = {
    ...pillBase,
    background: COLORS.primary,
    color: COLORS.white,
  };

  return (
    <div style={overlayStyle} onMouseDown={(e) => e.target === e.currentTarget && onCancel?.()}>
      <div role="dialog" style={modalStyle}>
        <button onClick={onCancel} aria-label="Close" title="Close" style={closeBtnStyle}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div style={iconWrapStyle}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9.5" stroke={COLORS.danger} />
            <path d="M12 7v6" stroke={COLORS.danger} strokeWidth="2" />
            <circle cx="12" cy="16.5" r="1.25" fill={COLORS.danger} />
          </svg>
        </div>

        <h2 style={titleStyle}>{title}</h2>
        <p style={descStyle}>{description}</p>

        <div style={actionsStyle}>
          <button type="button" onClick={onCancel} style={cancelBtnStyle}>
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            style={logoutBtnStyle}
            onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.primaryHover)}
            onMouseLeave={(e) => (e.currentTarget.style.background = COLORS.primary)}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/** ───────────────────────────────────────────────
 * ProfileCard Component
 * ─────────────────────────────────────────────── */
const ProfileCard = ({ setshowProfileCard }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("profileImage") || "/default-avatar.jpg"
  );

  // 🔁 Sync when localStorage changes (so ProfileSection uploads reflect instantly)
   // 🔁 Sync when localStorage changes (so ProfileSection uploads reflect instantly)
   
   // 🔁 Sync profile image between ProfileSection and ProfileCard in real time
useEffect(() => {
  const updateProfileImage = () => {
    const updated = localStorage.getItem("profileImage");
    if (updated) setProfilePic(updated);
  };

  // Listen to custom app-wide event and same-tab changes
  window.addEventListener("profileImageUpdated", updateProfileImage);
  window.addEventListener("storage", updateProfileImage);

  return () => {
    window.removeEventListener("profileImageUpdated", updateProfileImage);
    window.removeEventListener("storage", updateProfileImage);
  };
}, []);


  const handleLogout = () => {
    logout();
    navigate("/");
    setShowLogout(false);
    setshowProfileCard(false);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("Copied!");
      setTimeout(() => setCopyStatus(""), 2000);
    } catch {
      setCopyStatus("Failed to copy!");
      setTimeout(() => setCopyStatus(""), 2000);
    }
  };

  const userId = user?.profile?.profile?.id || user?.profile?.id || "P-001-XYZ";

  return (
    <>
      <div className="profileCard" onClick={() => setshowProfileCard(false)}>
        <div className="pcard" onClick={(e) => e.stopPropagation()}>
          <p className="email">
            {user
              ? user.profile?.profile?.full_name ||
                user.profile?.profile?.email ||
                "Guest"
              : "Guest"}
          </p>

          <div className="profile-info">
            <div className="pics">
              {/* ✅ UPDATED: Uses uploaded image */}
              <img src={profilePic} className="profile-image" alt="Profile avatar" />
              <img src={camera} alt="Camera icon" className="relative" />
            </div>
            <div>
              <p>{user ? user.profile?.profile?.full_name || "Jane Doe" : "Jane Doe"}</p>
              <div className="user-id-wrapper">
                <p className="user-id-text">ID: {userId}</p>
                <button
                  className="copy-id-btn"
                  onClick={() => copyToClipboard(userId)}
                  title="Copy ID to clipboard"
                  aria-label="Copy ID to clipboard"
                  type="button"
                >
                  <img src={CopyIcon} alt="" className="copy-icon" />
                </button>
                {copyStatus && (
                  <span className="copy-status" role="status" aria-live="polite">
                    {copyStatus}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button className="green-btn">Manage your AltCare Account</button>

          <button
            className="red-btn"
            onClick={() => setShowLogout(true)}
            type="button"
          >
            <img src={LogOut} alt="Logout icon" />
            Sign out of AltCare
          </button>

          <div onClick={() => setshowProfileCard(false)} className="cancel">
            X
          </div>
        </div>
      </div>

      <LogoutCautionModal
        open={showLogout}
        onCancel={() => setShowLogout(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default ProfileCard;
