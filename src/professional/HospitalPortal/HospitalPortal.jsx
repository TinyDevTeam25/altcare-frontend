import React, { useEffect, useState } from "react";

import { Navigate, Routes, Route } from "react-router-dom";
import HospitalHeader from "./HospitalHeader.jsx";
import PersonnelManagement from "./PersonnelManagement.jsx";
import AddPersonnelModal from "./AddPersonnelModal.jsx";
import AppointmentsManagement from "./AppointmentsManagement.jsx";
import "./HospitalPortal.css";
import { toast } from "react-toastify";
import adminAxiosClient from "../../utils/authAxiosClient.js";

function HospitalPortal() {
  const [loading, setLoading] = useState(false);
  const [hospitalData, sethospitalData] = useState();
  const [showAddPersonnelModal, setShowAddPersonnelModal] = useState(false);
  const [refresh, setRefresh] = useState(0);

  async function loadHospitalData() {
    try {
      setLoading(true);
      const response = await adminAxiosClient.get("/hospital/profile");

      sethospitalData(response.data.hospital);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  const handlePersonnelAdded = () => {
    setRefresh((prev) => prev + 1);
  };

  useEffect(() => {
    loadHospitalData();
  }, []);

  useEffect(() => {
    console.log({ hospitalData });
  }, [hospitalData]);

  useEffect(() => {
    loadHospitalData();
  }, [refresh]);

  if (loading) {
    return <div>Loading hospital portal...</div>;
  }

  return (
    <div className="hospital-portal-body">
      <HospitalHeader />

      <main className="hospital-dashboard">
        <Routes>
          {/* Dashboard Route */}
          <Route
            path="/"
            element={
              <>
                {/* Welcome Section */}
                <section className="welcome-section">
                  <div className="welcome-card">
                    <h1>Welcome to Hospital Portal!</h1>
                    <p>
                      Manage your hospital operations and personnel from your
                      admin dashboard.
                    </p>
                  </div>
                </section>

                {/* Personnel Management Section */}
                <PersonnelManagement
                  onAddPersonnel={() => setShowAddPersonnelModal(true)}
                  personnelData={hospitalData?.practitioners}
                />
              </>
            }
          />

          {/* Personnel Route */}
          <Route
            path="/personnel"
            element={
              <PersonnelManagement
                onAddPersonnel={() => setShowAddPersonnelModal(true)}
                personnelData={hospitalData?.practitioners}
              />
            }
          />

          {/* Appointments Route */}
          <Route path="/appointments" element={<AppointmentsManagement />} />

          {/* Reports Route */}
          <Route
            path="/reports"
            element={
              <section className="welcome-section">
                <div className="welcome-card">
                  <h1>Reports</h1>
                  <p>Hospital reports and analytics will be available here.</p>
                </div>
              </section>
            }
          />

          {/* Settings Route */}
          <Route
            path="/settings"
            element={
              <section className="welcome-section">
                <div className="welcome-card">
                  <h1>Settings</h1>
                  <p>
                    Hospital settings and configuration will be available here.
                  </p>
                </div>
              </section>
            }
          />
        </Routes>

        {/* Add Personnel Modal */}
        {showAddPersonnelModal && (
          <AddPersonnelModal
            onClose={() => setShowAddPersonnelModal(false)}
            hospitalId={hospitalData?.id}
            onSuccess={handlePersonnelAdded}
          />
        )}
      </main>
    </div>
  );
}

export default HospitalPortal;
