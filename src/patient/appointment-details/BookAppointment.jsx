// "use client";
// import React, { useState } from "react";
// import "./MyAppointments.css";
// import ChevronUp from "../../assets/chevron-up.svg";
// import CheckIcon from "../../assets/check.svg";

// function ConfirmationBanner({ show }) {
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
//     </div>
//   );
// }

// export default function BookAppointment() {
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

//         {/* --- PREFILLED FORM --- */}
//         <section className="appts-form-wrap">
//           <div className="field-block">
//             <label className="field-label">What type of specialist do you need?</label>
//             <div className="select-like">
//               <span>Dermatologist</span>
//               <img src={ChevronUp} alt="" className="chev-down" />
//             </div>
//           </div>

//           <div className="field-block">
//             <label className="field-label">What are your presenting complaints?</label>
//             <div className="textarea-like">
//               <span>Acne, rash, swelling, redness in my axilla and groin region</span>
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
//               <span>Walk-in</span>
//               <img src={ChevronUp} alt="" className="chev-down" />
//             </div>
//           </div>

//           <button
//             className="primary-cta primary-cta--teal"
//             onClick={() => setShowConfirm(true)}
//           >
//             Book Appointment
//           </button>
//         </section>

//         <ConfirmationBanner show={showConfirm} />
//       </div>
//     </main>
//   );
// }


"use client";
import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext.jsx";
import apiClient from "../../utils/axiosConfig.js";
import "./MyAppointments.css";

const SPECIALISTS = [
  "Dermatologist",
  "Cardiologist",
  "Paediatrician",
  "General Practitioner",
  "Obstetrician/Gynaecologist",
  "ENT",
];

const APPOINTMENT_TYPES = ["Walk-in", "Virtual", "Home visit"];

const DEFAULT_TIME_SLOTS = [
  "08:00",
  "09:15",
  "10:25",
  "11:30",
  "12:00",
  "13:00",
  "14:00",
];

export default function BookAppointment() {
  const { user, logout } = useAuth();
  const token = useMemo(
    () =>
      user?.token ||
      user?.accessToken ||
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken"),
    [user]
  );

  const [specialist, setSpecialist] = useState("");
  const [complaints, setComplaints] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [apptType, setApptType] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const canSubmit =
    specialist.trim() && complaints.trim() && date && time && apptType;

  const todayISO = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    if (!token) {
      toast.error("Missing auth token. Please sign in again.");
      logout?.();
      return;
    }

    setSubmitting(true);
    setSuccess(false);
    try {
      const isoDateTime = new Date(`${date}T${time}:00`).toISOString();

      await apiClient.post(
        "/appointments",
        {
          specialist,
          complaints,
          appointmentType: apptType,
          datetime: isoDateTime,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess(true);
      toast.success("Appointment booked successfully.");
      // Optionally clear some fields after success:
      // setTime(""); setApptType("");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        (err?.response?.status === 401 || err?.response?.status === 403
          ? "Your session has expired. Please sign in again."
          : "Could not book the appointment. Please try again.");
      toast.error(msg);
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        logout?.();
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="appts-page">
      <section className="appts-canvas">
        {/* Hero card */}
        <div className="appts-hero">
          <div className="appts-hero-inner">
            <h2 className="appts-hero-title">Book an Appointment</h2>
            <p className="appts-hero-sub">
              Manage your upcoming and past medical appointments.
            </p>
          </div>
        </div>

        {/* Form */}
        <form className="appts-form-card" onSubmit={handleSubmit}>
          {/* Specialist */}
          <div className="appts-field">
            <label className="appts-label">
              What type of specialist do you need?
            </label>
            <div className="appts-input appts-input--select">
              <select
                value={specialist}
                onChange={(e) => setSpecialist(e.target.value)}
                aria-label="Select Specialist"
              >
                <option value="" disabled>
                  Select Specialist
                </option>
                {SPECIALISTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <span className="appts-chevron" aria-hidden />
            </div>
          </div>

          {/* Complaints */}
          <div className="appts-field">
            <label className="appts-label">
              What are your presenting complaints?
            </label>
            <div className="appts-input appts-input--textarea">
              <textarea
                rows={6}
                placeholder="Please list presenting complaints"
                value={complaints}
                onChange={(e) => setComplaints(e.target.value)}
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="appts-field">
            <label className="appts-label">Select Preferred Date and Time</label>

            <div className="appts-date-row">
              <div className="appts-date-col">
                <span className="appts-date-label">Date:</span>
                <div className="appts-date-box">
                  <input
                    type="date"
                    min={todayISO}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    aria-label="Select date"
                  />
                </div>
              </div>

              {/* Time as accessible radio-group */}
              <fieldset className="appts-time-col" aria-label="Select time">
                <legend className="appts-time-label">Time:</legend>
                <div className="appts-time-radiogroup">
                  {DEFAULT_TIME_SLOTS.map((slot) => {
                    const id = `time-${slot.replace(":", "-")}`;
                    const isDisabled = false; // Flip to true for fully booked times
                    return (
                      <label
                        key={slot}
                        htmlFor={id}
                        className={`appts-time-option ${
                          isDisabled ? "is-disabled" : ""
                        }`}
                      >
                        <input
                          id={id}
                          type="radio"
                          name="time"
                          value={slot}
                          checked={time === slot}
                          onChange={(e) => setTime(e.target.value)}
                          disabled={isDisabled}
                        />
                        <span className="appts-time-chip">{slot}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </div>
          </div>

          {/* Appointment type */}
          <div className="appts-field">
            <label className="appts-label">
              What type of appointment would you prefer?
            </label>
            <div className="appts-input appts-input--select">
              <select
                value={apptType}
                onChange={(e) => setApptType(e.target.value)}
                aria-label="Select appointment type"
              >
                <option value="" disabled>
                  Select appointment type
                </option>
                {APPOINTMENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <span className="appts-chevron" aria-hidden />
            </div>
          </div>

          {/* Submit */}
          <div className="appts-actions">
            <button
              className="appts-submit"
              disabled={!canSubmit || submitting}
              type="submit"
            >
              {submitting ? "Booking…" : "Book Appointment"}
            </button>
          </div>

          {/* Success banner */}
          {success && (
            <div className="appts-success">
              <div className="appts-success-row">
                <span className="appts-success-check" aria-hidden />
                <strong>Appointment Booked</strong>
              </div>
              <p className="appts-success-text">
                Your appointment has been successfully booked, thanks for using
                this service.
              </p>
            </div>
          )}
        </form>
      </section>
    </main>
  );
}
