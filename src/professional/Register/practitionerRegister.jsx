/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Link } from 'react-router';

export default function PractitionerRegister() {
  const [formData, setFormData] = useState({
    full_name: '',
    professional_id: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    hospital_id: '',
    role: 'doctor'
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [apiError, setApiError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    }
    
    if (!formData.professional_id.trim()) {
      newErrors.professional_id = 'Professional ID/License Number is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.hospital_id.trim()) {
      newErrors.hospital_id = 'Hospital ID is required';
    }
    
    if (!formData.role) {
      newErrors.role = 'Role is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async () => {
    setApiError('');
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('https://altcare-backend-production.up.railway.app/api/practitioner/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          professional_id: formData.professional_id,
          hospital_id: formData.hospital_id,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          role: formData.role
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        console.error('Registration Error:', {
          status: response.status,
          statusText: response.statusText,
          data: data
        });
        
        if (response.status === 409) {
          throw new Error(data.message || 'Practitioner already registered. Email or professional ID already exists.');
        }
        throw new Error(data.message || `Registration failed: ${response.statusText}`);
      }
      
      console.log('Registration Response:', data);
      
      setShowOtpScreen(true);
      
    } catch (error) {
      setApiError(error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setOtpError('');
    
    if (!otp.trim()) {
      setOtpError('Please enter the OTP code');
      return;
    }
    
    if (otp.length !== 6) {
      setOtpError('OTP must be 6 digits');
      return;
    }
    
    setVerifying(true);
    
    try {
      const response = await fetch('https://altcare-backend-production.up.railway.app/api/practitioner/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          code: parseInt(otp)
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'OTP verification failed');
      }
      
      console.log('OTP Verification Response:', data);
      
      setSuccess(true);
      
    } catch (error) {
      setOtpError(error.message || 'Invalid OTP. Please try again.');
    } finally {
      setVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    setOtpError('');
    try {
      await handleSubmit();
    } catch (error) {
      setOtpError('Failed to resend OTP. Please try again.');
    }
  };

  if (showOtpScreen && !success) {
    return (
      <div className="min-h-screen bg-teal-600 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
            <p className="text-sm text-gray-600">We've sent a 6-digit code to</p>
            <p className="text-sm font-medium text-gray-900 mt-1">{formData.email}</p>
          </div>

          {otpError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm text-center">{otpError}</p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                Enter Verification Code
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 6) {
                    setOtp(value);
                    setOtpError('');
                  }
                }}
                className="w-full px-4 py-3 border-2 rounded-lg text-center text-2xl tracking-widest font-mono focus:border-teal-600 outline-none transition"
                placeholder="000000"
                maxLength="6"
              />
            </div>

            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={verifying || otp.length !== 6}
              className={`w-full py-3 px-4 rounded-full text-white font-medium transition ${
                verifying || otp.length !== 6
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-teal-600 hover:bg-teal-700'
              }`}
            >
              {verifying ? 'Verifying...' : 'Verify Email'}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Didn't receive the code?{' '}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  Resend
                </button>
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowOtpScreen(false);
                setOtp('');
                setOtpError('');
              }}
              className="w-full py-2 text-gray-600 hover:text-gray-800 text-sm"
            >
              Back to Registration
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-teal-600 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h1>
            <p className="text-gray-600">Your practitioner account has been verified successfully</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => window.location.href = '/signin'}
              className="w-full py-3 px-4 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-teal-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-teal-600 mb-4">AltCare Admin</h1>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Register as a Professional</h2>
          <p className="text-sm text-gray-600">Create your account to access the professional portal</p>
        </div>

        {apiError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm text-center">{apiError}</p>
          </div>
        )}

        <div className="space-y-5">
          <h3 className="text-base font-semibold text-gray-900">Your Professional Details</h3>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg bg-gray-50 focus:bg-white focus:border-teal-600 outline-none transition ${
                errors.full_name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder=""
            />
            {errors.full_name && (
              <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Professional ID/License Number
            </label>
            <input
              type="text"
              name="professional_id"
              value={formData.professional_id}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg bg-gray-50 focus:bg-white focus:border-teal-600 outline-none transition ${
                errors.professional_id ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder=""
            />
            {errors.professional_id && (
              <p className="text-red-500 text-xs mt-1">{errors.professional_id}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Professional Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg bg-gray-50 focus:bg-white focus:border-teal-600 outline-none transition ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder=""
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <h3 className="text-base font-semibold text-gray-900 mt-6">Set Your Password</h3>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg bg-gray-50 focus:bg-white focus:border-teal-600 outline-none transition ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder=""
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg bg-gray-50 focus:bg-white focus:border-teal-600 outline-none transition ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder=""
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <h3 className="text-base font-semibold text-gray-900 mt-6">Hospital Information</h3>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Hospital ID
            </label>
            <input
              type="text"
              name="hospital_id"
              value={formData.hospital_id}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg bg-gray-50 focus:bg-white focus:border-teal-600 outline-none transition ${
                errors.hospital_id ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter the Hospital ID provided by your hospital"
            />
            {errors.hospital_id && (
              <p className="text-red-500 text-xs mt-1">{errors.hospital_id}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Hospital Address
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border rounded-lg bg-gray-50 border-gray-300 outline-none"
              placeholder=""
            />
          </div>

          <h3 className="text-base font-semibold text-gray-900 mt-6">Professional Identity Verification</h3>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg bg-gray-50 focus:bg-white focus:border-teal-600 outline-none transition ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder=""
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg bg-gray-50 focus:bg-white focus:border-teal-600 outline-none transition ${
                errors.role ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="doctor">Doctor</option>
              <option value="nurse">Nurse</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role}</p>
            )}
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
            <div className="text-teal-600 mb-2">
              <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-sm text-gray-600 mb-1">Click to drag and drop</p>
            <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10mb</p>
          </div>

          <p className="text-xs text-gray-600 text-center">
            Your document will be reviewed for verification. Account activation may require manual approval.
          </p>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full mt-6 py-3 px-4 rounded-full text-white font-medium transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-teal-600 hover:bg-teal-700'
            }`}
          >
            {loading ? 'Registering...' : 'Register Account'}
          </button>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account? <Link to="/signin" className="text-teal-600 hover:text-teal-700 font-medium">Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}