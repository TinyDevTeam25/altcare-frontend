// import React from "react";
// import "./walletCard.css";
// import Plus from "../../../assets/plus.png";
// import Transaction from "../../../assets/Transaction.png";
// const WalletCard = ({ setshowWalletCard }) => {
//   return (
//     <div className="walletCard" onClick={() => setshowWalletCard(false)}>
//       <div className="pcard" onClick={(e) => e.stopPropagation()}>
//         <div className="Wallet-info">
//           <p>100,000.00</p>
//           <p className="currency">(Nigerian Naira NGN)</p>
//         </div>
//         <button className="gren-btn">
//           <img src={Plus} alt="" />
//           Top - Up your Balance
//         </button>
//         <button className="ash-btn">
//           <img src={Transaction} alt="" />
//           Transaction history
//         </button>

//         <div onClick={() => setshowWalletCard(false)} className="walletcancel">
//           X
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WalletCard;
import React from "react";
import "./walletCard.css";
import Plus from "../../../assets/plus.png";
import Transaction from "../../../assets/Transaction.png";

// ✅ Uses the new Wallet context for live balance + opening the unified modal
import { useWallet } from "../../wallet/WalletProvider.jsx";
// ^ Adjust the path if your folder structure differs

// 🔢 helper: format as "100,000.00" (no ₦ sign, matches old UI)
const formatNairaNumber = (minor) =>
  new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format((minor || 0) / 100);

const WalletCard = ({ setshowWalletCard }) => {
  const { balanceMinor, openModal } = useWallet();

  // ✅ CHANGED: open specific tabs in the new modal
  const openTopup = () => {
    setshowWalletCard?.(false); // close this legacy overlay
    openModal({ tab: "topup" }); // open unified modal on Top up
  };
  const openHistory = () => {
    setshowWalletCard?.(false); // close this legacy overlay
    openModal({ tab: "history" }); // open unified modal on History
  };

  return (
    // ⬇ keep overlay markup/classes exactly as before
    <div className="walletCard" onClick={() => setshowWalletCard?.(false)}>
      <div className="pcard" onClick={(e) => e.stopPropagation()}>
        {/* ===== Header balance ===== */}
        <div className="Wallet-info">
          {/* ❌ was hard-coded "100,000.00"
              ✅ now shows REAL balance from context, same formatting */}
          <p>{formatNairaNumber(balanceMinor)}</p>
          <p className="currency">(Nigerian Naira NGN)</p>
        </div>

        {/* ===== Buttons (same look) ===== */}
        <button className="gren-btn" onClick={openTopup}>
          <img src={Plus} alt="" />
          Top - Up your Balance
        </button>

        <button className="ash-btn" onClick={openHistory}>
          <img src={Transaction} alt="" />
          Transaction history
        </button>

        {/* ===== Close (same spot) ===== */}
        <div
          className="walletcancel"
          onClick={() => setshowWalletCard?.(false)}
        >
          X
        </div>
      </div>
    </div>
  );
};

export default WalletCard;
