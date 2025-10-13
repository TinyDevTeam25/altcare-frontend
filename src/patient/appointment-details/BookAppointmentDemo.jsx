"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext.jsx";
import apiClient from "../../utils/axiosConfig.js";
import "./MyAppointments.css";

/** ==========================
 *  DEMO SWITCH
 *  - true  = always mock
 *  - false = try API, fallback to mock on error
 * ========================== */
const DEMO_MODE = false;

/** A tiny hard-coded roster for the demo UI */
const DEMO_PRACTITIONERS = [
  { id: "d-prac-001", name: "Dr. Ada U.", specialty: "Dermatologist" },
  { id: "d-prac-002", name: "Dr. Ben K.", specialty: "Cardiologist" },
  { id: "d-prac-003", name: "Dr. Chi O.", specialty: "Paediatrician" },
];

const APPOINTMENT_TYPES = [
  { value: "in_person", label: "In-person" },
  { value: "virtual", label: "Virtual" },
  { value: "follow_up", label: "Follow-up" },
];

const GET_PATIENT_PROFILE = "/patient/profile"; // auth GET (real api)
const BOOK_APPOINTMENT = "/patient/book-appointment"; // auth POST (real api)

/** Utility: quick uuid-ish for demo storage */
const rid = () =>
  "demo_" +
  Math.random().toString(36).slice(2, 8) +
  "_" +
  Date.now().toString(36);

/** Persist demo bookings */
const saveDemoBooking = (item) => {
  const key = "demo_bookings";
  const list = JSON.parse(localStorage.getItem(key) || "[]");
  list.unshift(item);
  localStorage.setItem(key, JSON.stringify(list));
};
const getDemoBookings = () => {
  const key = "demo_bookings";
  return JSON.parse(localStorage.getItem(key) || "[]");
};

export default function BookAppointmentDemo() {
  const { user, logout } = useAuth();
  const [demoList, setDemoList] = useState(getDemoBookings());

  // Token from multiple sources
  const token = useMemo(
    () =>
      user?.token ||
      user?.accessToken ||
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken"),
    [user]
  );
  const authHeaders = useMemo(
    () => (token ? { Authorization: `Bearer ${token}` } : undefined),
    [token]
  );

  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => (mountedRef.current = false);
  }, []);

  // Hidden patient id
  const [patientId, setPatientId] = useState("");

  // Form state
  const [practitionerId, setPractitionerId] = useState("");
  const [apptType, setApptType] = useState("");
  const [title, setTitle] = useState("");
  const [reason, setReason] = useState("");
  const [datetime, setDatetime] = useState("");

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Resolve patient ID (for real API; demo can still work without it)
  useEffect(() => {
    if (!token || DEMO_MODE) return; // skip in demo-only mode
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
          toast.warn("Could not resolve your profile id; demo mode works without it.");
          return;
        }
        if (mountedRef.current) setPatientId(pid);
      } catch (err) {
        const s = err?.response?.status;
        if (s === 401 || s === 403) {
          toast.error("Session expired. Please sign in again.");
          logout?.();
        } else {
          toast.warn("Could not load profile. Demo will still work.");
        }
      }
    })();
  }, [token, authHeaders, user, logout]);

  const canSubmit =
    (!!patientId || DEMO_MODE) &&
    practitionerId.trim() &&
    apptType &&
    title.trim() &&
    reason.trim() &&
    datetime;

  /** Do real POST; fallback to demo if disabled or fails */
  const submitReal = async (payload) => {
    if (!token) throw new Error("NO_TOKEN");
    const { data } = await apiClient.post(BOOK_APPOINTMENT, payload, {
      headers: authHeaders,
    });
    return data;
  };

  const submitDemo = async (payload) => {
    // pretend network
    await new Promise((r) => setTimeout(r, 600));
    const demo = {
      id: rid(),
      ...payload,
      status: "scheduled",
      created_at: new Date().toISOString(),
    };
    saveDemoBooking(demo);
    return { status: "success", data: demo };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setSuccess(false);

    // Construct the server payload exactly as backend expects
    const payload = {
      patient_id: patientId || "demo-patient-id",
      practitioner_id: practitionerId.trim(),
      title: title.trim(),
      reason_for_visit: reason.trim(),
      appointment_type: apptType, // in_person | virtual | follow_up
      appointment_date: new Date(datetime).toISOString(),
    };

    try {
      if (DEMO_MODE) {
        await submitDemo(payload);
      } else {
        try {
          await submitReal(payload);
        } catch (err) {
          console.warn("Real booking failed; falling back to demo.", err);
          await submitDemo(payload);
        }
      }

      setSuccess(true);
      toast.success("Appointment booked successfully.");
      // Reload demo list if we just saved one
      if (mountedRef.current) setDemoList(getDemoBookings());
      // Optional: clear the form except type (keep user context)
      setTitle("");
      setReason("");
      setDatetime("");
    } catch (err) {
      const s = err?.response?.status;
      const msg =
        err?.response?.data?.message ||
        (s === 401 || s === 403
          ? "Your session has expired. Please sign in again."
          : "Could not book the appointment. Please try again.");
      toast.error(msg);
      if (s === 401 || s === 403) logout?.();
    } finally {
      if (mountedRef.current) setSubmitting(false);
    }
  };

  return (
    <main className="appts-page">
      <section className="appts-canvas">
        {/* Hero */}
        <div className="appts-hero">
          <div className="appts-hero-inner">
            <h2 className="appts-hero-title">Book an Appointment</h2>
            <p className="appts-hero-sub">
              {DEMO_MODE
                ? "Demo mode is ON — bookings are simulated."
                : "If API isn’t available, we’ll gracefully simulate your booking."}
            </p>
          </div>
        </div>

        {/* Form */}
        <form className="appts-form-card" onSubmit={handleSubmit}>
          {/* Practitioner */}
          <div className="appts-field">
            <label className="appts-label">Choose a practitioner</label>
            <div className="appts-input appts-input--select">
              <select
                value={practitionerId}
                onChange={(e) => setPractitionerId(e.target.value)}
                aria-label="Select practitioner"
              >
                <option value="" disabled>
                  Select practitioner
                </option>
                {DEMO_PRACTITIONERS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.specialty}
                  </option>
                ))}
              </select>
              <span className="appts-chevron" aria-hidden />
            </div>
          </div>

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

          {/* DateTime */}
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

          {/* Submit */}
          <div className="appts-actions">
            <button className="appts-submit" disabled={!canSubmit || submitting}>
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
                {DEMO_MODE
                  ? "This is a demo booking stored locally for your presentation."
                  : "we saved a demo booking locally so you can proceed."}
              </p>
            </div>
          )}
        </form>

        {/* Demo list (so you can show history during the pitch) */}
        {demoList.length > 0 && (
          <div style={{ marginTop: 24 }} className="myappts-section">
            <div className="myappts-heading">Recent demo bookings</div>
            <ul className="myappts-list">
              {demoList.map((a) => (
                <li key={a.id} className="myappts-card">
                  <div className="myappts-row">
                    <div className="myappts-main">
                      <h4 className="myappts-title">{a.title}</h4>
                      <p className="myappts-sub">
                        {a.appointment_type?.replace("_", " ")} —{" "}
                        {new Date(a.appointment_date).toLocaleString()}
                      </p>
                      <p className="myappts-note">
                        Practitioner: {a.practitioner_id} • {a.reason_for_visit}
                      </p>
                    </div>
                    <div className="myappts-status">
                      {a.status || "scheduled"}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}
