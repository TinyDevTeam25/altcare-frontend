// "use client";
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { toast } from "react-toastify";
// import { useAuth } from "../../context/AuthContext.jsx";
// import apiClient from "../../utils/axiosConfig.js";
// import "./MyAppointments.css";

// /** Adjust this to the hospital you want to surface to patients */
// const DEFAULT_HOSPITAL_ID = "cac27e77-3e82-4864-b4c5-18b621487edf";

// const APPOINTMENT_TYPES = [
//   { value: "in_person", label: "In-person" },
//   { value: "virtual", label: "Virtual" },
//   { value: "follow_up", label: "Follow-up" },
// ];

// export default function BookAppointment() {
//   const { user, logout } = useAuth();

//   const token = useMemo(
//     () =>
//       user?.token ||
//       user?.accessToken ||
//       localStorage.getItem("token") ||
//       localStorage.getItem("accessToken"),
//     [user]
//   );

//   // resolved silently from /api/patient/profile
//   const [patientId, setPatientId] = useState("");

//   // practitioners list & UI state
//   const [loadingPracts, setLoadingPracts] = useState(false);
//   const [practLoadError, setPractLoadError] = useState("");
//   const [practitioners, setPractitioners] = useState([]); // [{id,name,role,photo?}]
//   const [filter, setFilter] = useState("");
//   const [selectedPract, setSelectedPract] = useState(null);
//   const [showManualId, setShowManualId] = useState(false);
//   const [manualPractId, setManualPractId] = useState("");

//   // form fields
//   const [title, setTitle] = useState("");
//   const [reason, setReason] = useState("");
//   const [apptType, setApptType] = useState("");
//   const [datetime, setDatetime] = useState(""); // datetime-local
//   const [submitting, setSubmitting] = useState(false);

//   // close dropdown on outside click
//   const ddRef = useRef(null);
//   const [openDD, setOpenDD] = useState(false);
//   useEffect(() => {
//     function onDocClick(e) {
//       if (ddRef.current && !ddRef.current.contains(e.target)) setOpenDD(false);
//     }
//     document.addEventListener("mousedown", onDocClick);
//     return () => document.removeEventListener("mousedown", onDocClick);
//   }, []);

//   // 1) resolve patient_id silently
//   useEffect(() => {
//     (async () => {
//       try {
//         const headers = token ? { Authorization: `Bearer ${token}` } : {};
//         const { data } = await apiClient.get("/patient/profile", { headers });
//         const pid =
//           data?.data?.patient?.profile?.id ||
//           user?.profile?.profile?.id ||
//           user?.profile?.id ||
//           "";
//         setPatientId(pid || "");
//       } catch (err) {
//         if (err?.response?.status === 401 || err?.response?.status === 403) {
//           toast.error("Session expired. Please sign in again.");
//           logout?.();
//         } else {
//           console.warn("Could not resolve patient profile:", err?.message);
//         }
//       }
//     })();
//   }, [token, user, logout]);

//   // 2) fetch practitioners from hospital profile (patients see names instead of IDs)
//   useEffect(() => {
//     if (!DEFAULT_HOSPITAL_ID) return;
//     (async () => {
//       setLoadingPracts(true);
//       setPractLoadError("");
//       try {
//         const headers = token ? { Authorization: `Bearer ${token}` } : {};
//         // Try specific hospital
//         const res = await apiClient.get(`/hospital/profile/${DEFAULT_HOSPITAL_ID}`, {
//           headers,
//         });

//         const payload = res?.data?.data || res?.data;
//         const rawList =
//           payload?.practitioners ||
//           payload?.data?.practitioners ||
//           payload?.result?.practitioners ||
//           [];

//         const normalized = (rawList || []).map((p) => ({
//           id: p.id,
//           name: p.name || p.full_name || p.email || "Unnamed Practitioner",
//           role: p.role || "specialist",
//           photo: p.photo || null,
//         }));

//         setPractitioners(normalized);
//       } catch (err) {
//         // If protected, guide backend to expose a patient-safe list
//         const msg =
//           err?.response?.status === 401 || err?.response?.status === 403
//             ? "We couldn't load doctors (access restricted)."
//             : "Unable to load doctors.";
//         setPractLoadError(msg);
//       } finally {
//         setLoadingPracts(false);
//       }
//     })();
//   }, [token]);

//   const filtered = practitioners.filter((p) => {
//     const q = filter.trim().toLowerCase();
//     if (!q) return true;
//     return (
//       p.name?.toLowerCase().includes(q) ||
//       p.role?.toLowerCase().includes(q)
//     );
//   });

//   const canSubmit =
//     patientId &&
//     (selectedPract?.id || (showManualId && manualPractId.trim())) &&
//     title.trim() &&
//     reason.trim() &&
//     apptType &&
//     datetime;

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!canSubmit) return;

//     if (!token) {
//       toast.error("Missing auth token. Please sign in again.");
//       logout?.();
//       return;
//     }

//     const practitioner_id = selectedPract?.id || manualPractId.trim();
//     const payload = {
//       patient_id: patientId, // hidden from UI
//       practitioner_id,
//       title: title.trim(),
//       reason_for_visit: reason.trim(),
//       appointment_type: apptType, // "in_person" | "virtual" | "follow_up"
//       appointment_date: new Date(datetime).toISOString(),
//     };

//     setSubmitting(true);
//     try {
//       await apiClient.post("/patient/book-appointment", payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Appointment booked!");
//       // Optional resets:
//       // setSelectedPract(null); setManualPractId(""); setTitle(""); setReason(""); setApptType(""); setDatetime("");
//     } catch (err) {
//       const msg =
//         err?.response?.data?.message ||
//         (err?.response?.status === 401 || err?.response?.status === 403
//           ? "Your session has expired. Please sign in again."
//           : "Could not book the appointment. Please try again.");
//       toast.error(msg);
//       if (err?.response?.status === 401 || err?.response?.status === 403) {
//         logout?.();
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   return (
//     <main className="appts-page">
//       <section className="appts-canvas">
//         {/* Hero */}
//         <div className="appts-hero">
//           <div className="appts-hero-inner">
//             <h2 className="appts-hero-title">Book an Appointment</h2>
//             <p className="appts-hero-sub">
//               Pick a doctor, choose a time, and we’ll handle the rest.
//             </p>
//           </div>
//         </div>

//         <form className="appts-form-card" onSubmit={handleSubmit}>
//           {/* PRACTITIONER PICKER (searchable) */}
//           <div className="appts-field">
//             <label className="appts-label">Choose your practitioner</label>

//             {/* Search + dropdown */}
//             <div ref={ddRef} style={{ position: "relative" }}>
//               <div
//                 className="appts-input"
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 24px",
//                   alignItems: "center",
//                   padding: "0 12px",
//                   height: 44,
//                   cursor: "text",
//                 }}
//                 onClick={() => setOpenDD((s) => !s)}
//               >
//                 <input
//                   value={
//                     selectedPract
//                       ? `${selectedPract.name}${selectedPract.role ? ` · ${selectedPract.role}` : ""}`
//                       : filter
//                   }
//                   onChange={(e) => {
//                     setSelectedPract(null);
//                     setFilter(e.target.value);
//                   }}
//                   placeholder={
//                     loadingPracts
//                       ? "Loading doctors…"
//                       : practLoadError
//                       ? "Unable to load doctors"
//                       : "Search by name or specialty"
//                   }
//                   style={{
//                     border: "none",
//                     outline: "none",
//                     height: 42,
//                     fontFamily: "Poppins, sans-serif",
//                     fontSize: 16,
//                   }}
//                 />
//                 <span className="appts-chevron" aria-hidden />
//               </div>

//               {/* Dropdown panel */}
//               {openDD && !loadingPracts && !practLoadError && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     zIndex: 10,
//                     top: 48,
//                     left: 0,
//                     right: 0,
//                     background: "#fff",
//                     border: "1px solid #d9d9d9",
//                     borderRadius: 10,
//                     maxHeight: 280,
//                     overflowY: "auto",
//                     boxShadow: "0 8px 22px rgba(0,0,0,.1)",
//                   }}
//                 >
//                   {filtered.length === 0 ? (
//                     <div style={{ padding: 12, color: "#4a5568" }}>
//                       No matching doctors.
//                     </div>
//                   ) : (
//                     filtered.map((p) => (
//                       <button
//                         key={p.id}
//                         type="button"
//                         onClick={() => {
//                           setSelectedPract(p);
//                           setOpenDD(false);
//                         }}
//                         style={{
//                           display: "grid",
//                           gridTemplateColumns: "32px 1fr",
//                           gap: 10,
//                           alignItems: "center",
//                           width: "100%",
//                           textAlign: "left",
//                           padding: "10px 12px",
//                           border: "none",
//                           background: "transparent",
//                           cursor: "pointer",
//                         }}
//                       >
//                         <div
//                           style={{
//                             width: 32,
//                             height: 32,
//                             borderRadius: 999,
//                             background: "#e6fffd",
//                             display: "grid",
//                             placeItems: "center",
//                             fontSize: 12,
//                             color: "#2c7a7b",
//                             overflow: "hidden",
//                           }}
//                           aria-hidden
//                         >
//                           {p.photo ? (
//                             <img
//                               src={p.photo}
//                               alt=""
//                               style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                             />
//                           ) : (
//                             (p.name || "?").slice(0, 1).toUpperCase()
//                           )}
//                         </div>
//                         <div style={{ lineHeight: 1.2 }}>
//                           <div style={{ fontWeight: 600, color: "#121212" }}>{p.name}</div>
//                           <div style={{ fontSize: 12, color: "#4a5568" }}>{p.role}</div>
//                         </div>
//                       </button>
//                     ))
//                   )}
//                 </div>
//               )}

//               {/* Loading / error hint */}
//               {loadingPracts && (
//                 <small style={{ display: "block", marginTop: 6, color: "#4a5568" }}>
//                   Loading doctors…
//                 </small>
//               )}
//               {practLoadError && (
//                 <small style={{ display: "block", marginTop: 6, color: "#b45309" }}>
//                   {practLoadError} — You can still book by entering a Practitioner ID.
//                 </small>
//               )}
//             </div>

//             {/* Manual fallback toggle (only show if list failed OR user wants it) */}
//             {(practLoadError || showManualId) && (
//               <div style={{ marginTop: 10 }}>
//                 {!showManualId ? (
//                   <button
//                     type="button"
//                     className="myappts-btn myappts-btn--ghost"
//                     onClick={() => setShowManualId(true)}
//                   >
//                     Enter Practitioner ID instead
//                   </button>
//                 ) : (
//                   <div style={{ display: "grid", gap: 8 }}>
//                     <input
//                       className="appts-input"
//                       style={{ height: 44, padding: "0 12px" }}
//                       placeholder="Practitioner ID"
//                       value={manualPractId}
//                       onChange={(e) => setManualPractId(e.target.value)}
//                     />
//                     <button
//                       type="button"
//                       className="myappts-btn myappts-btn--ghost"
//                       onClick={() => setShowManualId(false)}
//                     >
//                       Use the doctor list
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Title */}
//           <div className="appts-field">
//             <label className="appts-label">Appointment title</label>
//             <input
//               className="appts-input"
//               style={{ height: 44, padding: "0 16px" }}
//               placeholder="e.g., Follow up – Check-up"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />
//           </div>

//           {/* Reason */}
//           <div className="appts-field">
//             <label className="appts-label">Reason for visit</label>
//             <div className="appts-input appts-input--textarea">
//               <textarea
//                 rows={6}
//                 placeholder="Describe your symptoms or request (e.g., neck pain)"
//                 value={reason}
//                 onChange={(e) => setReason(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Type */}
//           <div className="appts-field">
//             <label className="appts-label">Appointment type</label>
//             <div className="appts-input appts-input--select">
//               <select
//                 value={apptType}
//                 onChange={(e) => setApptType(e.target.value)}
//                 aria-label="Select appointment type"
//               >
//                 <option value="" disabled>
//                   Select type
//                 </option>
//                 {APPOINTMENT_TYPES.map((t) => (
//                   <option key={t.value} value={t.value}>
//                     {t.label}
//                   </option>
//                 ))}
//               </select>
//               <span className="appts-chevron" aria-hidden />
//             </div>
//           </div>

//           {/* Date & time (patient types manually) */}
//           <div className="appts-field">
//             <label className="appts-label">Preferred date & time</label>
//             <input
//               type="datetime-local"
//               className="appts-input"
//               style={{ height: 44, padding: "0 12px" }}
//               value={datetime}
//               onChange={(e) => setDatetime(e.target.value)}
//             />
//           </div>

//           <div className="appts-actions">
//             <button className="appts-submit" disabled={!canSubmit || submitting}>
//               {submitting ? "Booking…" : "Book Appointment"}
//             </button>
//           </div>
//         </form>
//       </section>
//     </main>
//   );
// }


// "use client";
// import React, { useEffect, useMemo, useState } from "react";
// import { toast } from "react-toastify";
// import { useAuth } from "../../context/AuthContext.jsx";
// import apiClient from "../../utils/axiosConfig.js";
// import "./MyAppointments.css";

// /** ================================
//  *  PUBLIC endpoints (adjust paths)
//  *  ================================ */
// const PUBLIC_HOSPITALS_URL = "/public/hospitals"; // e.g. /api/public/hospitals
// const PUBLIC_PRACTITIONERS_FOR_HOSPITAL = (hospitalId) =>
//   `/public/hospitals/${hospitalId}/practitioners`; // e.g. /api/public/hospitals/:id/practitioners

// /** Appointment types aligned to backend enum `Method` */
// const APPOINTMENT_TYPES = [
//   { value: "in_person", label: "In-person" },
//   { value: "virtual", label: "Virtual" },
//   { value: "follow_up", label: "Follow-up" },
// ];

// export default function BookAppointment() {
//   const { user, logout } = useAuth();

//   const token = useMemo(
//     () =>
//       user?.token ||
//       user?.accessToken ||
//       localStorage.getItem("token") ||
//       localStorage.getItem("accessToken"),
//     [user]
//   );

//   /** Hidden patient id (resolved silently) */
//   const [patientId, setPatientId] = useState("");

//   /** Public data */
//   const [hospitals, setHospitals] = useState([]);
//   const [hospitalsLoading, setHospitalsLoading] = useState(false);

//   const [practitioners, setPractitioners] = useState([]);
//   const [practLoading, setPractLoading] = useState(false);

//   /** Form */
//   const [hospitalId, setHospitalId] = useState("");
//   const [practitionerId, setPractitionerId] = useState("");
//   const [apptType, setApptType] = useState("");
//   const [title, setTitle] = useState("");
//   const [reason, setReason] = useState("");
//   const [datetime, setDatetime] = useState(""); // input datetime-local
//   const [submitting, setSubmitting] = useState(false);
//   const [success, setSuccess] = useState(false);

//   /** 1) Get patient profile → patient_id (hidden) */
//   useEffect(() => {
//     (async () => {
//       try {
//         const headers = token ? { Authorization: `Bearer ${token}` } : {};
//         const { data } = await apiClient.get("/patient/profile", { headers });
//         const pid =
//           data?.data?.patient?.profile?.id ||
//           user?.profile?.profile?.id ||
//           user?.profile?.id ||
//           "";

//         if (!pid) {
//           toast.error("Could not resolve your patient profile. Please sign in again.");
//           logout?.();
//           return;
//         }
//         setPatientId(pid);
//       } catch (err) {
//         toast.error(
//           err?.response?.status === 401 || err?.response?.status === 403
//             ? "Session expired. Please sign in again."
//             : "Could not load your profile."
//         );
//         if (err?.response?.status === 401 || err?.response?.status === 403) {
//           logout?.();
//         }
//       }
//     })();
//   }, [token, user, logout]);

//   /** 2) Load hospitals (PUBLIC) */
//   useEffect(() => {
//     (async () => {
//       try {
//         setHospitalsLoading(true);
//         // public endpoint: no auth on purpose
//         const { data } = await apiClient.get(PUBLIC_HOSPITALS_URL);
//         // accept a variety of shapes: data, data.hospitals, etc.
//         const list =
//           data?.data?.hospitals ||
//           data?.hospitals ||
//           data?.data ||
//           data ||
//           [];
//         setHospitals(Array.isArray(list) ? list : []);
//       } catch (err) {
//         console.error("Fetch hospitals error:", err);
//         toast.error("Could not load hospitals.");
//       } finally {
//         setHospitalsLoading(false);
//       }
//     })();
//   }, []);

//   /** 3) When hospital selected → load practitioners (PUBLIC) */
//   useEffect(() => {
//     if (!hospitalId) {
//       setPractitioners([]);
//       setPractitionerId("");
//       return;
//     }
//     (async () => {
//       try {
//         setPractLoading(true);
//         const { data } = await apiClient.get(
//           PUBLIC_PRACTITIONERS_FOR_HOSPITAL(hospitalId)
//         );
//         const raw =
//           data?.data?.practitioners ||
//           data?.practitioners ||
//           data?.data ||
//           data ||
//           [];

//         // Normalize a safe display shape
//         const normalized = (Array.isArray(raw) ? raw : []).map((p) => ({
//           id: p?.id || p?.practitioner_id || p?.uuid || "",
//           name: p?.name || p?.full_name || p?.displayName || "Unknown",
//           role: p?.role || "", // "doctor"/"specialist", etc.
//         }));
//         setPractitioners(normalized.filter((p) => p.id));
//       } catch (err) {
//         console.error("Fetch practitioners error:", err);
//         toast.error("Could not load practitioners for this hospital.");
//       } finally {
//         setPractLoading(false);
//       }
//     })();
//   }, [hospitalId]);

//   const canSubmit =
//     !!patientId &&
//     !!practitionerId &&
//     !!apptType &&
//     title.trim() &&
//     reason.trim() &&
//     !!datetime;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!canSubmit) return;

//     if (!token) {
//       toast.error("Missing auth token. Please sign in again.");
//       logout?.();
//       return;
//     }

//     setSubmitting(true);
//     setSuccess(false);

//     try {
//       const payload = {
//         patient_id: patientId, // never shown
//         practitioner_id: practitionerId,
//         title: title.trim(),
//         reason_for_visit: reason.trim(),
//         appointment_type: apptType, // "in_person" | "virtual" | "follow_up"
//         appointment_date: new Date(datetime).toISOString(), // backend expects ISO
//       };

//       await apiClient.post("/patient/book-appointment", payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setSuccess(true);
//       toast.success("Appointment booked successfully.");
//       // Optionally clear some fields
//       // setTitle(""); setReason(""); setDatetime(""); setApptType(""); setHospitalId(""); setPractitionerId("");
//     } catch (err) {
//       console.error("Book error:", err);
//       const msg =
//         err?.response?.data?.message ||
//         (err?.response?.status === 401 || err?.response?.status === 403
//           ? "Your session has expired. Please sign in again."
//           : "Could not book the appointment. Please try again.");
//       toast.error(msg);
//       if (err?.response?.status === 401 || err?.response?.status === 403) {
//         logout?.();
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <main className="appts-page">
//       <section className="appts-canvas">
//         {/* Hero */}
//         <div className="appts-hero">
//           <div className="appts-hero-inner">
//             <h2 className="appts-hero-title">Book an Appointment</h2>
//             <p className="appts-hero-sub">
//               Pick a hospital, choose a practitioner, and confirm your details.
//             </p>
//           </div>
//         </div>

//         {/* Form */}
//         <form className="appts-form-card" onSubmit={handleSubmit}>
//           {/* Hospital (public) */}
//           <div className="appts-field">
//             <label className="appts-label">Hospital</label>
//             <div className="appts-input appts-input--select">
//               <select
//                 value={hospitalId}
//                 onChange={(e) => setHospitalId(e.target.value)}
//                 aria-label="Select hospital"
//                 disabled={hospitalsLoading}
//               >
//                 <option value="" disabled>
//                   {hospitalsLoading ? "Loading hospitals…" : "Select a hospital"}
//                 </option>
//                 {hospitals.map((h) => (
//                   <option key={h.id} value={h.id}>
//                     {h.name || h.email || h.id}
//                   </option>
//                 ))}
//               </select>
//               <span className="appts-chevron" aria-hidden />
//             </div>
//           </div>

//           {/* Practitioner (public for chosen hospital) */}
//           <div className="appts-field">
//             <label className="appts-label">Practitioner</label>
//             <div className="appts-input appts-input--select">
//               <select
//                 value={practitionerId}
//                 onChange={(e) => setPractitionerId(e.target.value)}
//                 aria-label="Select practitioner"
//                 disabled={!hospitalId || practLoading}
//               >
//                 {!hospitalId ? (
//                   <option value="" disabled>
//                     Select a hospital first
//                   </option>
//                 ) : practLoading ? (
//                   <option value="" disabled>
//                     Loading practitioners…
//                   </option>
//                 ) : practitioners.length ? (
//                   <>
//                     <option value="" disabled>
//                       Select practitioner
//                     </option>
//                     {practitioners.map((p) => (
//                       <option key={p.id} value={p.id}>
//                         {p.name} {p.role ? `— ${p.role}` : ""}
//                       </option>
//                     ))}
//                   </>
//                 ) : (
//                   <option value="" disabled>
//                     No practitioners found
//                   </option>
//                 )}
//               </select>
//               <span className="appts-chevron" aria-hidden />
//             </div>
//           </div>

//           {/* Type */}
//           <div className="appts-field">
//             <label className="appts-label">Appointment type</label>
//             <div className="appts-input appts-input--select">
//               <select
//                 value={apptType}
//                 onChange={(e) => setApptType(e.target.value)}
//                 aria-label="Select appointment type"
//               >
//                 <option value="" disabled>
//                   Select type
//                 </option>
//                 {APPOINTMENT_TYPES.map((t) => (
//                   <option key={t.value} value={t.value}>
//                     {t.label}
//                   </option>
//                 ))}
//               </select>
//               <span className="appts-chevron" aria-hidden />
//             </div>
//           </div>

//           {/* Title */}
//           <div className="appts-field">
//             <label className="appts-label">Title</label>
//             <input
//               className="appts-input"
//               style={{ height: 44, padding: "0 14px" }}
//               placeholder="e.g., Follow up – Check-up"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />
//           </div>

//           {/* Reason */}
//           <div className="appts-field">
//             <label className="appts-label">Reason for visit</label>
//             <div className="appts-input appts-input--textarea">
//               <textarea
//                 rows={6}
//                 placeholder="Briefly describe your symptoms or reason for the visit"
//                 value={reason}
//                 onChange={(e) => setReason(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Date & time (manual input) */}
//           <div className="appts-field">
//             <label className="appts-label">Preferred date & time</label>
//             <input
//               type="datetime-local"
//               className="appts-input"
//               style={{ height: 44, padding: "0 12px" }}
//               value={datetime}
//               onChange={(e) => setDatetime(e.target.value)}
//             />
//           </div>

//           <div className="appts-actions">
//             <button className="appts-submit" disabled={!canSubmit || submitting}>
//               {submitting ? "Booking…" : "Book Appointment"}
//             </button>
//           </div>

//           {success && (
//             <div className="appts-success">
//               <div className="appts-success-row">
//                 <span className="appts-success-check" aria-hidden />
//                 <strong>Appointment Booked</strong>
//               </div>
//               <p className="appts-success-text">
//                 Your appointment has been successfully booked. Thanks for using AltCare!
//               </p>
//             </div>
//           )}
//         </form>
//       </section>
//     </main>
//   );
// }


"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext.jsx";
import apiClient from "../../utils/axiosConfig.js";
import "./MyAppointments.css";

/** ===== Adjust these when backend finalizes paths ===== */
const GET_PATIENT_PROFILE = "/patient/profile"; // GET (auth)
const GET_HOSPITALS = "/hospital/profile";      // GET (auth) – may return one or many
const GET_PRACTITIONERS_BY_HOSPITAL = (id) =>
  `/hospital/profile/${id}/practitioners`;     // GET (auth) – when backend ships it

const APPOINTMENT_TYPES = [
  { value: "in_person", label: "In-person" },
  { value: "virtual", label: "Virtual" },
  { value: "follow_up", label: "Follow-up" },
];

export default function BookAppointment() {
  const { user, logout } = useAuth();

  // Token
  const token = useMemo(
    () =>
      user?.token ||
      user?.accessToken ||
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken"),
    [user]
  );

  // Memoize headers so useEffect deps are stable
  const authHeaders = useMemo(
    () => (token ? { Authorization: `Bearer ${token}` } : undefined),
    [token]
  );

  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Hidden patient id
  const [patientId, setPatientId] = useState("");

  // Hospitals + practitioners
  const [hospitals, setHospitals] = useState([]);
  const [hospitalsLoading, setHospitalsLoading] = useState(false);
  const [hospitals404, setHospitals404] = useState(false);

  const [hospitalId, setHospitalId] = useState("");
  const [practitioners, setPractitioners] = useState([]);
  const [practLoading, setPractLoading] = useState(false);
  const [pract404, setPract404] = useState(false);

  // Manual practitioner ID fallback (until list endpoint is live)
  const [manualPractId, setManualPractId] = useState("");

  // Form
  const [practitionerId, setPractitionerId] = useState("");
  const [apptType, setApptType] = useState("");
  const [title, setTitle] = useState("");
  const [reason, setReason] = useState("");
  const [datetime, setDatetime] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Resolve patient id (auth)
  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const { data } = await apiClient.get(GET_PATIENT_PROFILE, {
          headers: authHeaders,
        });
        const pid =
          data?.data?.patient?.profile?.id ||
          user?.profile?.profile?.id ||
          user?.profile?.id ||
          "";
        if (!pid) {
          toast.error("Could not resolve your patient profile. Please sign in again.");
          logout?.();
          return;
        }
        if (mountedRef.current) setPatientId(pid);
      } catch (err) {
        const status = err?.response?.status;
        toast.error(
          status === 401 || status === 403
            ? "Session expired. Please sign in again."
            : "Could not load your profile."
        );
        if (status === 401 || status === 403) logout?.();
      }
    })();
  }, [token, authHeaders, user, logout]);

  // Load hospitals (auth) — handle 404 without looping
  useEffect(() => {
    if (!token || hospitals404) return;
    (async () => {
      setHospitalsLoading(true);
      try {
        const { data } = await apiClient.get(GET_HOSPITALS, {
          headers: authHeaders,
        });
        let list =
          data?.data?.hospitals || data?.hospitals || data?.data || data || [];
        if (!Array.isArray(list)) list = [list].filter(Boolean);
        if (mountedRef.current) setHospitals(list);
      } catch (err) {
        const status = err?.response?.status;
        if (status === 404) {
          setHospitals404(true); // stop retrying
          // Soft note; don’t spam toasts on re-renders
          console.warn("Hospitals endpoint returned 404. Hiding hospital select.");
        } else {
          toast.error(
            status === 401 || status === 403
              ? "Unauthorized to view hospitals."
              : "Could not load hospitals."
          );
        }
      } finally {
        if (mountedRef.current) setHospitalsLoading(false);
      }
    })();
  }, [token, authHeaders, hospitals404]);

  // Load practitioners when a hospital is chosen (auth) — handle 404 gracefully
  useEffect(() => {
    if (!token || !hospitalId || pract404) return;
    (async () => {
      setPractLoading(true);
      try {
        const url = GET_PRACTITIONERS_BY_HOSPITAL(hospitalId);
        const { data } = await apiClient.get(url, { headers: authHeaders });
        const raw =
          data?.data?.practitioners ||
          data?.practitioners ||
          data?.data ||
          data ||
          [];
        const normalized = (Array.isArray(raw) ? raw : []).map((p) => ({
          id: p?.id || p?.practitioner_id || p?.uuid || "",
          name: p?.name || p?.full_name || p?.displayName || "Unknown",
          speciality:
            p?.speciality || p?.specialty || p?.department || p?.role || "",
        }));
        if (mountedRef.current) {
          setPractitioners(normalized.filter((p) => p.id));
          setPractitionerId("");
        }
      } catch (err) {
        const status = err?.response?.status;
        if (status === 404) {
          setPract404(true);
          console.warn(
            "Practitioners-by-hospital endpoint returned 404. Falling back to manual practitioner ID."
          );
        } else {
          toast.error(
            status === 401 || status === 403
              ? "Unauthorized to view practitioners."
              : "Could not load practitioners."
          );
        }
      } finally {
        if (mountedRef.current) setPractLoading(false);
      }
    })();
  }, [token, authHeaders, hospitalId, pract404]);

  // If list is unavailable, use manual ID; else use selected
  const effectivePractitionerId =
    !hospitals404 && !pract404 && practitioners.length
      ? practitionerId
      : manualPractId.trim();

  const canSubmit =
    !!patientId &&
    !!effectivePractitionerId &&
    !!apptType &&
    title.trim() &&
    reason.trim() &&
    !!datetime;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setSuccess(false);
    try {
      const payload = {
        patient_id: patientId,
        practitioner_id: effectivePractitionerId,
        title: title.trim(),
        reason_for_visit: reason.trim(),
        appointment_type: apptType, // in_person | virtual | follow_up
        appointment_date: new Date(datetime).toISOString(),
      };

      await apiClient.post("/patient/book-appointment", payload, {
        headers: authHeaders,
      });

      setSuccess(true);
      toast.success("Appointment booked successfully.");
    } catch (err) {
      const status = err?.response?.status;
      const msg =
        err?.response?.data?.message ||
        (status === 401 || status === 403
          ? "Your session has expired. Please sign in again."
          : "Could not book the appointment. Please try again.");
      toast.error(msg);
      if (status === 401 || status === 403) logout?.();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="appts-page">
      <section className="appts-canvas">
        <div className="appts-hero">
          <div className="appts-hero-inner">
            <h2 className="appts-hero-title">Book an Appointment</h2>
            <p className="appts-hero-sub">
              Pick who you want to see and confirm your details.
            </p>
          </div>
        </div>

        <form className="appts-form-card" onSubmit={handleSubmit}>
          {/* Hospital select (hidden if endpoint 404) */}
          {!hospitals404 && (
            <div className="appts-field">
              <label className="appts-label">Hospital</label>
              <div className="appts-input appts-input--select">
                <select
                  value={hospitalId}
                  onChange={(e) => setHospitalId(e.target.value)}
                  aria-label="Select hospital"
                  disabled={hospitalsLoading}
                >
                  <option value="" disabled>
                    {hospitalsLoading ? "Loading hospitals…" : "Select a hospital"}
                  </option>
                  {hospitals.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name || h.email || h.id}
                    </option>
                  ))}
                </select>
                <span className="appts-chevron" aria-hidden />
              </div>
            </div>
          )}

          {/* Practitioner (list if available; else manual ID) */}
          {!hospitals404 && !pract404 && practitioners.length > 0 ? (
            <div className="appts-field">
              <label className="appts-label">Practitioner</label>
              <div className="appts-input appts-input--select">
                <select
                  value={practitionerId}
                  onChange={(e) => setPractitionerId(e.target.value)}
                  aria-label="Select practitioner"
                  disabled={!hospitalId || practLoading}
                >
                  {!hospitalId ? (
                    <option value="" disabled>
                      Select a hospital first
                    </option>
                  ) : practLoading ? (
                    <option value="" disabled>
                      Loading practitioners…
                    </option>
                  ) : (
                    <>
                      <option value="" disabled>
                        Select practitioner
                      </option>
                      {practitioners.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                          {p.speciality ? ` — ${p.speciality}` : ""}
                        </option>
                      ))}
                    </>
                  )}
                </select>
                <span className="appts-chevron" aria-hidden />
              </div>
            </div>
          ) : (
            <div className="appts-field">
              <label className="appts-label">
                Practitioner ID{" "}
                <span style={{ color: "#6b7280", fontWeight: 400 }}>
                  (temporary while list endpoint is unavailable)
                </span>
              </label>
              <input
                className="appts-input"
                style={{ height: 44, padding: "0 14px" }}
                placeholder="Paste practitioner UUID"
                value={manualPractId}
                onChange={(e) => setManualPractId(e.target.value)}
              />
            </div>
          )}

          {/* Type */}
          <div className="appts-field">
            <label className="appts-label">Appointment type</label>
            <div className="appts-input appts-input--select">
              <select
                value={apptType}
                onChange={(e) => setApptType(e.target.value)}
                aria-label="Select appointment type"
              >
                <option value="" disabled>
                  Select type
                </option>
                {APPOINTMENT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              <span className="appts-chevron" aria-hidden />
            </div>
          </div>

          {/* Title */}
          <div className="appts-field">
            <label className="appts-label">Title</label>
            <input
              className="appts-input"
              style={{ height: 44, padding: "0 14px" }}
              placeholder="e.g., Follow up – Check-up"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Reason */}
          <div className="appts-field">
            <label className="appts-label">Reason for visit</label>
            <div className="appts-input appts-input--textarea">
              <textarea
                rows={6}
                placeholder="Briefly describe your symptoms or reason for the visit"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          </div>

          {/* Date & time */}
          <div className="appts-field">
            <label className="appts-label">Preferred date & time</label>
            <input
              type="datetime-local"
              className="appts-input"
              style={{ height: 44, padding: "0 12px" }}
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
            />
          </div>

          <div className="appts-actions">
            <button className="appts-submit" disabled={!canSubmit || submitting}>
              {submitting ? "Booking…" : "Book Appointment"}
            </button>
          </div>

          {success && (
            <div className="appts-success">
              <div className="appts-success-row">
                <span className="appts-success-check" aria-hidden />
                <strong>Appointment Booked</strong>
              </div>
              <p className="appts-success-text">
                Your appointment has been successfully booked. Thanks for using AltCare!
              </p>
            </div>
          )}
        </form>
      </section>
    </main>
  );
}
