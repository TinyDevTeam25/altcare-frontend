import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthCard from "./AuthCard.jsx";
import Nav from "../../components/Nav1/Nav.jsx";
import Footer from "../Profile/Footer.jsx";
import Couple from "../../assets/Couple.png";
import { Eye, EyeOff } from "lucide-react";
import ConsentModal from "./ConsentModal.jsx"; // Import the modal

// Inner form component
function SignU() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // State to control the modal's visibility
  const [showConsentModal, setShowConsentModal] = useState(false);

  const navigate = useNavigate();

  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{}|;:'",.<>/?]).{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!regex.test(password)) {
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    // Open the consent modal instead of navigating directly
    setShowConsentModal(true);
  };

  const handleConsent = () => {
    localStorage.setItem(
      "signupData",
      JSON.stringify({ email, password, consentGiven: true })
    );
    navigate("/registration");
  };

  const handleDecline = () => {
    localStorage.setItem(
      "signupData",
      JSON.stringify({ email, password, consentGiven: false })
    );
    navigate("/registration");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <AuthCard
          linkTo="/"
          image={Couple}
          title="AltCare"
          subtitle="Create Your Account"
          buttonText="Sign up"
          footerText="Already have an account?"
          footerLinkText="Sign in here"
          footerLinkHref="/signin"
        >
          <div style={{ marginBottom: "15px" }}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px", position: "relative" }}>
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                borderRadius: "8px",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                cursor: "pointer",
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          <div style={{ marginBottom: "15px", position: "relative" }}>
            <label>Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="******"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                cursor: "pointer",
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
        </AuthCard>
      </form>

      {/* Conditionally render the ConsentModal */}
      {showConsentModal && (
        <ConsentModal
          onConsent={handleConsent}
          onDecline={handleDecline}
          onClose={handleDecline} // Closing the modal is the same as declining
        />
      )}
    </>
  );
}

// Main page component
export default function SignUp() {
  return (
    <div>
      <Nav
        buttonText="Back Home"
        pText="Need Help?"
        linkTo="/"
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
      <SignU />
      <Footer />
    </div>
  );
}
