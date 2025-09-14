import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ConsentModal.css";

function ConsentModal({ onConsent, onDecline, onClose }) {
  // The state for the checkbox now correctly lives inside this component
  const [hasAgreed, setHasAgreed] = useState(false);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="consent-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="consent-title">Your Privacy Matters</h2>
        <p className="consent-intro">
          We value your trust. By using this app, you agree that:
        </p>

        <ul className="consent-points">
          <li>
            We may collect and use your personal and medical information to
            provide care and improve our services.
          </li>
          <li>
            Your data is stored securely and only shared with authorized
            healthcare providers.
          </li>
          <li>
            You can withdraw consent, access, or delete your data at any time
            via your account settings.
          </li>
          <li>
            Full details are available in our{" "}
            <Link
              to="/privacy-policy"
              target="_blank"
              style={{ color: "#008080" }}
            >
              Privacy Policy
            </Link>
            .
          </li>
        </ul>

        <div className="consent-checkbox-container">
          <input
            type="checkbox"
            id="consent-checkbox"
            checked={hasAgreed}
            // The setHasAgreed function is now correctly used here
            onChange={(e) => setHasAgreed(e.target.checked)}
          />
          <label htmlFor="consent-checkbox">
            I have read and consent to the use of my data
          </label>
        </div>

        <div className="consent-actions">
          <button
            className="consent-button agree"
            onClick={onConsent}
            // The value of hasAgreed is now correctly used here to disable the button
            disabled={!hasAgreed}
          >
            Agree
          </button>
          <button className="consent-button decline" onClick={onDecline}>
            I Do Not Agree
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConsentModal;
