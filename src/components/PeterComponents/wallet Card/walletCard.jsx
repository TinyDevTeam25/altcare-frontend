import React from "react";
import "./walletCard.css";
import Plus from "../../../assets/plus.png";
import LogOut from "../../../assets/logout.png";
import Transaction from "../../../assets/transaction.png";
const WalletCard = ({ setshowWalletCard }) => {
  return (
    <div className="walletCard" onClick={() => setshowWalletCard(false)}>
      <div className="pcard" onClick={(e) => e.stopPropagation()}>
        <div className="Wallet-info">
          <p>100,000.00</p>
          <p className="currency">(Nigerian Naira NGN)</p>
        </div>
        <button className="gren-btn">
          <img src={Plus} alt="" />
          Top - Up your Balance
        </button>
        <button className="ash-btn">
          <img src={Transaction} alt="" />
          Transaction history
        </button>

        <div onClick={() => setshowWalletCard(false)} className="walletcancel">
          X
        </div>
      </div>
    </div>
  );
};

export default WalletCard;
