import React, { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import apiClient from "../../utils/axiosConfig.js";
import { toast } from "react-toastify";

/* ===========================
   Small inline confirm modal
   =========================== */
function DeleteAccountModal({ open, onClose, onConfirm, loading }) {
  const [text, setText] = useState("");

  if (!open) return null;
  const canDelete = text.trim().toUpperCase() === "DELETE";

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(11,19,32,0.55)",
        display: "grid",
        placeItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        style={{
          width: "min(560px, 94vw)",
          background: "#fff",
          border: "1px solid #eef2f7",
          borderRadius: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,.08)",
          padding: 20,
          fontFamily: "var(--primary-font, Poppins, sans-serif)",
        }}
      >
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
          Delete account
        </h3>
        <p style={{ color: "#6b7280", marginTop: 6 }}>
          This will permanently remove your profile and data from AltCare. This
          action cannot be undone.
        </p>

        <div
          style={{
            marginTop: 12,
            padding: 12,
            border: "1px solid #fee2e2",
            background: "#fef2f2",
            color: "#991b1b",
            borderRadius: 10,
          }}
        >
          Type <strong>DELETE</strong> to confirm.
        </div>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="DELETE"
          style={{
            marginTop: 12,
            width: "100%",
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #e5e7eb",
            outline: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "flex-end",
            marginTop: 16,
          }}
        >
          <button
            onClick={onClose}
            style={{
              border: "1px solid #e5e7eb",
              background: "#fff",
              color: "#374151",
              padding: "10px 14px",
              borderRadius: 10,
              cursor: "pointer",
            }}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm()}
            disabled={!canDelete || loading}
            style={{
              border: "none",
              background: canDelete ? "#b91c1c" : "#ef4444",
              color: "#fff",
              padding: "10px 14px",
              borderRadius: 10,
              cursor: canDelete && !loading ? "pointer" : "not-allowed",
              opacity: loading ? 0.8 : 1,
            }}
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
  const { user, logout } = useAuth(); // we’ll try to read token from context first
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Try to obtain a bearer token from several common places
  const token = useMemo(() => {
    return (
      user?.token ||
      user?.accessToken ||
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken")
    );
  }, [user]);

  const handleDelete = async () => {
    if (!token) {
      toast.error("Missing auth token. Please sign in again.");
      navigate("/signin");
      return;
    }
    setDeleting(true);
    try {
      // IMPORTANT: call your backend endpoint
      await apiClient.delete("patient/deleteMe", {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Your account has been deleted.");
      // Clear any local auth, then take the user home
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

  // Simple 2-column layout scaffold; header/footer come from your layout
  return (
    <div
      style={{
        background: "#F5FFFF", // per your note
        minHeight: "100vh",
        fontFamily: "var(--primary-font, Poppins, sans-serif)",
      }}
    >
      <main
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "24px 16px 60px",
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: 24,
        }}
      >
        {/* Left rail – simple settings nav (optional links) */}
        <aside
          style={{
            background: "#fff",
            border: "1px solid #eef2f7",
            borderRadius: 12,
            padding: 16,
            height: "fit-content",
          }}
        >
          <h2 style={{ margin: "0 0 10px", fontSize: 18 }}>Settings</h2>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gap: 8,
            }}
          >
            <li>
              <Link to="#" style={{ color: "#111827", textDecoration: "none" }}>
                Account Details
              </Link>
            </li>
            <li>
              <Link to="#" style={{ color: "#111827", textDecoration: "none" }}>
                Payment Methods
              </Link>
            </li>
            <li>
              <Link to="#" style={{ color: "#111827", textDecoration: "none" }}>
                Communication Preferences
              </Link>
            </li>
            <li>
              <Link to="#" style={{ color: "#111827", textDecoration: "none" }}>
                Privacy
              </Link>
            </li>
            <li>
              <Link to="#" style={{ color: "#111827", textDecoration: "none" }}>
                Linked Accounts
              </Link>
            </li>
          </ul>
        </aside>

        {/* Right content */}
        <section style={{ display: "grid", gap: 16 }}>
          {/* Account details card (read-only demo; you can wire edits later) */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #eef2f7",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <h3 style={{ margin: 0, fontSize: 18 }}>Account Details</h3>
            <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
              <div>
                <label style={{ color: "#6b7280", fontSize: 13 }}>Email</label>
                <div style={{ fontWeight: 600 }}>
                  {user?.profile?.profile?.email || user?.profile?.email || "—"}
                </div>
              </div>
              <div>
                <label style={{ color: "#6b7280", fontSize: 13 }}>
                  Full Name
                </label>
                <div style={{ fontWeight: 600 }}>
                  {user?.profile?.profile?.full_name ||
                    user?.patient?.full_name ||
                    "—"}
                </div>
              </div>
            </div>
          </div>

          {/* Danger zone */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #fee2e2",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <h3 style={{ margin: 0, fontSize: 18, color: "#991b1b" }}>
              Delete Account
            </h3>
            <p style={{ color: "#6b7280", marginTop: 6 }}>
              Permanently remove your account and data from AltCare. This action
              cannot be undone.
            </p>

            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <button
                onClick={() => setShowModal(true)}
                style={{
                  border: "1px solid #ef4444",
                  background: "#fff",
                  color: "#ef4444",
                  padding: "10px 14px",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Delete my account
              </button>
            </div>
          </div>
        </section>
      </main>

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
