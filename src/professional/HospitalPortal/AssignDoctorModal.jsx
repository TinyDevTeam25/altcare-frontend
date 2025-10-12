import React, { useState, useEffect } from "react";
import { X, User, Calendar, Clock, Mail, Phone } from "lucide-react";
import "./AssignDoctorModal.css";

function AssignDoctorModal({ appointment, onClose, onAssign }) {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock doctors data - replace with actual API call
  useEffect(() => {
    const mockDoctors = [
      {
        id: "doc_001",
        name: "Dr. Emily White",
        specialty: "General Medicine",
        department: "Internal Medicine",
        availability: "available",
        currentAppointments: 3
      },
      {
        id: "doc_002",
        name: "Dr. Robert Chen",
        specialty: "Cardiology",
        department: "Cardiology",
        availability: "available",
        currentAppointments: 2
      },
      {
        id: "doc_003",
        name: "Dr. Maria Garcia",
        specialty: "Dermatology",
        department: "Dermatology",
        availability: "busy",
        currentAppointments: 5
      },
      {
        id: "doc_004",
        name: "Dr. James Wilson",
        specialty: "Orthopedics",
        department: "Orthopedics",
        availability: "available",
        currentAppointments: 1
      },
      {
        id: "doc_005",
        name: "Dr. Lisa Thompson",
        specialty: "Pediatrics",
        department: "Pediatrics",
        availability: "available",
        currentAppointments: 4
      }
    ];

    setAvailableDoctors(mockDoctors);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDoctor) {
      setError("Please select a doctor");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const doctor = availableDoctors.find(doc => doc.id === selectedDoctor);
      onAssign(appointment.id, selectedDoctor, doctor.name);
    } catch (err) {
      setError("Failed to assign doctor. Please try again.",err);
    } finally {
      setLoading(false);
    }
  };

  const getAvailabilityBadge = (availability) => {
    switch (availability) {
      case "available":
        return <span className="availability-badge available">Available</span>;
      case "busy":
        return <span className="availability-badge busy">Busy</span>;
      case "offline":
        return <span className="availability-badge offline">Offline</span>;
      default:
        return <span className="availability-badge">{availability}</span>;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content assign-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Assign Doctor</h2>
          <button className="close-btn" onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Appointment Info */}
        <div className="appointment-summary">
          <h3>Appointment Details</h3>
          <div className="appointment-info-grid">
            <div className="info-item">
              <User className="info-icon" />
              <div>
                <strong>{appointment.patientName}</strong>
                <p>{appointment.patientEmail}</p>
                <p>{appointment.patientPhone}</p>
              </div>
            </div>
            <div className="info-item">
              <Calendar className="info-icon" />
              <div>
                <strong>Date & Time</strong>
                <p>{new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                <p>{appointment.appointmentTime}</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">
                <span>📋</span>
              </div>
              <div>
                <strong>Type</strong>
                <p>{appointment.appointmentType}</p>
                {appointment.notes && (
                  <p className="notes">{appointment.notes}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Selection */}
        <form onSubmit={handleSubmit} className="assign-form">
          <div className="form-section">
            <h3>Select Doctor</h3>
            
            <div className="doctors-list">
              {availableDoctors.map((doctor) => (
                <div 
                  key={doctor.id} 
                  className={`doctor-option ${selectedDoctor === doctor.id ? 'selected' : ''} ${doctor.availability}`}
                  onClick={() => setSelectedDoctor(doctor.id)}
                >
                  <div className="doctor-info">
                    <div className="doctor-avatar">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="doctor-details">
                      <h4>{doctor.name}</h4>
                      <p className="specialty">{doctor.specialty}</p>
                      <p className="department">{doctor.department}</p>
                      <p className="appointments-count">
                        {doctor.currentAppointments} appointments today
                      </p>
                    </div>
                  </div>
                  <div className="doctor-status">
                    {getAvailabilityBadge(doctor.availability)}
                  </div>
                </div>
              ))}
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="assign-btn"
              disabled={loading || !selectedDoctor}
            >
              {loading ? "Assigning..." : "Assign Doctor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AssignDoctorModal;
