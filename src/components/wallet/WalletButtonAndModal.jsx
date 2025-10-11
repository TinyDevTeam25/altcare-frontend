import React, { useEffect, useMemo, useRef, useState } from "react";
import { useWallet } from "./WalletProvider.jsx";
import "./wallet.css";
import { toast } from "react-toastify";

const METHODS = ["transfer", "card", "ussd"]; // ADDED

// Small helper: persistent demo virtual account in localStorage (no backend needed)
function useDemoVirtualAccount() {
  return useMemo(() => {
    const LS_KEY = "demo_vaccount_v1";
    const existing = localStorage.getItem(LS_KEY);
    if (existing) return JSON.parse(existing);
    const acct = {
      bank: "AltCare Demo Bank",
      account_number:
        "993" + Math.floor(10_000_000 + Math.random() * 89_999_999), // mock NUBAN
      account_name: "AltCare Wallet",
    };
    localStorage.setItem(LS_KEY, JSON.stringify(acct));
    return acct;
  }, []);
}

/** Badge (optional use in headers) */
export function WalletBadge({ className = "" }) {
  const { balanceMinor, format, openModal } = useWallet();
  return (
    <button
      className={`wlt-badge ${className}`}
      onClick={() => openModal({ tab: "topup" })}
      aria-label="Open wallet"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="6"
          width="18"
          height="12"
          rx="3"
          stroke="#008080"
          strokeWidth="1.5"
        />
        <rect x="13" y="10" width="6" height="4" rx="1" fill="#008080" />
      </svg>
      <span>Wallet:</span>
      <strong>{format(balanceMinor)}</strong>
    </button>
  );
}

export default function WalletModal() {
  const {
    open,
    closeModal,
    balanceMinor,
    txns,
    topup,
    format,
    activeTab,
    setActiveTab,
  } = useWallet();

  const [tab, setTab] = useState(activeTab || "topup");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // ADDED: top-up method state
  const [method, setMethod] = useState("transfer");
  const vacct = useDemoVirtualAccount(); // ADDED: fake virtual account for demo

  // ADDED: transfer waiting state
  const [waitingTransfer, setWaitingTransfer] = useState(false);
  const transferTimerRef = useRef(null);

  // Focus trap + ESC
  const modalRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    setTab(activeTab || "topup");
    const first = modalRef.current?.querySelector("button, input");
    first?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "Tab") {
        const focusables = modalRef.current?.querySelectorAll(
          "button, input, [href], select, textarea, [tabindex]:not([tabindex='-1'])"
        );
        if (!focusables?.length) return;
        const firstEl = focusables[0];
        const lastEl = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      // clear any pending transfer timer when closing
      if (transferTimerRef.current) {
        clearTimeout(transferTimerRef.current);
        transferTimerRef.current = null;
        setWaitingTransfer(false);
      }
    };
  }, [open, closeModal, activeTab]);

  // === Handlers ===

  // Simulate CARD payment: just wait then credit
  const handleCardTopup = async (naira) => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1200)); // fake PSP processing
      await topup(Math.round(naira * 100), { demo: true, method: "card" });
      toast.success(`Card charged: ₦${naira.toLocaleString()}`);
      setAmount("");
      setTab("history");
      setActiveTab?.("history");
    } catch {
      toast.error("Card top-up failed");
    } finally {
      setLoading(false);
    }
  };

  // Simulate TRANSFER: show account details, start “waiting” then auto-credit
  const handleTransferStart = (naira) => {
    setWaitingTransfer(true);
    toast.info("Waiting for your bank transfer…");
    // Auto-credit after a short delay to mimic webhook
    transferTimerRef.current = setTimeout(async () => {
      await topup(Math.round(naira * 100), { demo: true, method: "transfer" });
      setWaitingTransfer(false);
      setAmount("");
      toast.success(`Transfer received: ₦${naira.toLocaleString()}`);
      setTab("history");
      setActiveTab?.("history");
    }, 5000);
  };

  // Optional: button to trigger credit immediately (for live demos)
  const simulateTransferNow = async () => {
    if (!amount) return;
    const naira = Number(amount);
    if (!Number.isFinite(naira) || naira < 100) return;
    if (transferTimerRef.current) {
      clearTimeout(transferTimerRef.current);
      transferTimerRef.current = null;
    }
    await topup(Math.round(naira * 100), { demo: true, method: "transfer" });
    setWaitingTransfer(false);
    setAmount("");
    toast.success(`Transfer received: ₦${naira.toLocaleString()}`);
    setTab("history");
    setActiveTab?.("history");
  };

  // Simulate USSD: show code and let user “Mark as paid”
  const handleUSSDPay = async (naira) => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1400)); // fake USSD completion
      await topup(Math.round(naira * 100), { demo: true, method: "ussd" });
      toast.success(`USSD payment: ₦${naira.toLocaleString()}`);
      setAmount("");
      setTab("history");
      setActiveTab?.("history");
    } catch {
      toast.error("USSD payment failed");
    } finally {
      setLoading(false);
    }
  };

  const handleTopup = async () => {
    const naira = Number(amount);
    if (!Number.isFinite(naira) || naira < 100) {
      return toast.error("Minimum top-up is ₦100");
    }
    if (method === "card") return handleCardTopup(naira);
    if (method === "transfer") return handleTransferStart(naira);
    if (method === "ussd") return handleUSSDPay(naira);
  };

  if (!open) return null;

  // USSD string for the demo (static format)
  const ussdString = amount
    ? `*123*000*${Number(amount)}#`
    : `*123*000*AMOUNT#`;

  return (
    <div className="wlt-overlay" onClick={closeModal}>
      <div
        className="wlt-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        ref={modalRef}
      >
        <button className="wlt-close" onClick={closeModal} aria-label="Close">
          ×
        </button>

        {/* Header */}
        <div className="wlt-header">
          <div className="wlt-head-left">
            <div className="wlt-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="6"
                  width="18"
                  height="12"
                  rx="3"
                  fill="#E6FFFB"
                  stroke="#0F766E"
                />
                <rect
                  x="13"
                  y="10"
                  width="6"
                  height="4"
                  rx="1"
                  fill="#0F766E"
                />
              </svg>
            </div>
            <div>
              <h3 className="wlt-title">Wallet</h3>
              <p className="wlt-sub">Top up or view your transactions</p>
            </div>
          </div>

          {/* Tabs: Top up / History */}
          <div className="wlt-tabs">
            <button
              className={`wlt-tab ${tab === "topup" ? "active" : ""}`}
              onClick={() => {
                setTab("topup");
                setActiveTab?.("topup");
              }}
            >
              Top up
            </button>
            <button
              className={`wlt-tab ${tab === "history" ? "active" : ""}`}
              onClick={() => {
                setTab("history");
                setActiveTab?.("history");
              }}
            >
              History
            </button>
          </div>
        </div>

        {/* Balance */}
        <div className="wlt-balance-card">
          <span>Current balance</span>
          <strong>{format(balanceMinor)}</strong>
        </div>

        {/* Body */}
        {tab === "topup" ? (
          <div className="wlt-topup">
            <label className="wlt-label">Amount (₦)</label>
            <div className="wlt-input-row">
              <input
                className="wlt-input"
                type="number"
                min="0"
                step="50"
                placeholder="e.g. 1000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                className="wlt-btn wlt-btn--primary"
                disabled={loading || waitingTransfer}
                onClick={handleTopup}
              >
                {waitingTransfer
                  ? "Waiting…"
                  : loading
                  ? "Processing…"
                  : "Continue"}
              </button>
            </div>
            <p className="wlt-hint">Minimum ₦100</p>

            {/* Presets */}
            <div className="wlt-chips">
              {[1000, 5000, 10000].map((n) => (
                <button
                  key={n}
                  className="wlt-chip"
                  onClick={() => setAmount(String(n))}
                >
                  ₦{n.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Method selector (ADDED) */}
            <div className="wlt-methods">
              {METHODS.map((m) => (
                <button
                  key={m}
                  className={`wlt-method ${method === m ? "active" : ""}`}
                  onClick={() => setMethod(m)}
                  type="button"
                >
                  {m === "transfer"
                    ? "Transfer"
                    : m === "card"
                    ? "Card"
                    : "USSD"}
                </button>
              ))}
            </div>

            {/* Panels per method (ADDED) */}
            {method === "transfer" && (
              <div className="wlt-panel">
                <div className="wlt-kv">
                  <span>Bank</span>
                  <strong>{vacct.bank}</strong>
                </div>
                <div className="wlt-kv">
                  <span>Account number</span>
                  <strong className="mono">{vacct.account_number}</strong>
                </div>
                <div className="wlt-kv">
                  <span>Account name</span>
                  <strong>{vacct.account_name}</strong>
                </div>

                {waitingTransfer ? (
                  <div className="wlt-wait">
                    <span className="dot" /> Waiting for transfer… (auto-credit
                    in a few seconds)
                    <button
                      className="wlt-inline"
                      onClick={simulateTransferNow}
                    >
                      Simulate now
                    </button>
                  </div>
                ) : (
                  <p className="wlt-note">
                    Make a transfer from any bank app. We’ll credit your wallet
                    automatically.
                  </p>
                )}
              </div>
            )}

            {method === "card" && (
              <div className="wlt-panel">
                <p className="wlt-note">
                  For demo, we’ll simulate a successful card charge.
                </p>
              </div>
            )}

            {method === "ussd" && (
              <div className="wlt-panel">
                <div className="wlt-ussd mono">{ussdString}</div>
                <p className="wlt-note">
                  Dial this on your phone to complete payment. (Demo will
                  auto-credit.)
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="wlt-history">
            <div className="wlt-history-head">
              <h4>Recent activity</h4>
            </div>
            <div className="wlt-history-scroll">
              {txns.length === 0 ? (
                <p className="wlt-empty">
                  No transactions yet. Top up to get started.
                </p>
              ) : (
                <ul className="wlt-list">
                  {txns.map((t) => (
                    <li key={t.id} className="wlt-item">
                      <div className="wlt-item-main">
                        <span
                          className={`wlt-tag ${
                            t.dir === "IN" ? "wlt-tag--in" : "wlt-tag--out"
                          }`}
                        >
                          {t.dir === "IN" ? "Top-up" : "Payment"}
                        </span>
                        <span className="wlt-ref">{t.ref}</span>
                      </div>
                      <div className="wlt-item-side">
                        <span
                          className={`wlt-amt ${t.dir === "IN" ? "in" : "out"}`}
                        >
                          {t.dir === "IN" ? "+" : "−"} {format(t.amountMinor)}
                        </span>
                        <span
                          className={`wlt-status ${t.status.toLowerCase()}`}
                        >
                          {t.status}
                        </span>
                        <span className="wlt-date">
                          {new Date(t.ts).toLocaleString()}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
