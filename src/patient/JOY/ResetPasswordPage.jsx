import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "../../components/Nav1/Nav.jsx";
import Footer from "../Profile/Footer.jsx";
import AuthCard from "./AuthCard.jsx";
import apiClient from "../../utils/axiosConfig";
import { Eye, EyeOff } from "lucide-react";
import Singleman from "../../assets/singleman.png";

function ResetPasswordPage() {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // This state will now hold the token we get from the verify step
  const [resetToken, setResetToken] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleVerifyOtp = async () => {
    setError("");
    setMessage("");
    try {
      // Call the 'verify-otp' endpoint
      const response = await apiClient.post("/auth/verify-otp", { email, otp });

      // On success, save the token from the response and show the password fields
      if (response.data && response.data.resetToken) {
        setResetToken(response.data.resetToken);
        setMessage("OTP Verified. Please create a new password.");
      } else {
        setError(
          "Verification failed. The response did not include a reset token."
        );
      }
    } catch (err) {
      setError("The OTP is invalid or has expired.");
      console.error("Verify OTP Error:", err);
    }
  };

  const handleResetPassword = async () => {
    setError("");
    setMessage("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      // Call the final endpoint with the token we saved in state
      await apiClient.post("/auth/reset-password", {
        email,
        newPassword: password,
        resetToken: resetToken,
      });
      setMessage(
        "Password has been reset successfully! Redirecting to sign in..."
      );
      setTimeout(() => navigate("/signin"), 3000);
    } catch (err) {
      setError("Failed to reset password. Please try again.");
      console.error("Reset Password Error:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // If we don't have a token yet, we are in the OTP verification step
    if (!resetToken) {
      handleVerifyOtp();
    } else {
      handleResetPassword();
    }
  };

  return (
    <div>
      <Nav linkTo="/" buttonText="Back Home" />
      <form onSubmit={handleSubmit}>
        <AuthCard
          image={Singleman}
          title={!resetToken ? "Verify Your Identity" : "Create New Password"}
          subtitle={
            !resetToken
              ? `An OTP has been sent to ${email}`
              : "Your new password must be strong."
          }
          buttonText={!resetToken ? "Verify OTP" : "Reset Password"}
        >
          <div className="the-form">
            {/* Show OTP field if we don't have a token yet */}
            {!resetToken && (
              <div className="field">
                <label>OTP Code</label>
                <input
                  type="text"
                  placeholder="Enter the 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
            )}

            {/* Show Password fields AFTER we get a token */}
            {resetToken && (
              <>
                <div style={{ marginBottom: "15px", position: "relative" }}>
                  <label>New Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                <div style={{ marginBottom: "15px", position: "relative" }}>
                  <label>Confirm New Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm new password"
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
                </div>
              </>
            )}

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

export default ResetPasswordPage;
