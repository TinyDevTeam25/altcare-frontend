import { useState } from 'react';
import  {Link} from 'react-router';
import '../Register/HospitalRegister.css';
import './hospitalSignin'

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
      <div className="success-container">
        <div className="success-card">
          <div className="success-header">
            <div className="success-icon">
              <svg className="checkmark-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="success-title">Registration Successful!</h1>
            <p className="success-subtitle">Your hospital has been registered successfully</p>
          </div>

          <div className="hospital-id-box">
            <h2 className="hospital-id-heading">Your Hospital ID</h2>
            <div className="id-content-wrapper">
              <p className="id-description">Share this ID with practitioners to join your hospital:</p>
              <div className="id-display-box">
                <code className="id-code">
                  {hospitalData.hospital?.id || hospitalData.id || hospitalData.hospital_id || 'ID not found'}
                </code>
                <button
                  onClick={() => copyToClipboard(hospitalData.hospital?.id || hospitalData.id || hospitalData.hospital_id)}
                  className="copy-id-btn"
                >
                  Copy ID
                </button>
              </div>
            </div>
            <div className="id-warning-box">
              <p className="warning-text">
                <strong>Important:</strong> Save this ID securely. Practitioners will need it to register under your hospital.
              </p>
            </div>
          </div>

          <div className="hospital-details-box">
            <h3 className="details-heading">Hospital Details</h3>
            <div className="details-space">
              <div className="detail-item">
                <span className="detail-label">Name:</span>
                <span className="detail-value">{hospitalData.hospital?.name || hospitalData.name || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{hospitalData.hospital?.email || hospitalData.email || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{hospitalData.hospital?.phone || hospitalData.phone || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Address:</span>
                <span className="detail-value">{hospitalData.hospital?.address || hospitalData.address || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="button-space">
            <Link to="/professional/hospital-signin">
              <button className="login-btn">
                Go to Login
              </button>
            </Link>
            <button
              onClick={() => {
                setSuccess(false);
                setHospitalData(null);
              }}
              className="register-another-btn"
            >
              Register Another Hospital
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="register-page">
      <div className="register-form-card">
        <div className="register-header">
          <h1 className="app-title">AltCare Admin</h1>
          <h2 className="register-page-title">Register as a Hospital</h2>
          <p className="register-subtitle">Create your account to access the hospital portal</p>

        </div>

        {success && (
          <div className="success-alert">
            <p className="success-alert-text">Registration successful! You can now log in.</p>
          </div>
        )}

        {apiError && (
          <div className="error-alert">
            <p className="error-alert-text">{apiError}</p>
          </div>
        )}

        <div className="form-space">
          <h2 className="form-section-heading">Your Hopital Details</h2>
          <div className="input-group">
            <label className="input-label">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${
                errors.name ? 'input-error-border' : 'input-normal-border'
              }`}
              placeholder=""
            />
            {errors.name && (
              <p className="error-text">{errors.name}</p>
            )}
          </div>

          <div className="input-group">
            <label className="input-label">
              Professional Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${
                errors.email ? 'input-error-border' : 'input-normal-border'
              }`}
              placeholder=""
            />
            {errors.email && (
              <p className="error-text">{errors.email}</p>
            )}
          </div>

          <div className="input-group">
          <h2 className="form-section-heading">Set Your Password</h2>

            <label className="input-label">
              Set Your Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${
                errors.password ? 'input-error-border' : 'input-normal-border'
              }`}
              placeholder="Password"
            />
            {errors.password && (
              <p className="error-text">{errors.password}</p>
            )}
          </div>

          <div className="input-group">
            <label className="input-label">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`form-input ${
                errors.confirmPassword ? 'input-error-border' : 'input-normal-border'
              }`}
              placeholder=""
            />
            {errors.confirmPassword && (
              <p className="error-text">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="hospital-info-section">
            <h2 className="form-section-heading">Hospital Information</h2>
            
            <div className="input-group">
              <label className="input-label">
                Hospital Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`form-input ${
                  errors.phone ? 'input-error-border' : 'input-normal-border'
                }`}
                placeholder=""
              />
              {errors.phone && (
                <p className="error-text">{errors.phone}</p>
              )}
            </div>

            <div className="input-group">
              <label className="input-label">
                Hospital Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`form-input ${
                  errors.address ? 'input-error-border' : 'input-normal-border'
                }`}
                placeholder=""
              />
              {errors.address && (
                <p className="error-text">{errors.address}</p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || success}
            className={`register-submit-btn ${
              loading || success
                ? 'btn-disabled'
                : 'btn-enabled'
            }`}
          >
            {loading ? 'Registering...' : 'Register Account'}
          </button>

          <p className="login-prompt">
            Already have an account? <Link to="/professional/hospital-signin" className="login-link">Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}