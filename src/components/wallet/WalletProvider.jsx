import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const WalletCtx = createContext(null);
const LS_BAL = "wallet_balance_minor";
const LS_TXN = "wallet_transactions_v1";

const fmt = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 2,
});

function loadLS(key, fallback) {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v ?? fallback;
  } catch {
    return fallback;
  }
}
function saveLS(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

export function WalletProvider({ children }) {
  const [balanceMinor, setBalanceMinor] = useState(() => loadLS(LS_BAL, 0));
  const [txns, setTxns] = useState(() => loadLS(LS_TXN, []));
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("topup"); // ADDED

  useEffect(() => {
    saveLS(LS_BAL, balanceMinor);
  }, [balanceMinor]);
  useEffect(() => {
    saveLS(LS_TXN, txns);
  }, [txns]);

  const topup = async (amountMinor, meta = {}) => {
    if (!Number.isFinite(amountMinor) || amountMinor <= 0)
      throw new Error("Invalid amount");
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    setBalanceMinor((b) => b + amountMinor);
    setTxns((t) => [
      {
        id,
        dir: "IN",
        amountMinor,
        status: "SUCCEEDED",
        ref: `TOPUP-${id.slice(0, 6)}`,
        meta,
        ts: now,
      },
      ...t,
    ]);
    return { id };
  };

  const spend = async (amountMinor, { reference = "", meta = {} } = {}) => {
    if (!Number.isFinite(amountMinor) || amountMinor <= 0)
      throw new Error("Invalid amount");
    if (balanceMinor < amountMinor) {
      const err = new Error("INSUFFICIENT_FUNDS");
      err.code = "INSUFFICIENT_FUNDS";
      throw err;
    }
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    setBalanceMinor((b) => b - amountMinor);
    setTxns((t) => [
      {
        id,
        dir: "OUT",
        amountMinor,
        status: "SUCCEEDED",
        ref: reference || `PAY-${id.slice(0, 6)}`,
        meta,
        ts: now,
      },
      ...t,
    ]);
    return { id };
  };

  const resetDemo = () => {
    setBalanceMinor(0);
    setTxns([]);
  };

  const openModal = (opts) => {
    // CHANGED
    if (opts?.tab) setActiveTab(opts.tab); // ADDED
    setOpen(true);
  };
  const closeModal = () => setOpen(false);

  const value = useMemo(
    () => ({
      balanceMinor,
      txns,
      open,
      activeTab,
      setActiveTab, // ADDED
      openModal,
      closeModal, // CHANGED: open now accepts a tab
      topup,
      spend,
      resetDemo,
      format: (minor) => fmt.format(minor / 100),
    }),
    [balanceMinor, txns, open, activeTab]
  );

  return <WalletCtx.Provider value={value}>{children}</WalletCtx.Provider>;
}

export function useWallet() {
  const ctx = useContext(WalletCtx);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}
