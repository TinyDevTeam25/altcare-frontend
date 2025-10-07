export default function StatCard({ title, value, subtitle }) {
  return (
    <div className="stat-card">
      <div className="title">{title}</div>
      <div className="value">{value}</div>
      <div className="subtitle">{subtitle}</div>
    </div>
  )
}
