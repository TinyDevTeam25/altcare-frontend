import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

/* ===========================
   Main Account Settings page
   =========================== */
export default function AccountSettings() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Try to obtain a bearer token from several common places
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

  // Demo controlled inputs for editable rows
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
      await apiClient.delete("patient/deleteMe", {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Your account has been deleted.");
      logout?.();
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("registrationToken");
      setShowModal(false);
      navigate("/");
    } catch (err) {
      console.error("Delete account error:", err);
      const msg =
        err?.response?.data?.message ||
        (err?.response?.status === 401 || err?.response?.status === 403
          ? "Your session has expired. Please sign in again."
          : "Could not delete your account. Please try again.");
      toast.error(msg);
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        logout?.();
        navigate("/signin");
      }
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="settings-page">

      <div className="settings-page__title">Settings</div>

      <div className="settings-layout">
        {/* Left rail with REAL icons */}
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

          {/* Email (read-only visual) */}
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

          {/* Country / State / LGA blocks */}
          <div className="field-block">
            <label className="field-label">Phone Number</label>
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
