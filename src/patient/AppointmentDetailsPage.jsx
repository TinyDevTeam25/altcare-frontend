import React from "react";
import ProfessionalHeader from "../components/ProfessionalHeader";
import Footer from "../components/Footer";
import "./AppointmentDetailsPage.css"; // Import the new stylesheet

function AppointmentDetailsPage() {
  return (
    <div className="professional-body">
      <ProfessionalHeader />
      <main className="main-content-area-pro">
        {/* The 3 sections of the page content will go here */}
      </main>
      <Footer />
    </div>
  );
}

export default AppointmentDetailsPage;
