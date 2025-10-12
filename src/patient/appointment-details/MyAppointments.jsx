// "use client";
// import React, { useState } from "react";
// import "./MyAppointments.css";

// import ChevronUp from "../../assets/chevron-up.svg";
// import CheckIcon from "../../assets/check.svg";

// function ConfirmationBanner({ show, onClose }) {
//   if (!show) return null;
//   return (
//     <div className="confirm-banner">
//       <div className="confirm-banner__row">
//         <span className="confirm-banner__title">Appointment Booked</span>
//         <img src={CheckIcon} alt="" className="confirm-banner__icon" />
//       </div>
//       <p className="confirm-banner__text">
//         Your appointment has been successfully booked, thanks for using this service
//       </p>
//       <button className="confirm-banner__close" onClick={onClose} aria-label="Close">×</button>
//     </div>
//   );
// }

// export default function MyAppointments() {
//   const [showConfirm, setShowConfirm] = useState(false);

//   return (
//     <main className="appts-page">
//       <div className="appts-canvas">
//         {/* --- BOOK CARD (hero) --- */}
//         <section className="appts-hero">
//           <div className="appts-hero__card">
//             <h2>Book an Appointment</h2>
//             <p>Manage your upcoming and past medical appointments.</p>
//           </div>
//         </section>

//         {/* --- FORM --- */}
//         <section className="appts-form-wrap">
//           <div className="field-block">
//             <label className="field-label">What type of specialist do you need?</label>
//             <div className="select-like">
//               <span className="ph">Select Specialist</span>
//               <img src={ChevronUp} alt="" className="chev-down" />
//             </div>
//           </div>

//           <div className="field-block">
//             <label className="field-label">What are your presenting complaints?</label>
//             <div className="textarea-like">
//               <span className="ph">Please list presenting complaints</span>
//             </div>
//           </div>

//           <div className="date-time-col">
//             <label className="field-label">Select Preferred Date and Time</label>

//             <div className="date-box-row">
//               <span className="dt-label">Date:</span>
//               <div className="date-box" />
//             </div>

//             <div className="time-row">
//               <span className="dt-label">Time:</span>
//               <div className="time-grid">
//                 <button className="time-pill">08:00</button>
//                 <button className="time-pill">09:15</button>
//                 <button className="time-pill">10:25</button>
//                 <button className="time-pill time-pill--active">11:30</button>
//                 <button className="time-pill">12:00</button>
//                 <button className="time-pill">13:00</button>
//                 <button className="time-pill">14:00</button>
//               </div>
//             </div>
//           </div>

//           <div className="field-block">
//             <label className="field-label">What type of appointment would you prefer?</label>
//             <div className="select-like">
//               <span className="ph">Select appointment type</span>
//               <img src={ChevronUp} alt="" className="chev-down" />
//             </div>
//           </div>

//           <button className="primary-cta" onClick={() => setShowConfirm(true)}>
//             Book Appointment
//           </button>
//         </section>

//         <ConfirmationBanner show={showConfirm} onClose={() => setShowConfirm(false)} />
//       </div>
//     </main>
//   );
// }


"use client";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext.jsx";
import apiClient from "../../utils/axiosConfig.js";
import "./MyAppointments.css";

const TIME_SLOTS = ["08:00","09:15","10:25","11:30","12:00","13:00","14:00"];

function groupAppointments(list) {
  const now = new Date();
  const upcoming = [];
  const past = [];
  list.forEach((a) => {
    const dt = new Date(a.datetime);
    (dt >= now ? upcoming : past).push(a);
  });
  // Sort: nearest first for upcoming, latest first for past
  upcoming.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
  past.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
  return { upcoming, past };
}

export default function MyAppointments() {
  const { user, logout } = useAuth();
  const token = useMemo(
    () =>
      user?.token ||
      user?.accessToken ||
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken"),
    [user]
  );

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [rescheduleFor, setRescheduleFor] = useState(null);

  // reschedule form state
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const { upcoming, past } = groupAppointments(list);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const { data } = await apiClient.get("/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Expecting array of: { id, specialist, appointmentType, complaints, datetime, status }
        setList(Array.isArray(data) ? data : data?.items ?? []);
      } catch (err) {
        const msg =
          err?.response?.data?.message ||
          "Failed to load appointments. Please try again.";
        toast.error(msg);
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          logout?.();
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token, logout]);

  const handleCancel = async (id) => {
    try {
      await apiClient.delete(`/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setList((prev) => prev.filter((a) => a.id !== id));
      toast.success("Appointment cancelled.");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Could not cancel appointment. Please try again.";
      toast.error(msg);
    }
  };

  const openReschedule = (appt) => {
    setRescheduleFor(appt);
    setNewDate("");
    setNewTime("");
  };

  const submitReschedule = async (e) => {
    e.preventDefault();
    if (!rescheduleFor || !newDate || !newTime) return;
    try {
      const iso = new Date(`${newDate}T${newTime}:00`).toISOString();
      await apiClient.patch(
        `/appointments/${rescheduleFor.id}`,
        { datetime: iso },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setList((prev) =>
        prev.map((a) => (a.id === rescheduleFor.id ? { ...a, datetime: iso } : a))
      );
      setRescheduleFor(null);
      toast.success("Appointment rescheduled.");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Could not reschedule. Please try again.";
      toast.error(msg);
    }
  };

  return (
    <main className="appts-page">
      <section className="appts-canvas">
        {/* Hero bar */}
        <div className="appts-hero">
          <div className="appts-hero-inner">
            <h2 className="appts-hero-title">My Appointments</h2>
            <p className="appts-hero-sub">
              Manage your upcoming and past medical appointments.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="myappts-grid">
          {/* Upcoming */}
          <section className="myappts-section">
            <h3 className="myappts-heading">Upcoming</h3>

            {loading ? (
              <div className="myappts-empty">Loading…</div>
            ) : upcoming.length === 0 ? (
              <div className="myappts-empty">
                You don’t have any upcoming appointments yet.
              </div>
            ) : (
              <ul className="myappts-list">
                {upcoming.map((a) => (
                  <li key={a.id} className="myappts-card">
                    <div className="myappts-row">
                      <div className="myappts-main">
                        <p className="myappts-title">
                          {a.specialist} &middot; {a.appointmentType}
                        </p>
                        <p className="myappts-sub">
                          {new Date(a.datetime).toLocaleString([], {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </p>
                        {a.complaints ? (
                          <p className="myappts-note">{a.complaints}</p>
                        ) : null}
                      </div>

                      <div className="myappts-actions-row">
                        <button
                          className="myappts-btn myappts-btn--ghost"
                          type="button"
                          onClick={() => openReschedule(a)}
                        >
                          Reschedule
                        </button>
                        <button
                          className="myappts-btn myappts-btn--danger"
                          type="button"
                          onClick={() => handleCancel(a.id)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Past */}
          <section className="myappts-section">
            <h3 className="myappts-heading">Past</h3>

            {loading ? (
              <div className="myappts-empty">Loading…</div>
            ) : past.length === 0 ? (
              <div className="myappts-empty">
                No past appointments yet.
              </div>
            ) : (
              <ul className="myappts-list">
                {past.map((a) => (
                  <li key={a.id} className="myappts-card myappts-card--muted">
                    <div className="myappts-row">
                      <div className="myappts-main">
                        <p className="myappts-title">
                          {a.specialist} &middot; {a.appointmentType}
                        </p>
                        <p className="myappts-sub">
                          {new Date(a.datetime).toLocaleString([], {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </p>
                        {a.complaints ? (
                          <p className="myappts-note">{a.complaints}</p>
                        ) : null}
                      </div>

                      <div className="myappts-status">
                        {a.status ? a.status : "Completed"}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </section>

      {/* Reschedule modal */}
      {rescheduleFor && (
        <div className="appts-modal">
          <div className="appts-modal-card">
            <div className="appts-modal-header">
              <h4>Reschedule appointment</h4>
              <button
                className="appts-modal-close"
                type="button"
                onClick={() => setRescheduleFor(null)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <form className="appts-modal-body" onSubmit={submitReschedule}>
              <div className="appts-modal-field">
                <label className="appts-label">Date:</label>
                <div className="appts-date-box appts-date-box--sm">
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="appts-modal-field">
                <label className="appts-label">Time:</label>
                <div className="appts-time-pills">
                  {TIME_SLOTS.map((slot) => {
                    const active = newTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        className={`appts-pill ${active ? "is-active" : ""}`}
                        onClick={() => setNewTime(slot)}
                        aria-pressed={active}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="appts-modal-actions">
                <button
                  className="myappts-btn myappts-btn--ghost"
                  type="button"
                  onClick={() => setRescheduleFor(null)}
                >
                  Cancel
                </button>
                <button
                  className="myappts-btn"
                  type="submit"
                  disabled={!newDate || !newTime}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
