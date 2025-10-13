import React, { useState, useEffect, useCallback } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  Shield,
  Calendar,
  MapPin,
  Clock,
} from "lucide-react";
import "./AddPersonnelModal.css";
import adminAxiosClient from "../../utils/authAxiosClient";
import { toast } from "react-toastify";

function ViewPersonnelModal({ onClose, personnelId }) {
  const [personnelData, setPersonnelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPersonnelDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await adminAxiosClient.get(
        `/practitioner/profile/${personnelId}`
      );

      console.log({ response });

      setPersonnelData(response.data.practitioner);
    } catch (error) {
      console.error("Error fetching personnel details:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to load personnel details";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [personnelId]);

  useEffect(() => {
    if (personnelId) {
      fetchPersonnelDetails();
    }
  }, [fetchPersonnelDetails, personnelId]);

  const getRoleDisplayName = (role) => {
    switch (role) {
      case "doctor":
        return "Doctor";
      case "nurse":
        return "Nurse";
      case "admin":
        return "Administrator";
      default:
        return role;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <span className="status-badge active">Active</span>;
      case "pending":
        return <span className="status-badge pending">Pending</span>;
      case "inactive":
        return <span className="status-badge inactive">Inactive</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Invalid Date";
    }
  };

  if (loading) {
    return (
      <div className="view-modal-overlay" onClick={onClose}>
        <div className="view-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Personnel Details</h2>
            <button className="close-btn" onClick={onClose}>
              <X />
            </button>
          </div>
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading personnel details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="view-modal-overlay" onClick={onClose}>
        <div className="view-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Personnel Details</h2>
            <button className="close-btn" onClick={onClose}>
              <X />
            </button>
          </div>
          <div className="error-state">
            <p className="error-message">{error}</p>
            <button className="retry-btn" onClick={fetchPersonnelDetails}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!personnelData) {
    return (
      <div className="view-modal-overlay" onClick={onClose}>
        <div className="view-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Personnel Details</h2>
            <button className="close-btn" onClick={onClose}>
              <X />
            </button>
          </div>
          <div className="error-state">
            <p>Personnel not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="view-modal-overlay" onClick={onClose}>
      <div className="view-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Personnel Details</h2>
          <button className="close-btn" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="personnel-details-content">
          {/* Personnel Avatar and Basic Info */}
          <div className="personnel-profile-section">
            <div className="personnel-avatar-large">
              {personnelData.name
                ?.split(" ")
                .map((n) => n[0])
                .join("") || "N/A"}
            </div>
            <div className="personnel-basic-info">
              <h3>{personnelData.name || "N/A"}</h3>
              <p className="personnel-role-title">
                {getRoleDisplayName(personnelData.role)}
              </p>
              {getStatusBadge(personnelData.status || "active")}
            </div>
          </div>

          {/* Personal Information */}
          <div className="form-section">
            <h3>Personal Information</h3>

            <div className="info-grid">
              <div className="info-item">
                <label>
                  <User className="input-icon" />
                  Full Name
                </label>
                <p>{personnelData.name || "N/A"}</p>
              </div>

              <div className="info-item">
                <label>
                  <Mail className="input-icon" />
                  Email Address
                </label>
                <p>{personnelData.email || "N/A"}</p>
              </div>

              <div className="info-item">
                <label>
                  <Phone className="input-icon" />
                  Phone Number
                </label>
                <p>{personnelData.phone || "N/A"}</p>
              </div>

              <div className="info-item">
                <label>
                  <MapPin className="input-icon" />
                  Address
                </label>
                <p>{personnelData.address || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="form-section">
            <h3>Professional Information</h3>

            <div className="info-grid">
              <div className="info-item">
                <label>
                  <Shield className="input-icon" />
                  Professional ID/License
                </label>
                <p>{personnelData.professional_id || "N/A"}</p>
              </div>

              <div className="info-item">
                <label>
                  <User className="input-icon" />
                  Role
                </label>
                <p>{getRoleDisplayName(personnelData.role)}</p>
              </div>

              <div className="info-item">
                <label>
                  <Calendar className="input-icon" />
                  Date Joined
                </label>
                <p>{formatDate(personnelData.created_at)}</p>
              </div>

              <div className="info-item">
                <label>
                  <Clock className="input-icon" />
                  Last Updated
                </label>
                <p>{formatDate(personnelData.updated_at)}</p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          {(personnelData.specialization ||
            personnelData.department ||
            personnelData.years_of_experience) && (
            <div className="form-section">
              <h3>Additional Information</h3>

              <div className="info-grid">
                {personnelData.specialization && (
                  <div className="info-item">
                    <label>Specialization</label>
                    <p>{personnelData.specialization}</p>
                  </div>
                )}

                {personnelData.department && (
                  <div className="info-item">
                    <label>Department</label>
                    <p>{personnelData.department}</p>
                  </div>
                )}

                {personnelData.years_of_experience && (
                  <div className="info-item">
                    <label>Years of Experience</label>
                    <p>{personnelData.years_of_experience} years</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Close
          </button>
          {/* Add edit button if needed */}
          {/* <button type="button" className="submit-btn">
            Edit Personnel
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default ViewPersonnelModal;
