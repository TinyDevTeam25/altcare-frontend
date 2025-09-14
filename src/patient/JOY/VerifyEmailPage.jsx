import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthCard from "./AuthCard.jsx";
import Nav from "../../components/Nav1/Nav.jsx";
import Footer from "../Profile/Footer.jsx";
import apiClient from "../../utils/axiosConfig.js";
import Couple from "../../assets/Couple.png";

function VerifyEmailPage() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [countdown, setCountdown] = useState(60);
  const canResend = countdown === 0;

  useEffect(() => {
    // Set up a timer that runs every second
    const timerId = setInterval(() => {
      setCountdown((prevCountdown) => {
        // Stop the timer if it reaches 0
        if (prevCountdown <= 1) {
          clearInterval(timerId);
          return 0;
        }
        // Otherwise, decrement the timer
        return prevCountdown - 1;
      });
    }, 1000);

    // Clean up the timer when the component unmounts
    return () => clearInterval(timerId);
  }, []); // <-- An empty dependency array

  const handleResendOtp = async () => {
    if (!canResend) return; // Don't allow clicks while timer is running

    setCountdown(60); // Reset the timer
    setMessage("A new OTP has been sent."); // Provide user feedback

    try {
      // This is the future API call to request a new OTP
      // await apiClient.post('/patient/resend-verification-otp', { email });
    } catch (err) {
      console.error("Resend OTP Error:", err);
      setError("Failed to resend OTP. Please try again.");
    }
  };

  useEffect(() => {
    if (!email) {
      console.error(
        "No email provided for verification. Redirecting to sign up."
      );
      navigate("/signup");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("Verifying...");

    try {
      // This is the API call to verify the OTP
      const response = await apiClient.post("/patient/verify-OTP", {
        email: email,
        code: otp, // Backend expects the key "code" for the OTP
      });

      const { token } = response.data;

      if (token) {
        // Save the temporary token for the next step
        localStorage.setItem("registrationToken", token);
        // Navigate to the final registration step
        navigate("/registration");
      } else {
        setError("Verification successful, but a token was not provided.");
      }
    } catch (err) {
      setError("The OTP is invalid or may have expired. Please try again.");
      console.error("Verify OTP Error:", err);
    }
  };

  return (
    <div>
      <Nav buttonText="Back Home" pText="Need Help?" linkTo="/" />
      <form onSubmit={handleSubmit}>
        <AuthCard
          image={Couple}
          title="Verify Your Email"
          subtitle={`We've sent a verification code to ${
            email || "your email"
          }`}
          buttonText="Verify and Continue"
        >
          <div className="the-form">
            <div className="field">
              <label>Verification Code</label>
              <input
                type="text"
                placeholder="Enter the 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  textAlign: "center",
                  fontSize: "18px",
                  letterSpacing: "8px",
                }}
              />
            </div>
            <div
              style={{
                textAlign: "center",
                marginTop: "20px",
                fontSize: "14px",
              }}
            >
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#008080",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: "inherit",
                  }}
                >
                  Resend Code
                </button>
              ) : (
                <span>
                  Resend code in{" "}
                  <span style={{ fontWeight: "bold", color: "#008080" }}>
                    {countdown}s
                  </span>
                </span>
              )}
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

export default VerifyEmailPage;
