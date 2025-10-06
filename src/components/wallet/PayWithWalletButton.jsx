import React, { useState } from "react";
import { useWallet } from "./WalletProvider.jsx";
import { toast } from "react-toastify";
import "./wallet.css";

// Use this on any page to charge the wallet
export default function PayWithWalletButton({
  amountMinor, // amount in kobo
  reference = "", // e.g. appointment id
  label = "Pay with Wallet",
  onSuccess,
  onInsufficient, // optional
  className = "",
}) {
  const { spend, openModal, format } = useWallet();
  const [loading, setLoading] = useState(false);

  const pay = async () => {
    if (!Number.isFinite(amountMinor) || amountMinor <= 0) {
      return toast.error("Invalid amount.");
    }
    setLoading(true);
    try {
      await spend(amountMinor, { reference });
      toast.success(`Paid ${format(amountMinor)} from wallet`);
      onSuccess?.();
    } catch (e) {
      if (e?.code === "INSUFFICIENT_FUNDS") {
        toast.error("Insufficient wallet balance. Top up to continue.");
        onInsufficient?.();
        openModal(); // open top-up modal right away
      } else {
        toast.error("Could not complete payment.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`wlt-btn wlt-btn--primary ${className}`}
      onClick={pay}
      disabled={loading}
    >
      {loading ? "Processing…" : label}
    </button>
  );
}
