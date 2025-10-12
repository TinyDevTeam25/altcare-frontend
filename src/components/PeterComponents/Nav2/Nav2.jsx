import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import logo from "../../../assets/Logo.png";
import Wallet from "../../../assets/wallet.png";
import WalletCard from "../walletCard/walletCard.jsx";
import { useWallet } from "../../wallet/WalletProvider.jsx";
import "./Nav2.css";

// Helper: format like "100,000 NGN"
const formatNavBalance = (minor) => {
  const naira = (minor || 0) / 100;
  const whole = new Intl.NumberFormat("en-NG", {
    maximumFractionDigits: 0,
  }).format(naira);
  return `${whole} NGN`;
};

function Nav2({ setshowProfileCard }) {
  const { user } = useAuth();
  const location = useLocation();
  const [showWalletCard, setshowWalletCard] = useState(false);
  const { balanceMinor } = useWallet();

  // ✅ Sync uploaded profile image
  const [profileImage, setProfileImage] = useState("/default-avatar.jpg");

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) setProfileImage(savedImage);

    const handleProfileImageUpdate = () => {
      const updatedImage = localStorage.getItem("profileImage");
      setProfileImage(updatedImage || "/default-avatar.jpg");
    };

    window.addEventListener("profileImageUpdated", handleProfileImageUpdate);

    return () => {
      window.removeEventListener("profileImageUpdated", handleProfileImageUpdate);
    };
  }, []);

  const navLinks = [
    { path: "/patient/dashboard", name: "Dashboard" },
    { path: "/patient/records", name: "My Records" },
    { path: "/patient/appointments", name: "Appointments" },
    { path: "/patient/messages", name: "Messages" },
    { path: "/patient/profile", name: "Profile" },
  ];

  return (
    <>
      <nav className="nav">
        <Link to="/">
          <img src={logo} alt="Altcare company logo" />
        </Link>

        <ul>
          {navLinks.map(({ path, name }) => (
            <li key={path}>
              <Link
                to={path}
                className={location.pathname.startsWith(path) ? "active" : ""}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>

        <section className="profile">
          <div className="prof" onClick={() => setshowProfileCard(true)}>
            <img
              src={profileImage || "/default-avatar.jpg"}
              alt="User avatar"
            />
            <div className="Jane">
              {user?.profile?.profile?.full_name?.split(" ")[0] ||
                user?.profile?.email ||
                "Guest"}
            </div>
          </div>

          <div className="wallet" onClick={() => setshowWalletCard(true)}>
            <img src={Wallet} alt="Wallet" />
            <p>{formatNavBalance(balanceMinor)}</p>
          </div>
        </section>
      </nav>

      {showWalletCard && <WalletCard setshowWalletCard={setshowWalletCard} />}
    </>
  );
}

export default Nav2;
