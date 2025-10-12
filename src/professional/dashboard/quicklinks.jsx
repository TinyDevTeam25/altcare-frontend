export default function QuickLinks() {
  const links = [
    { label: 'Search Patients' },
    { label: 'Add New Patient' },
    { label: 'System Announcement' },
  ]

  return (
    <section className="quick-links">
      <div className="quick-links-header">
        <div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="#7e22ce"
              strokeWidth="1.2"
            ></circle>
            <path
              d="M12 8v5"
              stroke="#7e22ce"
              strokeWidth="1.4"
              strokeLinecap="round"
            ></path>
          </svg>
        </div>
        <h3>Quick Links & Resources</h3>
      </div>
      <div className="links">
        {links.map((link, i) => (
          <a href="#" key={i}>
            {link.label}
          </a>
        ))}
      </div>
    </section>
  )
}
