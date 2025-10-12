export default function Appointments({ appointments }) {
  return (
    <div className=" appointments-card">
      <div className="section-header">
        <div className="section-title">
          <div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="4"
                width="18"
                height="18"
                rx="2"
                stroke="#0f766e"
                strokeWidth="1.2"
              ></rect>
              <path
                d="M16 2v4M8 2v4"
                stroke="#0f766e"
                strokeWidth="1.2"
                strokeLinecap="round"
              ></path>
            </svg>
          </div>
          <h2>Today's Appointments</h2>
        </div>
      </div>

      <div className="appointments-list">
        {appointments.map((a, idx) => (
          <div key={idx} className="appointment-item">
            <div className="appointment-info">
              <div className="appointment-name">{a.name}</div>
              <div className="appointment-time">
                {a.time} — {a.note}
              </div>
            </div>
            <a href="#" className="appointment-action">
              View Patient →
            </a>
          </div>
        ))}
        <a href="#" className="view-all-link">
          View all Appointments →
        </a>
      </div>
    </div>
  )
}
