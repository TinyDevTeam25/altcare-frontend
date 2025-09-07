import React, { useState } from "react";
import Nav from "../../components/Nav1/Nav.jsx";
import Footer from "../Profile/Footer.jsx";
import AuthCard from "./AuthCard.jsx";
import apiClient from "../../utils/axiosConfig";
import Singleman from "../../assets/singleman.png";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await apiClient.post("/auth/request-password-reset", { email });
      // On success, just show a message. The user needs to go check their email.
      setMessage(
        "If an account with that email exists, a password reset link has been sent."
      );
    } catch (err) {
      // For security, always show the same generic success message
      setMessage(
        "If an account with that email exists, a password reset link has been sent."
      );
      console.error("Forgot Password Error:", err);
    }
  };

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
      <form onSubmit={handleSubmit}>
        <AuthCard
          image={Singleman}
          title="Forgot Password"
          subtitle="Enter your email address to receive a reset link."
          buttonText="Send Reset Link"
          footerText="Remembered your password?"
          footerLinkText="Sign in here"
          footerLinkHref="/signin"
        >
          <div className="the-form">
            <div className="field">
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
            {error && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
                {error}
              </p>
            )}
            {message && (
              <p
                style={{ color: "green", fontSize: "14px", marginTop: "10px" }}
              >
                {message}
              </p>
            )}
          </div>
        </AuthCard>
      </form>
      <Footer />
    </div>
  );
}

export default ForgotPasswordPage;
