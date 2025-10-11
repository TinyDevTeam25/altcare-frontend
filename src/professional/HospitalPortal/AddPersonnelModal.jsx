import React, { useState } from "react";
import { X, User, Mail, Phone, Shield, Calendar } from "lucide-react";
import "./AddPersonnelModal.css";

function AddPersonnelModal({ onClose, hospitalId }) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    role: "doctor",
    professional_id: "",
    department: "",
    start_date: ""
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    
    if (!formData.professional_id.trim()) {
      newErrors.professional_id = "Professional ID/License Number is required";
    }
    
    if (!formData.department.trim()) {
      newErrors.department = "Department is required";
    }
    
    if (!formData.start_date) {
      newErrors.start_date = "Start date is required";
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
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Mock API call - replace with actual endpoint
      const response = await fetch('https://altcare-backend-production.up.railway.app/api/practitioner/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          hospital_id: hospitalId,
          created_by_admin: true
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to create personnel');
      }
      
      setSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error('Error creating personnel:', error);
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="modal-overlay">
        <div className="modal-content success-modal">
          <div className="success-icon">
            <User />
          </div>
          <h2>Personnel Added Successfully!</h2>
          <p>The new staff member has been added to your hospital.</p>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Personnel</h2>
          <button className="close-btn" onClick={onClose}>
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="personnel-form">
          <div className="form-section">
            <h3>Personal Information</h3>
            
            <div className="form-group">
              <label>
                <User className="input-icon" />
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className={errors.full_name ? "error" : ""}
                placeholder="Enter full name"
              />
              {errors.full_name && <span className="error-text">{errors.full_name}</span>}
            </div>

            <div className="form-group">
              <label>
                <Mail className="input-icon" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
                placeholder="Enter email address"
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>
                <Phone className="input-icon" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? "error" : ""}
                placeholder="Enter phone number"
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-section">
            <h3>Professional Information</h3>
            
            <div className="form-group">
              <label>
                <Shield className="input-icon" />
                Professional ID/License Number
              </label>
              <input
                type="text"
                name="professional_id"
                value={formData.professional_id}
                onChange={handleChange}
                className={errors.professional_id ? "error" : ""}
                placeholder="Enter professional ID or license number"
              />
              {errors.professional_id && <span className="error-text">{errors.professional_id}</span>}
            </div>

            <div className="form-group">
              <label>Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="doctor">Doctor</option>
                <option value="nurse">Nurse</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={errors.department ? "error" : ""}
                placeholder="Enter department"
              />
              {errors.department && <span className="error-text">{errors.department}</span>}
            </div>

            <div className="form-group">
              <label>
                <Calendar className="input-icon" />
                Start Date
              </label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className={errors.start_date ? "error" : ""}
              />
              {errors.start_date && <span className="error-text">{errors.start_date}</span>}
            </div>
          </div>

          {errors.submit && (
            <div className="error-message">
              {errors.submit}
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Personnel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPersonnelModal;
