// import React from "react";
// import { useAuth } from "../../../context/AuthContext.jsx";
// import "./Nav2.css";
// import { Link, useLocation } from "react-router-dom"; // Corrected import
// import logo from "../../../assets/Logo.png";
// import JaneDoe from "../../../assets/jane-doe-avatar.png";
// import Wallet from "../../../assets/wallet.png";

// function Nav2({ setshowProfileCard, setshowWalletCard }) {
//   const { user } = useAuth();
//   const location = useLocation();

//   let navLinks = [
//     { path: "/patient/dashboard", name: "Dashboard" }, // Corrected path
//     { path: "/patient/records", name: "My Records" }, // Corrected path
//     { path: "/patient/appointments", name: "Appointments" }, // Corrected path
//     { path: "/patient/messages", name: "Messages" }, // Corrected path
//     { path: "/patient/profile", name: "Profile" }, // Corrected path
//   ];

//   return (
//     <nav className="nav">
//       <Link to="/">
//         <img
//           src={logo}
//           alt="Altcare company logo with stylized text on a white background"
//         />
//       </Link>

//       <ul>
//         {navLinks.map(({ path, name }) => (
//           // Added the 'key' prop to the <li> element
//           <li key={path}>
//             <Link
//               to={path}
//               className={location.pathname.startsWith(path) ? "active" : ""}
//             >
//               {name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//       <section className="profile">
//         <div className="prof" onClick={() => setshowProfileCard(true)}>
//           <img
//             src={JaneDoe}
//             alt="Jane Doe smiling in a professional headshot with a neutral background"
//           />
//           {/* We add a check to make sure 'user' exists before trying to read its properties.
//             This prevents the app from crashing before a user logs in. */}
//           <div className="Jane">
//             {user?.patient?.full_name?.split(" ")[0] || "Guest"}
//           </div>
//         </div>
//         <div className="wallet" onClick={() => setshowWalletCard(true)}>
//           <img src={Wallet} alt="" />
//           <p> 100,000 NGN</p>
//         </div>
//       </section>
//     </nav>
//   );
// }
// export default Nav2;

// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { useAuth } from "../../../context/AuthContext.jsx";
// import logo from "../../../assets/Logo.png";
// import JaneDoe from "../../../assets/jane-doe-avatar.png";
// import Wallet from "../../../assets/wallet.png";
// import WalletModal, {
//   WalletBadge,
// } from "../../wallet/WalletButtonAndModal.jsx";
// import "./Nav2.css";

// function Nav2({ setshowProfileCard, setshowWalletCard }) {
//   // We only need the user object here. The loading check happens on the page itself.
//   const { user } = useAuth();
//   const location = useLocation();

//   const navLinks = [
//     { path: "/patient/dashboard", name: "Dashboard" },
//     { path: "/patient/records", name: "My Records" },
//     { path: "/patient/appointments", name: "Appointments" },
//     { path: "/patient/messages", name: "Messages" },
//     { path: "/patient/profile", name: "Profile" },
//   ];

//   return (
//     <nav className="nav">
//       <Link to="/">
//         <img src={logo} alt="Altcare company logo" />
//       </Link>
//       <ul>
//         {navLinks.map(({ path, name }) => (
//           <li key={path}>
//             <Link
//               to={path}
//               className={location.pathname.startsWith(path) ? "active" : ""}
//             >
//               {name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//       <section className="profile">
//         <div className="prof" onClick={() => setshowProfileCard(true)}>
//           <img src={JaneDoe} alt="User avatar" />
//           <div className="Jane">
//             {/*
//               This optional chaining is the key. It will show "Guest" for the
//               split second before the state updates, and then automatically
//               re-render to show the real name. It will not crash.
//             */}
//             {user?.profile?.profile?.full_name?.split(" ")[0] ||
//               user?.profile?.email ||
//               "Guest"}
//           </div>
//         </div>
//         <div className="wallet" onClick={() => setshowWalletCard(true)}>
//           <img src={Wallet} alt="Wallet" />
//           <p> 100,000 NGN</p>
//         </div>
//       </section>
//     </nav>
//   );
// }
// export default Nav2;

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import logo from "../../../assets/Logo.png";
import JaneDoe from "../../../assets/jane-doe-avatar.png";
import Wallet from "../../../assets/wallet.png";

// Legacy wallet card (your original look)
import WalletCard from "../walletCard/walletCard.jsx";

// ADDED: pull live balance from the WalletProvider
import { useWallet } from "../../wallet/WalletProvider.jsx"; // <-- adjust path if needed

import "./Nav2.css";

// ADDED: helper to format like "100,000 NGN" (no decimals, no ₦)
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

  // ADDED: local state to show/hide your legacy wallet card
  const [showWalletCard, setshowWalletCard] = useState(false);

  // ADDED: read current balance
  const { balanceMinor } = useWallet();

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
            <img src={JaneDoe} alt="User avatar" />
            <div className="Jane">
              {user?.profile?.profile?.full_name?.split(" ")[0] ||
                user?.profile?.email ||
                "Guest"}
            </div>
          </div>

          {/* CHANGED: show LIVE balance instead of hard-coded "100,000 NGN" */}
          <div className="wallet" onClick={() => setshowWalletCard(true)}>
            <img src={Wallet} alt="Wallet" />
            <p>{formatNavBalance(balanceMinor)}</p> {/* ADDED */}
          </div>
        </section>
      </nav>

      {/* Legacy wallet card overlay (unchanged visual) */}
      {showWalletCard && <WalletCard setshowWalletCard={setshowWalletCard} />}
    </>
  );
}

export default Nav2;
