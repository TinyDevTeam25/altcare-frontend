import React, { useState } from "react";
import { X, User, Mail, Phone, Shield, Calendar, Lock } from "lucide-react";
import "./AddPersonnelModal.css";
import adminAxiosClient from "../../utils/authAxiosClient";
import { toast } from "react-toastify";

function AddPersonnelModal({ onClose, onSuccess, hospitalId }) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    role: "doctor",
    professional_id: "",
    hospital_id: hospitalId || "",
  });

  console.log({ hospitalId });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState(false);

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

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.professional_id.trim()) {
      newErrors.professional_id = "Professional ID/License Number is required";
    }

    // if (!formData.hospital_id.trim()) {
    //   newErrors.hospital_id = "Hospital ID is required";
    // }

    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
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
      const personnelData = {
        full_name: formData.full_name,
        professional_id: formData.professional_id,
        hospital_id: hospitalId,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role,
      };

      const response = await adminAxiosClient.post(
        "/practitioner/register",
        personnelData
      );

      toast.success(response.data.message);

      onClose();
      onSuccess();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
              {errors.full_name && (
                <span className="error-text">{errors.full_name}</span>
              )}
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
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
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
              {errors.phone && (
                <span className="error-text">{errors.phone}</span>
              )}
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
              {errors.professional_id && (
                <span className="error-text">{errors.professional_id}</span>
              )}
            </div>

            {/* <div className="form-group">
              <label>Hospital ID</label>
              <input
                type="text"
                name="hospital_id"
                value={formData.hospital_id}
                onChange={handleChange}
                className={errors.hospital_id ? "error" : ""}
                placeholder="Enter hospital ID"
                readOnly={!!hospitalId}
              />
              {errors.hospital_id && (
                <span className="error-text">{errors.hospital_id}</span>
              )}
            </div> */}

            <div className="form-group">
              <label>Role</label>
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="doctor">Doctor</option>
                <option value="nurse">Nurse</option>
                <option value="admin">Administrator</option>
              </select>
              {errors.role && <span className="error-text">{errors.role}</span>}
            </div>

            <div className="form-group">
              <label>
                <Lock className="input-icon" />
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
                placeholder="Enter a secure password"
              />
              {errors.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>
          </div>

          {errors.submit && (
            <div className="error-message">{errors.submit}</div>
          )}

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Adding..." : "Add Personnel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPersonnelModal;
