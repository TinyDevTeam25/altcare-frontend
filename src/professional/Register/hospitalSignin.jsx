// src/pages/AdminLogin.tsx
"use client"
import { useState } from "react"
import React from "react"
import singleman from "../../assets/singleman.png"
import { Link } from "react-router"

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
    <div className="min-h-screen flex items-center justify-center bg-[#EAF9FA] px-4">
      {/* Main Container */}
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-x-8 overflow-hidden rounded-lg shadow-lg">
        
        {/* Left - Image */}
        <div className="flex items-center justify-center">
          <img
            src={singleman}
            alt="Medical professionals"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right - Form (white background only here) */}
        <div className="bg-white p-8 sm:p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-teal-700 text-center">AltCare Admin</h2>
          <p className="font-bold text-2xl text-center">Professional Access</p>
          <p className="text-center text-lg mb-8">
            Log in to manage patient records and system settings.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block font-bold text-sm mb-1">Professional ID or Email</label>
              <input
                type="email"
                placeholder="admin@altcare.com or Staff ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-[#D5D5D5] focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-bold text-sm mb-1">Password</label>
              <input
                type="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-[#D5D5D5] focus:ring-2 focus:ring-teal-500 outline-none"
              />
              <div className="text-right mt-1">
                <a href="#" className="text-sm text-teal-600 hover:underline">
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="mr-2"
              />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>

            {/* Submit */}
            <Link to="/hospital-portal">
              <button
                type="submit"
                className="w-full bg-teal-700 text-white py-2 rounded-full font-semibold hover:bg-teal-800 transition"
              >
                Log In to Admin Panel
              </button>
            </Link>
          </form>

          <p className="text-sm text-gray-600 mt-5 text-center">
            Don’t have an admin account?{" "}
            <Link to="/professional/hospital-register" className="text-teal-600 font-medium hover:underline">
              Sign up here
            </Link>
          </p>

          <p className="text-sm mt-6 text-center">
            This portal is for authorized medical professionals only.
          </p>
        </div>
      </div>
    </div>
  )
}
