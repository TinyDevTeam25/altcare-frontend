// src/pages/AdminLogin.tsx
"use client"
import { useState } from "react"
import React from "react"
import singleman from "../../assets/singleman.png"
import { Link, useNavigate } from "react-router"
import '../Register/HospitalSignin.css';

export default function HospitalSignin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Make actual API call to login
      const response = await fetch('https://altcare-backend-production.up.railway.app/api/hospital/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })

      if (!response.ok) {
        throw new Error('Invalid email or password')
      }

      const data = await response.json()
      
      // Store the token in localStorage
      if (data.token) {
        localStorage.setItem('authToken', data.token)
        localStorage.setItem('adminEmail', email)
        
        // Optional: store other user data
        if (data.hospitalId) {
          localStorage.setItem('hospitalId', data.hospitalId)
        }
      }

      // Navigate to hospital portal
      navigate("/hospital-portal")

    } catch (err) {
      setError(err.message || "Login failed. Please try again.")
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
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
            {/* Error Message */}
            {error && (
              <div className="error-message" style={{
                padding: '10px',
                marginBottom: '15px',
                backgroundColor: '#fee',
                color: '#c33',
                borderRadius: '4px',
                fontSize: '14px'
              }}>
                {error}
              </div>
            )}

            {/* Email */}
            <div className="signin-input-group">
              <label className="signin-label">Professional ID or Email</label>
              <input
                type="email"
                placeholder="admin@altcare.com or Staff ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="signin-input"
                required
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
                required
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
            <button
              type="submit"
              className="signin-submit-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In to Admin Panel"}
            </button>
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