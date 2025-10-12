import React from 'react'

export default function PendingActions({ actions }) {
  return (
    <div className="pending-card">
      <div className="section-header">
        <div className="section-title">
          <div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="#ef4444"
                strokeWidth="1.2"
              ></circle>
              <path
                d="M12 8v5"
                stroke="#ef4444"
                strokeWidth="1.4"
                strokeLinecap="round"
              ></path>
            </svg>
          </div>
          <h2>Pending Actions</h2>
        </div>
      </div>

      <div className="actions-list">
        {actions.map((act, idx) => (
          <div key={idx} className="action-item">
            <div className='action-info'>
              <div className="action-title">{act.title}</div>
              <div className="action-sub">{act.sub}</div>
            </div>
            <a href="#" className="action-link">
              {act.action} →
            </a>
          </div>
        ))}
        <a href="#" className="view-all-link">
          View all pending actions →
        </a>
      </div>
    </div>
  )
}
