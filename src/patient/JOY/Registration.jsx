import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav1/Nav.jsx";
import Footer from "../Profile/Footer.jsx";
import apiClient from "../../utils/axiosConfig.js";
import ConsentModal from "./ConsentModal.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import "./sign.css";
import { toast } from "react-toastify"; // <-- Import toast

// Spinner component
function Spinner() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 18,
        height: 18,
        border: "2px solid #008080",
        borderTop: "2px solid transparent",
        borderRadius: "50%",
        marginRight: 8,
        animation: "spin 0.7s linear infinite",
        verticalAlign: "middle",
      }}
    />
  );
}

// Add spinner keyframes to the page (only once)
if (!document.getElementById("spin-keyframes")) {
  const spinnerStyle = document.createElement("style");
  spinnerStyle.id = "spin-keyframes";
  spinnerStyle.innerHTML = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(spinnerStyle);
}

// Main Page Component
export default function Registration() {
  return (
    <div>
      <Nav
        linkTo="/"
        buttonText="Back Home"
        pText="Need Help?"
        buttonStyle={{
          borderRadius: "30px",
          backgroundColor: "#fff",
          color: "#008080",
          border: "1px solid #008080",
          padding: "10px 20px",
          fontWeight: "600",
          cursor: "pointer",
        }}
      />
      <Reg />
      <Footer />
    </div>
  );
}

// Inner Form Component
function Reg() {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [nin, setNin] = useState("");
  const [address, setAddress] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [emergencyRelationship, setEmergencyRelationship] = useState("");
  const [error, setError] = useState("");
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (
      !fullName ||
      !dob ||
      !gender ||
      !contact ||
      !nin ||
      !address ||
      !emergencyName ||
      !emergencyContact ||
      !emergencyRelationship
    ) {
      toast.error("⚠️ Please fill in all fields."); // <-- Toast instead of alert
      return;
    }
    const ninRegex = /^\d{11}$/;
    if (!ninRegex.test(nin)) {
      setError("NIN must be exactly 11 digits.");
      toast.error("NIN must be exactly 11 digits."); // <-- Toast
      return;
    }
    const phoneRegex = /^\d{11}$/;
    if (!phoneRegex.test(contact) || !phoneRegex.test(emergencyContact)) {
      setError("Phone numbers must be exactly 11 digits.");
      toast.error("Phone numbers must be exactly 11 digits."); // <-- Toast
      return;
    }
    setError("");
    setShowConsentModal(true);
  };

  const handleFinalSubmit = async (consentGiven) => {
    setShowConsentModal(false);
    setLoading(true);
    const registrationToken = localStorage.getItem("registrationToken");
    if (!registrationToken) {
      setError("Security token is missing. Please sign up again.");
      toast.error("Security token is missing. Please sign up again."); // <-- Toast
      setTimeout(() => navigate("/signup"), 3000);
      setLoading(false);
      return;
    }

    const payload = {
      full_name: fullName,
      d_o_b: dob,
      NIN: nin,
      gender,
      phone: contact,
      address,
      emergency_name: emergencyName,
      emergency_phone: emergencyContact,
      emergency_relationship: emergencyRelationship,
      consentGiven: consentGiven,
    };

    try {
      const res = await apiClient.post("/patient/register-profile", payload, {
        headers: { Authorization: `Bearer ${registrationToken}` },
      });
      localStorage.removeItem("registrationToken");
      login({ token: null, patient: res.data });
      toast.success(`Thank you, ${payload.full_name}! Your registration is complete.`); // <-- Toast
      navigate("/signin");
    } catch (err) {
      console.error("Registration Error:", err);
      if (err.response) {
        const { status, data } = err.response;
        const errorMessage =
          data?.message || `An error occurred (Status ${status})`;
        setError(errorMessage);
        toast.error(`❌ Registration Failed: ${errorMessage}`); // <-- Toast
      } else if (err.request) {
        setError("Network error. Please check your connection and try again.");
        toast.error("🌐 Network error. Could not connect to the server."); // <-- Toast
      } else {
        setError("An unexpected error occurred.");
        toast.error("⚠️ An unexpected error occurred."); // <-- Toast
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="all">
      <form className="formm" onSubmit={handleSubmit}>
        <article>
          <h1>Alt Care</h1>
          <h2>Complete Your Profile</h2>
          <p>Just a few more details to get started...</p>
        </article>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <section>
          <div className="inputContainer">
            <label className="la">Full Name</label>
            <input
              placeholder="John Doe"
              required
              className="in"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <label className="la">Date of Birth</label>
            <input
              type="date"
              required
              className="in"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <label className="la">Gender</label>
            <select
              className="in select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="" disabled>
                Gender
              </option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>
          <div className="inputContainer">
            <label className="la">Contact</label>
            <input
              type="text"
              placeholder="08123456789"
              required
              className="in"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <label className="la">National Identification Number</label>
            <input
              type="text"
              placeholder="11232624254"
              required
              className="in"
              value={nin}
              onChange={(e) => setNin(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <label className="la">Address</label>
            <textarea
              placeholder="Your full address"
              required
              className="tex"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </section>

        <section>
          <div>
            <h1>Emergency Contact</h1>
          </div>
          <div className="inputContainer">
            <label className="la">Full Name</label>
            <input
              placeholder="Emergency contact full name"
              required
              type="text"
              className="in"
              value={emergencyName}
              onChange={(e) => setEmergencyName(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <label className="la">Contact Number</label>
            <input
              placeholder="08102017392"
              required
              type="text"
              className="in"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <label className="la">Relationship</label>
            <input
              placeholder="e.g., Spouse, Parent, Sibling"
              required
              type="text"
              className="in"
              value={emergencyRelationship}
              onChange={(e) => setEmergencyRelationship(e.target.value)}
            />
          </div>
        </section>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            backgroundColor: "#008080",
            color: "#fff",
            border: "none",
            borderRadius: "30px",
            padding: "12px",
            fontWeight: "600",
            marginTop: "20px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            transition: "opacity 0.2s",
          }}
        >
          {loading ? (
            <>
              <Spinner />
              Saving...
            </>
          ) : (
            "Save Profile"
          )}
        </button>
      </form>

      {showConsentModal && (
        <ConsentModal
          onConsent={() => handleFinalSubmit(true)}
          onDecline={() => handleFinalSubmit(false)}
          onClose={() => setShowConsentModal(false)}
        />
      )}
    </div>
  );
}
