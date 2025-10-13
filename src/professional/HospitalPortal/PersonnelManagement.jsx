import React, { useState, useEffect } from "react";
import { Plus, Users, UserCheck, UserX, Search } from "lucide-react";
import "./PersonnelManagement.css";
import ViewPersonnelModal from "./ViewPersonnelModal";

function PersonnelManagement({ onAddPersonnel, personnelData }) {
  const [personnel, setPersonnel] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedPersonnelId, setSelectedPersonnelId] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  // Use personnelData prop as source of truth
  useEffect(() => {
    if (personnelData) {
      setPersonnel(personnelData);
      setLoading(false);
    }
  }, [personnelData]);

  const filteredPersonnel = personnel.filter((person) => {
    const matchesSearch =
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || person.role === filterRole;
    return matchesSearch && matchesRole;
  });

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

  // const handleDeactivate = (personId) => {
  //   setPersonnel((prev) =>
  //     prev.map((person) =>
  //       person.id === personId ? { ...person, status: "inactive" } : person
  //     )
  //   );
  // };

  const handleViewPersonnel = (personId) => {
    setSelectedPersonnelId(personId);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedPersonnelId(null);
  };

  if (loading) {
    return (
      <section className="personnel-management">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading personnel...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="personnel-management">
      {/* Header with CTA */}
      <div className="personnel-header">
        <div className="personnel-title">
          <Users className="title-icon" />
          <h2>Personnel Management</h2>
        </div>
        <button className="add-personnel-btn" onClick={onAddPersonnel}>
          <Plus className="btn-icon" />
          Add Personnel
        </button>
      </div>

      {/* Stats Cards */}
      <div className="personnel-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <Users />
          </div>
          <div className="stat-content">
            <h3>{personnel.length}</h3>
            <p>Total Personnel</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon active">
            <UserCheck />
          </div>
          <div className="stat-content">
            <h3>{personnel.filter((p) => p.status === "active").length}</h3>
            <p>Active Staff</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon pending">
            <UserX />
          </div>
          <div className="stat-content">
            <h3>{personnel.filter((p) => p.status === "pending").length}</h3>
            <p>Pending Approval</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="personnel-controls">
        <div className="search-box">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search personnel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="role-filter"
        >
          <option value="all">All Roles</option>
          <option value="doctor">Doctors</option>
          <option value="nurse">Nurses</option>
          <option value="admin">Administrators</option>
        </select>
      </div>

      {/* Personnel List */}
      <div className="personnel-list">
        {filteredPersonnel.length === 0 ? (
          <div className="empty-state">
            <Users className="empty-icon" />
            <h3>No personnel found</h3>
            <p>
              Try adjusting your search or add new personnel to get started.
            </p>
            <button className="add-personnel-btn" onClick={onAddPersonnel}>
              <Plus className="btn-icon" />
              Add Personnel
            </button>
          </div>
        ) : (
          <div className="personnel-grid">
            {filteredPersonnel.map((person) => (
              <div key={person.id} className="personnel-card">
                <div className="personnel-info">
                  <div className="personnel-avatar">
                    {person.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="personnel-details">
                    <h4>{person.name}</h4>
                    <p className="personnel-email">{person.email}</p>
                    <p className="personnel-phone">{person.phone}</p>
                    <div className="personnel-meta">
                      <span className="personnel-role">
                        {getRoleDisplayName(person.role)}
                      </span>
                      {getStatusBadge(person.status)}
                    </div>
                  </div>
                </div>
                <div className="personnel-actions">
                  <button
                    className="action-btn approve"
                    onClick={() => handleViewPersonnel(person.id)}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View Personnel Modal */}
      {showViewModal && selectedPersonnelId && (
        <ViewPersonnelModal
          onClose={handleCloseViewModal}
          personnelId={selectedPersonnelId}
        />
      )}
    </section>
  );
}

export default PersonnelManagement;
