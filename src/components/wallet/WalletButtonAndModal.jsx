import React, { useEffect, useMemo, useRef, useState } from "react";
import { useWallet } from "./WalletProvider.jsx";
import "./wallet.css";
import { toast } from "react-toastify";

/** Badge you can use anywhere (eg. in Nav2) */
export function WalletBadge({ className = "" }) {
  const { balanceMinor, format, openModal } = useWallet();
  return (
    <button
      className={`wlt-badge ${className}`}
      onClick={() => openModal({ tab: "topup" })}
      aria-label="Open wallet"
    >
      {/* ADDED: inline wallet glyph for a more polished look */}
      <span className="wlt-badge-icon" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="6"
            width="18"
            height="12"
            rx="3"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <rect x="13" y="10" width="6" height="4" rx="1" fill="currentColor" />
        </svg>
      </span>
      <span className="wlt-badge-label">Wallet</span>
      <span className="wlt-badge-amount">{format(balanceMinor)}</span>
    </button>
  );
}

/** Main modal: polished UI, tabs, accessibility, focus trap */
export default function WalletModal() {
  const {
    open,
    closeModal,
    balanceMinor,
    txns,
    topup,
    format,
    activeTab,
    setActiveTab, // CHANGED: read/write active tab from context
  } = useWallet();

  // ADDED: local controlled tab (syncs with context on open)
  const [tab, setTab] = useState(activeTab || "topup");
  useEffect(() => {
    if (open) setTab(activeTab || "topup");
  }, [activeTab, open]);

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // ===== Accessibility: Focus trap + ESC close =====
  const modalRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement;
    // Focus first interactive element
    const first = modalRef.current?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    first?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key !== "Tab") return;
      // Tiny focus trap
      const focusables = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
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
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [open, closeModal]);

  const presets = useMemo(() => [1000, 5000, 10000], []);

  const onTopup = async () => {
    const naira = Number(amount);
    if (!Number.isFinite(naira) || naira < 100) {
      return toast.error("Minimum top-up is ₦100");
    }
    setLoading(true);
    try {
      await topup(Math.round(naira * 100), { demo: true });
      toast.success(`Wallet topped up by ₦${naira.toLocaleString()}`);
      setAmount("");
      setTab("history"); // ADDED: show result immediately
      setActiveTab?.("history");
    } catch {
      toast.error("Could not top up wallet.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="wlt-overlay" onClick={closeModal}>
      <div
        className="wlt-modal wlt-elevated"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="wlt-title"
        ref={modalRef}
      >
        <button className="wlt-close" aria-label="Close" onClick={closeModal}>
          ×
        </button>

        {/* HEADER */}
        <div className="wlt-header">
          <div className="wlt-header-left">
            <div className="wlt-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24">
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
              <h3 id="wlt-title" className="wlt-title">
                Wallet
              </h3>
              <p className="wlt-sub">
                Top up your balance or review recent activity
              </p>
            </div>
          </div>

          {/* TABS */}
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

        {/* BALANCE CARD */}
        <div className="wlt-balance-card">
          <span>Current balance</span>
          <strong>{format(balanceMinor)}</strong>
        </div>

        {/* BODY */}
        {tab === "topup" ? (
          <div className="wlt-topup">
            <label className="wlt-label">Top up amount (₦)</label>
            <div className="wlt-input-row">
              <input
                type="number"
                min="0"
                step="50"
                placeholder="e.g. 1000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="wlt-input"
                aria-label="Top up amount in Naira"
              />
              <button
                className="wlt-btn wlt-btn--primary"
                onClick={onTopup}
                disabled={loading}
              >
                {loading ? "Processing…" : "Top up"}
              </button>
            </div>
            <p className="wlt-hint">Minimum top-up is ₦100.</p>

            {/* PRESETS (improved contrast) */}
            <div className="wlt-chips">
              {presets.map((n) => (
                <button
                  key={n}
                  className="wlt-chip"
                  onClick={() => setAmount(String(n))}
                  aria-label={`Set amount to ₦${n.toLocaleString()}`}
                >
                  ₦{n.toLocaleString()}
                </button>
              ))}
            </div>
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
