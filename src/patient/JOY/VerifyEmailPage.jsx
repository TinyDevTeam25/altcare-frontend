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
