import React from "react";
import { Link } from "react-router-dom";
import "./WalletPopover.css"; // Imports its own stylesheet
import plusIcon from "../../assets/plus.png";
import historyIcon from "../../assets/Transaction.png";

function WalletPopover({ closePopover }) {
  // This function stops the click from closing the popover immediately
  const handleCardClick = (e) => e.stopPropagation();

  return (
    // The dark overlay that closes the popover when clicked
    <div className="popover-overlay" onClick={closePopover}>
      <div className="wallet-popover-card" onClick={handleCardClick}>
        <button onClick={closePopover} className="popover-close-btn">
          X
        </button>
        <div className="wallet-info">
          <p className="balance">100,000.00</p>
          <p className="currency">(Nigerian Naira NGN)</p>
        </div>
        <div className="wallet-actions">
          <Link to="/patient/wallet/top-up" className="popover-button green">
            <img src={plusIcon} alt="Top up" />
            <span>Top - Up your Balance</span>
          </Link>
          <Link to="/patient/wallet/history" className="popover-button ash">
            <img src={historyIcon} alt="History" />
            <span>Transaction history</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WalletPopover;
