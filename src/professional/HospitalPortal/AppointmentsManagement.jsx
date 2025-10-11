import React, { useState, useEffect } from "react";
import { Calendar, Clock, User, UserCheck, AlertCircle, CheckCircle, XCircle,MonitorCheck,MapPinHouse } from "lucide-react";
import AssignDoctorModal from "./AssignDoctorModal.jsx";
import "./AppointmentsManagement.css";

function AppointmentsManagement() {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockAppointments = [
      {
        id: "apt_001",
        patientName: "John Doe",
        patientEmail: "john.doe@email.com",
        patientPhone: "+1 (555) 123-4567",
        appointmentDate: "2024-01-15",
        appointmentTime: "10:00 AM",
        appointmentType: "General Consultation",
        status: "pending_assignment",
        assignedDoctor: null,
        doctorName: null,
        mode: "online",
        notes: "Patient requested urgent consultation for chest pain",
        createdAt: "2024-01-10T09:30:00Z",
     
      },
      {
        id: "apt_002",
        patientName: "Sarah Johnson",
        patientEmail: "sarah.j@email.com",
        patientPhone: "+1 (555) 987-6543",
        appointmentDate: "2024-01-15",
        appointmentTime: "2:00 PM",
        appointmentType: "Follow-up",
        status: "assigned",
        assignedDoctor: "doc_001",
        mode: "in-person",
        doctorName: "Dr. Emily White",
        notes: "Follow-up for diabetes management",
        createdAt: "2024-01-08T14:20:00Z"
      },
      {
        id: "apt_003",
        patientName: "Mike Wilson",
        patientEmail: "mike.w@email.com",
        patientPhone: "+1 (555) 456-7890",
        appointmentDate: "2024-01-16",
        appointmentTime: "9:00 AM",
        appointmentType: "Cardiology Consultation",
        status: "confirmed",
        assignedDoctor: "doc_002",
        mode: "in-person",
        doctorName: "Dr. Robert Chen",
        notes: "Heart condition evaluation",
        createdAt: "2024-01-09T11:15:00Z"
      },
      {
        id: "apt_004",
        patientName: "Lisa Brown",
        patientEmail: "lisa.b@email.com",
        patientPhone: "+1 (555) 321-0987",
        appointmentDate: "2024-01-14",
        appointmentTime: "3:30 PM",
        appointmentType: "Dermatology",
        status: "completed",
        assignedDoctor: "doc_003",
        mode:"online",
        doctorName: "Dr. Maria Garcia",
        notes: "Skin condition check",
        createdAt: "2024-01-07T16:45:00Z"
      },
      {
        id: "apt_005",
        patientName: "David Lee",
        patientEmail: "david.l@email.com",
        patientPhone: "+1 (555) 654-3210",
        appointmentDate: "2024-01-17",
        appointmentTime: "11:00 AM",
        appointmentType: "Orthopedic Consultation",
        status: "pending_assignment",
        assignedDoctor: null,
        mode: "online",
        doctorName: null,
        notes: "Knee pain evaluation",
        createdAt: "2024-01-11T08:30:00Z"
      }
    ];

    setTimeout(() => {
      setAppointments(mockAppointments);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending_assignment":
        return <span className="status-badge pending">Pending Assignment</span>;
      case "assigned":
        return <span className="status-badge assigned">Assigned</span>;
      case "confirmed":
        return <span className="status-badge confirmed">Confirmed</span>;
      case "completed":
        return <span className="status-badge completed">Completed</span>;
      case "cancelled":
        return <span className="status-badge cancelled">Cancelled</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending_assignment":
        return <AlertCircle className="status-icon pending" />;
      case "assigned":
        return <UserCheck className="status-icon assigned" />;
      case "confirmed":
        return <CheckCircle className="status-icon confirmed" />;
      case "completed":
        return <CheckCircle className="status-icon completed" />;
      case "cancelled":
        return <XCircle className="status-icon cancelled" />;
      default:
        return <Clock className="status-icon" />;
    }
  };

  const handleAssignDoctor = (appointment) => {
    setSelectedAppointment(appointment);
    setShowAssignModal(true);
  };

  const handleDoctorAssigned = (appointmentId, doctorId, doctorName) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: "assigned", assignedDoctor: doctorId, doctorName }
          : apt
      )
    );
    setShowAssignModal(false);
    setSelectedAppointment(null);
  };

  const handleMarkComplete = (appointmentId) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: "completed" }
          : apt
      )
    );
  };

  const handleCancelAppointment = (appointmentId) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: "cancelled" }
          : apt
      )
    );
  };

  // Filter appointments
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.appointmentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (appointment.doctorName && appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filterStatus === "all" || appointment.status === filterStatus;
    
    const matchesDate = !filterDate || appointment.appointmentDate === filterDate;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Calculate stats
  const stats = {
    total: appointments.length,
    pending: appointments.filter(apt => apt.status === "pending_assignment").length,
    assigned: appointments.filter(apt => apt.status === "assigned").length,
    confirmed: appointments.filter(apt => apt.status === "confirmed").length,
    completed: appointments.filter(apt => apt.status === "completed").length,
    today: appointments.filter(apt => apt.appointmentDate === new Date().toISOString().split('T')[0]).length
  };

  if (loading) {
    return (
      <section className="appointments-management">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading appointments...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="appointments-management">
      {/* Header */}
      <div className="appointments-header">
        <div className="appointments-title">
          <Calendar className="title-icon" />
          <h2>Appointments Management</h2>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="appointments-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <Calendar />
          </div>
          <div className="stat-content">
            <h3>{stats.total}</h3>
            <p>Total Appointments</p>
          </div>
        </div>
        <div className="stat-card pending">
          <div className="stat-icon">
            <AlertCircle />
          </div>
          <div className="stat-content">
            <h3>{stats.pending}</h3>
            <p>Pending Assignment</p>
          </div>
        </div>
        <div className="stat-card assigned">
          <div className="stat-icon">
            <UserCheck />
          </div>
          <div className="stat-content">
            <h3>{stats.assigned}</h3>
            <p>Assigned</p>
          </div>
        </div>
        <div className="stat-card confirmed">
          <div className="stat-icon">
            <CheckCircle />
          </div>
          <div className="stat-content">
            <h3>{stats.confirmed}</h3>
            <p>Confirmed</p>
          </div>
        </div>
        <div className="stat-card today">
          <div className="stat-icon">
            <Clock />
          </div>
          <div className="stat-content">
            <h3>{stats.today}</h3>
            <p>Today's Appointments</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="appointments-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by patient name, type, or doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="status-filter"
        >
          <option value="all">All Status</option>
          <option value="pending_assignment">Pending Assignment</option>
          <option value="assigned">Assigned</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="date-filter"
        />
      </div>

      {/* Appointments List */}
      <div className="appointments-list">
        {filteredAppointments.length === 0 ? (
          <div className="empty-state">
            <Calendar className="empty-icon" />
            <h3>No appointments found</h3>
            <p>Try adjusting your search criteria or check back later for new appointments.</p>
          </div>
        ) : (
          <div className="appointments-grid">
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="appointment-card">
                <div className="appointment-header">
                  <div className="appointment-status">
                    {getStatusIcon(appointment.status)}
                    {getStatusBadge(appointment.status)}
                  </div>
                  <div className="appointment-id">#{appointment.id}</div>
                </div>

                <div className="appointment-info">
                  <div className="patient-info">
                    <h4>{appointment.patientName}</h4>
                    <p className="patient-contact">{appointment.patientEmail}</p>
                    <p className="patient-contact">{appointment.patientPhone}</p>
                  </div>

                  <div className="appointment-details">
                    <div className="detail-row">
                      <Calendar className="detail-icon" />
                      <span>{new Date(appointment.appointmentDate).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-row">
                      <Clock className="detail-icon" />
                      <span>{appointment.appointmentTime}</span>
                    </div>
                    <div className="detail-row">
                      <User className="detail-icon" />
                      <span>{appointment.appointmentType}</span>
                    </div>
                    <div>
                        {appointment.mode==='online' ? 
                        <div className="detail-row"><MonitorCheck className="detail-icon" /> <span>Online</span></div>
                         :
                         <div className="detail-row"> <MapPinHouse className="detail-icon" /> <span>In-person</span></div> }
                    </div>
                    {appointment.doctorName && (
                      <div className="detail-row">
                        <UserCheck className="detail-icon" />
                        <span>{appointment.doctorName}</span>
                      </div>
                    )}
                  </div>

                  {appointment.notes && (
                    <div className="appointment-notes">
                      <p><strong>Notes:</strong> {appointment.notes}</p>
                    </div>
                  )}
                </div>

                <div className="appointment-actions">
                  {appointment.status === "pending_assignment" && (
                    <button 
                      className="action-btn assign"
                      onClick={() => handleAssignDoctor(appointment)}
                    >
                      Assign Doctor
                    </button>
                  )}
                  {appointment.status === "assigned" && (
                    <button 
                      className="action-btn reassign"
                      onClick={() => handleAssignDoctor(appointment)}
                    >
                      Reassign Doctor
                    </button>
                  )}
                  {appointment.status === "confirmed" && (
                    <button 
                      className="action-btn complete"
                      onClick={() => handleMarkComplete(appointment.id)}
                    >
                      Mark Complete
                    </button>
                  )}
                  {appointment.status !== "completed" && appointment.status !== "cancelled" && (
                    <button 
                      className="action-btn cancel"
                      onClick={() => handleCancelAppointment(appointment.id)}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Assign Doctor Modal */}
      {showAssignModal && (
        <AssignDoctorModal
          appointment={selectedAppointment}
          onClose={() => {
            setShowAssignModal(false);
            setSelectedAppointment(null);
          }}
          onAssign={handleDoctorAssigned}
        />
      )}
    </section>
  );
}

export default AppointmentsManagement;
