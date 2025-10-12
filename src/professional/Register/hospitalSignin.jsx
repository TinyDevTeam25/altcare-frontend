// src/pages/AdminLogin.tsx
"use client"
import { useState } from "react"
import React from "react"
import singleman from "../../assets/singleman.png"
import { Link } from "react-router"
import '../Register/HospitalSignin.css';

export default function HospitalSignin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Email:", email)
    console.log("Password:", password)
    console.log("Remember me:", remember)
  }

  return (
    <div className="signin-page">
      {/* Main Container */}
      <div className="signin-container">
        
        {/* Left - Image */}
        <div className="signin-image-section">
          <img
            src={singleman}
            alt="Medical professionals"
            className="signin-image"
          />
        </div>

        {/* Right - Form (white background only here) */}
        <div className="signin-form-section">
          <h2 className="signin-app-title">AltCare Admin</h2>
          <p className="signin-page-title">Professional Access</p>
          <p className="signin-description">
            Log in to manage patient records and system settings.
          </p>

          <form onSubmit={handleSubmit} className="signin-form">
            {/* Email */}
            <div className="signin-input-group">
              <label className="signin-label">Professional ID or Email</label>
              <input
                type="email"
                placeholder="admin@altcare.com or Staff ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="signin-input"
              />
            </div>

            {/* Password */}
            <div className="signin-input-group">
              <label className="signin-label">Password</label>
              <input
                type="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="signin-input"
              />
              <div className="signin-forgot-password">
                <a href="#" className="signin-forgot-link">
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Remember Me */}
            <div className="signin-checkbox-group">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="signin-checkbox"
              />
              <label htmlFor="remember" className="signin-checkbox-label">
                Remember me
              </label>
            </div>

            {/* Submit */}
            <Link to="/hospital-portal">
              <button
                type="submit"
                className="signin-submit-btn"
              >
                Log In to Admin Panel
              </button>
            </Link>
          </form>

          <p className="signin-signup-prompt">
            Don't have an admin account?{" "}
            <Link to="/professional/hospital-register" className="signin-signup-link">
              Sign up here
            </Link>
          </p>

          <p className="signin-footer-text">
            This portal is for authorized medical professionals only.
          </p>
        </div>
      </div>
    </div>
  )
}