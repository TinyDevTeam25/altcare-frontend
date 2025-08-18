import React, { useState } from "react";
import { Outlet } from "react-router-dom";

// Import a single, header and footer for all patient pages
import Nav2 from "../components/PeterComponents/Nav2/Nav2.jsx";
import Footer2 from "../components/PeterComponents/Footer2/Footer2.jsx";
import ProfileCard from "../components/PeterComponents/Profile Card/ProfileCard.jsx";
import WalletCard from "../components/PeterComponents/wallet Card/walletCard.jsx";

function PatientLayout() {
  // This state and logic now lives in ONE place
  const [showWalletCard, setshowWalletCard] = useState(false);
  const [showProfileCard, setshowProfileCard] = useState(false);

  return (
    // This div provides the consistent background and layout for all patient pages
    <div className="patient-page-body">
      <Nav2
        setshowProfileCard={setshowProfileCard}
        setshowWalletCard={setshowWalletCard}
      />

      {/* The popover cards are also managed here in one place */}
      {showProfileCard && (
        <ProfileCard setshowProfileCard={setshowProfileCard} />
      )}
      {showWalletCard && <WalletCard setshowWalletCard={setshowWalletCard} />}

      {/* The <Outlet> is the placeholder where React Router will render the specific page */}
      <Outlet />

      <Footer2 />
    </div>
  );
}

export default PatientLayout;
