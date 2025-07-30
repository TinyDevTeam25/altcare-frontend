import React from "react";
import attachIcon from "../assets/attach-icon.svg";
import eyeIcon from "../assets/eye.svg";
import downloadIcon from "../assets/document-download.svg";

function RelatedDocuments() {
  return (
    <div className="details-card-patient documents-card">
      <div className="card-header">
        <img src={attachIcon} alt="" className="card-icon" />
        <h2 className="card-title">Related Documents</h2>
      </div>
      <div className="card-body">
        <ul className="document-list">
          <li className="document-item">
            <div className="document-info">
              <span className="document-name">
                Referral Letter - Cardiology
              </span>
              <span className="document-meta">
                PDF Document - Uploaded: 2025-07-10
              </span>
            </div>
            <div className="document-actions">
              <button>
                <img src={eyeIcon} alt="View" />
              </button>
              <button>
                <img src={downloadIcon} alt="Download" />
              </button>
            </div>
          </li>
          <li className="document-item">
            <div className="document-info">
              <span className="document-name">
                Pre-Op Instructions (Colonoscopy)
              </span>
              <span className="document-meta">
                PDF Document - Uploaded: 2025-07-10
              </span>
            </div>
            <div className="document-actions">
              <button>
                <img src={eyeIcon} alt="View" />
              </button>
              <button>
                <img src={downloadIcon} alt="Download" />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default RelatedDocuments;
