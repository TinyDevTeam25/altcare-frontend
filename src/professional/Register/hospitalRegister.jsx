import { useState } from 'react';
import  {Link} from 'react-router';

export default function HospitalRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hospitalData, setHospitalData] = useState(null);
  const [apiError, setApiError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Professional email is required';
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
      newErrors.phone = 'Hospital number is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Hospital address is required';
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
      const response = await fetch('https://altcare-backend-production.up.railway.app/api/hospital/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          address: formData.address
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 409) {
          throw new Error(data.message || 'Hospital already registered. Email or phone number already exists.');
        }
        throw new Error(data.message || 'Registration failed');
      }
      
      // Log the response to see what we get back
      console.log('Registration Response:', data);
      
      setSuccess(true);
      setHospitalData(data);
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: ''
      });
      
    } catch (error) {
      setApiError(error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Hospital ID copied to clipboard!');
  };

  if (success && hospitalData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h1>
            <p className="text-gray-600">Your hospital has been registered successfully</p>
          </div>

          <div className="bg-teal-50 border-2 border-teal-600 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Hospital ID</h2>
            <div className="bg-white rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600 mb-2">Share this ID with practitioners to join your hospital:</p>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded border border-gray-200">
                <code className="text-teal-600 font-mono text-sm break-all">
                  {hospitalData.hospital?.id || hospitalData.id || hospitalData.hospital_id || 'ID not found'}
                </code>
                <button
                  onClick={() => copyToClipboard(hospitalData.hospital?.id || hospitalData.id || hospitalData.hospital_id)}
                  className="ml-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 text-sm whitespace-nowrap"
                >
                  Copy ID
                </button>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> Save this ID securely. Practitioners will need it to register under your hospital.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Hospital Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex">
                <span className="text-gray-600 w-32">Name:</span>
                <span className="text-gray-900 font-medium">{hospitalData.hospital?.name || hospitalData.name || 'N/A'}</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-32">Email:</span>
                <span className="text-gray-900">{hospitalData.hospital?.email || hospitalData.email || 'N/A'}</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-32">Phone:</span>
                <span className="text-gray-900">{hospitalData.hospital?.phone || hospitalData.phone || 'N/A'}</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-32">Address:</span>
                <span className="text-gray-900">{hospitalData.hospital?.address || hospitalData.address || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link to="/signin">
              <button
                className="w-full py-3 px-4 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition"
              >
                Go to Login
              </button>
            </Link>
            <button
              onClick={() => {
                setSuccess(false);
                setHospitalData(null);
              }}
              className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
            >
              Register Another Hospital
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-teal-100  flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-tea-400 mb-4">AltCare Admin</h1>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Register as a Hospital</h2>
          <p className="text-sm text-gray-600">Create your account to access the hospital portal</p>

        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-teal-800 text-sm text-center">Registration successful! You can now log in.</p>
          </div>
        )}

        {apiError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm text-center">{apiError}</p>
          </div>
        )}

        <div className="space-y-6">
          <h2 className="text-base font-medium text-gray-900 mb-4 text-center">Your Hopital Details</h2>
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg bg-gray-50 focus:bg-white focus:border-teal-600 outline-none transition ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder=""
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
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

          <div>
          <h2 className="text-base font-medium text-gray-900 mb-4 text-center">Set Your Password</h2>

            <label className="block text-sm text-gray-700 mb-2">
              Set Your Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg bg-gray-50 focus:bg-white focus:border-teal-600 outline-none transition ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Password"
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

          <div className="mt-8">
            <h2 className="text-base font-medium text-gray-900 mb-4 text-center">Hospital Information</h2>
            
            <div className="mb-6">
              <label className="block text-sm text-gray-700 mb-2">
                Hospital Number
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
                Hospital Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg bg-gray-50 focus:bg-white focus:border-teal-600 outline-none transition ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder=""
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || success}
            className={`w-full mt-8 py-3 px-4 rounded-lg text-white font-medium transition ${
              loading || success
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-teal-600 hover:bg-teal-700'
            }`}
          >
            {loading ? 'Registering...' : 'Register Account'}
          </button>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account? <Link to="/professional/hospital-signin" className="text-teal-600 hover:text-teal-700 font-medium cursor-pointer">Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}