import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import apiClient from "../../utils/axiosConfig.js";
import { toast } from "react-toastify";
import "./AccountSettings.css";
import iconUser from "../../assets/user.svg";
import iconCard from "../../assets/card.png";
import iconMessages from "../../assets/messages.png";
import iconEyeSlash from "../../assets/eye-slash.svg";
import iconLink from "../../assets/link.png";

/* ===========================
   Small inline confirm modal
   =========================== */
function DeleteAccountModal({ open, onClose, onConfirm, loading }) {
  const [text, setText] = useState("");
  if (!open) return null;
  const canDelete = text.trim().toUpperCase() === "DELETE";

  return (
    <div className="set-modal__backdrop" onClick={onClose}>
      <div
        className="set-modal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="set-modal__title">Delete account</h3>
        <p className="set-modal__desc">
          This will permanently remove your profile and data from AltCare. This
          action cannot be undone.
        </p>

        <div className="set-modal__warn">
          Type <strong>DELETE</strong> to confirm.
        </div>

        <input
          className="set-modal__input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="DELETE"
        />

        <div className="set-modal__actions">
          <button
            className="set-btn set-btn--ghost"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className={`set-btn set-btn--danger ${!canDelete ? "is-disabled" : ""}`}
            onClick={onConfirm}
            disabled={!canDelete || loading}
          >
            {loading ? "Deleting…" : "Delete account"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===========================================
   Helper: robust delete with graceful fallbacks
   =========================================== */
async function deletePatientProfile({ token, patientId }) {
  const headers = { Authorization: `Bearer ${token}` };

  // Try #1: DELETE /patient/profile with a confirm body (axios supports body via "data")
  try {
    const r1 = await apiClient.delete("/patient/profile", {
      headers,
      data: { confirm: "DELETE" },
      validateStatus: () => true,
    });
    if (r1.status === 200 || r1.status === 204) return { ok: true };
    if (r1.data?.message) return { ok: false, status: r1.status, message: r1.data.message };
  } catch {
    /* fall through */
  }

  // Try #2: DELETE /patient/profile without body
  try {
    const r2 = await apiClient.delete("/patient/profile", {
      headers,
      validateStatus: () => true,
    });
    if (r2.status === 200 || r2.status === 204) return { ok: true };
    if (r2.data?.message) return { ok: false, status: r2.status, message: r2.data.message };
  } catch{
    /* fall through */
  }

  // Try #3: DELETE /patient/profile/:id if backend is id-based
  if (patientId) {
    try {
      const r3 = await apiClient.delete(`/patient/profile/${patientId}`, {
        headers,
        validateStatus: () => true,
      });
      if (r3.status === 200 || r3.status === 204) return { ok: true };
      if (r3.data?.message) return { ok: false, status: r3.status, message: r3.data.message };
    } catch {
      /* fall through */
    }
  }

  return { ok: false, message: "Could not delete profile. Endpoint/constraints mismatch." };
}

/* ===========================
   Main Account Settings page
   =========================== */
export default function AccountSettings() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Token from common locations
  const token = useMemo(
    () =>
      user?.token ||
      user?.accessToken ||
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken"),
    [user]
  );

  const email =
    user?.profile?.profile?.email || user?.profile?.email || "janedoe@example.com";

  // For the id-based fallback
  const patientId = user?.profile?.profile?.id || user?.profile?.id || undefined;

  // Demo controlled inputs
  const [phone, setPhone] = useState("123 456 7890");
  const [country, setCountry] = useState("Country");
  const [stateProv, setStateProv] = useState("State or Province");
  const [lga, setLga] = useState("LGA");

  const handleDelete = async () => {
    if (!token) {
      toast.error("Missing auth token. Please sign in again.");
      navigate("/signin");
      return;
    }
    setDeleting(true);
    try {
      const result = await deletePatientProfile({ token, patientId });
      if (result.ok) {
        toast.success("Your account has been deleted.");
        logout?.();
        localStorage.removeItem("token");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("registrationToken");
        setShowModal(false);
        navigate("/");
        return;
      }

      // show backend message if provided
      const msg =
        result.message ||
        "Cannot delete profile right now. You may need to cancel active appointments first.";
      toast.error(msg);

      if (result.status === 401 || result.status === 403) {
        logout?.();
        navigate("/signin");
      }
    } catch (err) {
      console.error("Delete account error:", err);
      toast.error("Unexpected error. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-page__title">Settings</div>

      <div className="settings-layout">
        {/* Left rail with icons */}
        <aside className="settings-rail">
          <div className="rail-group">
            <div className="rail-item">
              <img className="rail-icon-img" src={iconUser} alt="Account details" />
              <span className="rail-text rail-text--bold">Account Details</span>
            </div>

            <div className="rail-item">
              <img className="rail-icon-img" src={iconCard} alt="Payment methods" />
              <span className="rail-text">Payment Methods</span>
            </div>

            <div className="rail-item">
              <img
                className="rail-icon-img"
                src={iconMessages}
                alt="Communication preferences"
              />
              <span className="rail-text">Communication Preferences</span>
            </div>

            <div className="rail-item">
              <img className="rail-icon-img" src={iconEyeSlash} alt="Privacy" />
              <span className="rail-text">Privacy</span>
            </div>

            <div className="rail-item">
              <img className="rail-icon-img" src={iconLink} alt="Linked accounts" />
              <span className="rail-text">Linked Accounts</span>
            </div>
          </div>
        </aside>

        {/* Right content */}
        <section className="settings-main">
          <div className="section-caption">Account Details</div>

          {/* Email (read-only) */}
          <div className="field-block">
            <label className="field-label">Email</label>
            <div className="field-row">
              <div className="field-value">{email}</div>
            </div>
          </div>

          {/* Password (masked with Edit pill) */}
          <div className="field-block">
            <label className="field-label">Password</label>
            <div className="field-row field-row--split">
              <div className="field-text">********</div>
              <button
                className="field-action"
                type="button"
                onClick={() => toast.info("Password edit coming soon")}
              >
                Edit
              </button>
            </div>
          </div>

          {/* Phone (editable demo) */}
          <div className="field-block">
            <label className="field-label">Phone Number</label>
            <div className="field-row field-row--split">
              <input
                className="field-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <button
                className="field-action"
                type="button"
                onClick={() => toast.success("Phone saved (demo)")}
              >
                Edit
              </button>
            </div>
          </div>

          {/* Location (Country / State / LGA) */}
          <div className="field-block">
            <label className="field-label">Location</label>
            <div className="field-row">
              <input
                className="field-input"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="field-row">
              <input
                className="field-input"
                value={stateProv}
                onChange={(e) => setStateProv(e.target.value)}
              />
            </div>
            <div className="field-row">
              <input
                className="field-input"
                value={lga}
                onChange={(e) => setLga(e.target.value)}
              />
            </div>
          </div>

          {/* Save button (right aligned) */}
          <div className="save-wrap">
            <button
              className="save-btn"
              type="button"
              onClick={() => toast.success("Saved (demo)")}
            >
              Save
            </button>
          </div>

          {/* Delete row */}
          <div className="delete-row">
            <div className="delete-label">Delete Account</div>
            <button
              type="button"
              className="delete-btn"
              onClick={() => setShowModal(true)}
            >
              Delete
            </button>
          </div>
        </section>
      </div>

      {/* Confirmation modal */}
      <DeleteAccountModal
        open={showModal}
        onClose={() => (deleting ? null : setShowModal(false))}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}
