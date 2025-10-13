"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../../utils/axiosConfig.js";
import { useAuth } from "../../context/AuthContext.jsx";
import "./MyAppointments.css";

/* -----------------------
   Small utilities
------------------------*/
const APPOINTMENT_TYPES = [
  { value: "in_person", label: "In-person" },
  { value: "virtual", label: "Virtual" },
  { value: "follow_up", label: "Follow-up" },
];

function buildSlots(start = "09:00", end = "17:00", stepMin = 30) {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  let cur = sh * 60 + sm;
  const last = eh * 60 + em;
  const out = [];
  while (cur <= last) {
    const h = String(Math.floor(cur / 60)).padStart(2, "0");
    const m = String(cur % 60).padStart(2, "0");
    out.push(`${h}:${m}`);
    cur += stepMin;
  }
  return out;
}
const DEFAULT_SLOTS = buildSlots("09:00", "17:00", 30);

function toUtcIso(dateStr, timeStr = "09:00") {
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return null;
  const t = /^\d{2}:\d{2}$/.test(timeStr) ? timeStr : "09:00";
  const local = new Date(`${dateStr}T${t}:00`);
  if (isNaN(local.getTime())) return null;
  return new Date(local.getTime() - local.getTimezoneOffset() * 60000).toISOString();
}
function ymd(d) {
  const dt = typeof d === "string" ? new Date(d) : d;
  if (isNaN(dt.getTime())) return "";
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(
    dt.getDate()
  ).padStart(2, "0")}`;
}
function hhmm(d) {
  const dt = typeof d === "string" ? new Date(d) : d;
  if (isNaN(dt.getTime())) return "";
  return dt.toTimeString().slice(0, 5);
}
function useDebouncedValue(value, delay = 350) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

/* -------------------------------------------
   PractitionerSelect (live dropdown / typeahead)
--------------------------------------------*/
function PractitionerSelect({ token, onSelect }) {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]); // [{id, name, specialty, email}]
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  const debouncedQ = useDebouncedValue(q, 350);

  // click-away to close
  useEffect(() => {
    function onDoc(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    (async () => {
      if (!token) return;
      if (!debouncedQ || debouncedQ.trim().length < 2) {
        setOptions([]);
        return;
      }

      setLoading(true);
      try {
        // Try common endpoints in order. Stop on first that returns an array.
        const headers = { Authorization: `Bearer ${token}` };
        const tries = [
          () => apiClient.get(`/practitioner/search`, { headers, params: { q: debouncedQ } }), // preferred
          () => apiClient.get(`/practitioner/list`, { headers, params: { q: debouncedQ } }),
          () => apiClient.get(`/practitioner/all`, { headers, params: { q: debouncedQ } }),
        ];

        let list = [];
        for (const fn of tries) {
          try {
            const r = await fn();
            const raw = r?.data?.data || r?.data || [];
            if (Array.isArray(raw) && raw.length >= 0) {
              list = raw;
              break;
            }
          } catch {
            // try next shape
          }
        }

        // normalize to {id, name, specialty, email}
        const normalized = (Array.isArray(list) ? list : []).map((p, i) => ({
          id: p.id || p.practitioner_id || p.uuid || String(i),
          name: p.name || p.full_name || p.displayName || "Unnamed",
          specialty: p.specialty || p.role || p.title || "",
          email: p.email || p.contactEmail || "",
        }));
        setOptions(normalized);
        setOpen(true);
      } catch (err) {
        console.error("search practitioners:", err);
        toast.error("Could not load practitioners right now.");
      } finally {
        setLoading(false);
      }
    })();
  }, [debouncedQ, token]);

  return (
    <div ref={boxRef} className="appts-field">
      <label className="appts-label">Practitioner</label>
      <div className="appts-input" style={{ padding: 0 }}>
        <div className="appts-input--select" style={{ padding: "0 16px" }}>
          <input
            className="field-input"
            style={{ border: "none", outline: "none", height: 44 }}
            placeholder="Type to search (e.g., Adaeze, Kunle)…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => q.length >= 2 && setOpen(true)}
          />
          <span className="appts-chevron" aria-hidden />
        </div>
      </div>

      {open && (options.length > 0 || loading) && (
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            marginTop: 6,
            boxShadow: "0 8px 24px rgba(0,0,0,.08)",
            overflow: "hidden",
          }}
        >
          {loading && (
            <div style={{ padding: 12, fontFamily: "Poppins, sans-serif", color: "#4a5568" }}>
              Searching…
            </div>
          )}

          {!loading &&
            options.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  onSelect(p); // pass the whole object upwards
                  setQ(p.name);
                  setOpen(false);
                }}
                style={{
                  display: "flex",
                  width: "100%",
                  textAlign: "left",
                  gap: 10,
                  padding: "10px 12px",
                  cursor: "pointer",
                  border: "none",
                  background: "#fff",
                  fontFamily: "Poppins, sans-serif",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
              >
                <div style={{ fontWeight: 600, color: "#111827" }}>{p.name}</div>
                <div style={{ color: "#6b7280" }}>
                  {p.specialty ? `• ${p.specialty}` : ""}
                  {p.email ? ` • ${p.email}` : ""}
                </div>
              </button>
            ))}

          {!loading && options.length === 0 && (
            <div style={{ padding: 12, fontFamily: "Poppins, sans-serif", color: "#6b7280" }}>
              No matches.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------
   Main page
--------------------------------------------*/
export default function BookAppointmentLive() {
  const { user, logout } = useAuth();

  const token = useMemo(
    () =>
      user?.token ||
      user?.accessToken ||
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken"),
    [user]
  );

  // identity
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [patientProfileId, setPatientProfileId] = useState("");

  // form
  const [practitioner, setPractitioner] = useState(null); // {id, name, specialty, email}
  const [title, setTitle] = useState("");
  const [reason, setReason] = useState("");
  const [apptType, setApptType] = useState("virtual");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // availability
  const [busyTimes, setBusyTimes] = useState(new Set());
  const [submitting, setSubmitting] = useState(false);

  // Load patient profile id (used as patient_id)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!token) return;
      try {
        setLoadingProfile(true);
        const res = await apiClient.get("/patient/profile", {
          headers: { Authorization: `Bearer ${token}`, "Cache-Control": "no-cache" },
          params: { t: Date.now() },
          validateStatus: (s) => (s >= 200 && s < 300) || s === 304,
        });
        const data = res?.data?.data;
        const pid =
          data?.patient?.profile?.id ||
          data?.profile?.id ||
          data?.patient?.id;
        if (!pid) throw new Error("Could not determine your patient profile ID.");
        if (!cancelled) setPatientProfileId(pid);
      } catch (err) {
        console.error("profile load:", err);
        toast.error("Could not load your profile. Please sign in again.");
        logout?.();
      } finally {
        if (!cancelled) setLoadingProfile(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token, logout]);

  // Fetch busy times whenever practitioner or date changes
  useEffect(() => {
    (async () => {
      setBusyTimes(new Set());
      if (!practitioner?.id || !date || !token) return;

      try {
        const r = await apiClient.get(`/practitioner/bookings/${practitioner.id}`, {
          headers: { Authorization: `Bearer ${token}` },
          validateStatus: (s) => (s >= 200 && s < 300) || s === 304,
        });

        const list =
          r?.data?.data?.bookings ||
          r?.data?.bookings ||
          r?.data?.data ||
          r?.data ||
          [];

        const d = ymd(date);
        const taken = new Set();
        (Array.isArray(list) ? list : []).forEach((b) => {
          const when = b?.appointment_date;
          if (when && ymd(when) === d) {
            const t = hhmm(when);
            if (t) taken.add(t);
          }
        });
        setBusyTimes(taken);
      } catch {
        // It’s optional. We still allow booking if list isn’t available.
      }
    })();
  }, [practitioner?.id, date, token]);

  const canSubmit =
    !!patientProfileId &&
    !!practitioner?.id &&
    title.trim() &&
    reason.trim() &&
    apptType &&
    date &&
    time;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    const iso = toUtcIso(date, time);
    if (!iso) {
      toast.error("Invalid date/time.");
      return;
    }

    setSubmitting(true);
    try {
      await apiClient.post(
        "/patient/book-appointment",
        {
          patient_id: patientProfileId,
          practitioner_id: practitioner.id,
          title: title.trim(),
          reason_for_visit: reason.trim(),
          appointment_type: apptType, // "in_person" | "virtual" | "follow_up"
          appointment_date: iso, // UTC Z
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Appointment booked 🎉");

      // reset minimal fields
      setTitle("");
      setReason("");
      setDate("");
      setTime("");
      setApptType("virtual");
      // keep practitioner typed value for convenience
    } catch (err) {
      console.error("book error:", err);
      const code = err?.response?.status;
      const msg =
        err?.response?.data?.message ||
        (code === 401 || code === 403
          ? "Your session has expired. Please sign in again."
          : "Could not book the appointment. Please try again.");
      toast.error(msg);
      if (code === 401 || code === 403) logout?.();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="appts-page">
      <section className="appts-canvas">
        {/* hero */}
        <div className="appts-hero">
          <div className="appts-hero-inner">
            <h2 className="appts-hero-title">Book an Appointment</h2>
            <p className="appts-hero-sub">
              Search a practitioner, pick date & time, and you’re done.
            </p>
          </div>
        </div>

        <form className="appts-form-card" onSubmit={handleSubmit}>
          {/* Patient id (read only) */}
          <div className="appts-field">
            <label className="appts-label">Your Patient ID</label>
            <div className="appts-input" style={{ padding: "12px 16px" }}>
              {loadingProfile ? "Loading…" : patientProfileId || "—"}
            </div>
          </div>

          {/* Practitioner search (live) */}
          <PractitionerSelect
            token={token}
            onSelect={(p) => setPractitioner(p)}
          />
          {practitioner?.id && (
            <div className="myappts-sub" style={{ marginTop: -6 }}>
              Selected: <strong>{practitioner.name}</strong>{" "}
              {practitioner.specialty ? (
                <span style={{ color: "#4a5568" }}>• {practitioner.specialty}</span>
              ) : null}
            </div>
          )}

          {/* Title */}
          <div className="appts-field">
            <label className="appts-label">Title</label>
            <div className="appts-input" style={{ padding: 12 }}>
              <input
                className="field-input"
                style={{ border: "none", outline: "none", width: "100%" }}
                placeholder="e.g., Follow up-Check-up"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          {/* Reason */}
          <div className="appts-field">
            <label className="appts-label">Reason for visit</label>
            <div className="appts-input appts-input--textarea">
              <textarea
                rows={5}
                placeholder="Briefly describe your symptoms or reason (e.g., neck pain)"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          </div>

          {/* Type */}
          <div className="appts-field">
            <label className="appts-label">Appointment Type</label>
            <div className="appts-input appts-input--select">
              <select
                value={apptType}
                onChange={(e) => setApptType(e.target.value)}
              >
                {APPOINTMENT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              <span className="appts-chevron" aria-hidden />
            </div>
          </div>

          {/* Date / Time with busy slots */}
          <div className="appts-field">
            <label className="appts-label">Preferred Date & Time</label>

            <div className="appts-date-row">
              <div className="appts-date-col">
                <span className="appts-date-label">Date:</span>
                <div className="appts-date-box">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    aria-label="Select date"
                  />
                </div>
              </div>

              <div className="appts-time-col">
                <span className="appts-time-label">Time:</span>

                <div className="appts-time-radiogroup">
                  {DEFAULT_SLOTS.map((slot) => {
                    const disabled = busyTimes.has(slot);
                    const checked = time === slot;
                    return (
                      <label
                        key={slot}
                        className={`appts-time-option ${disabled ? "is-disabled" : ""}`}
                      >
                        <input
                          type="radio"
                          name="time"
                          value={slot}
                          disabled={disabled}
                          checked={checked}
                          onChange={() => setTime(slot)}
                        />
                        <span className="appts-time-chip">
                          {slot}{disabled ? " (busy)" : ""}
                        </span>
                      </label>
                    );
                  })}
                </div>

                {!practitioner?.id && (
                  <div className="myappts-sub" style={{ marginTop: 6 }}>
                    Search & select a practitioner to see busy times.
                  </div>
                )}
              </div>
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
        </form>
      </section>
    </main>
  );
}
