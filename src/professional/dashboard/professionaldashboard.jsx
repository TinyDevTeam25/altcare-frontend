import ProfessionalHeader from '../appointment-details/ProfessionalHeader.jsx'
import Footer from '../../components/headfoot/Footer.jsx'
import Appointments from './appointments.jsx'
import StatCard from './statcard.jsx'
import PendingActions from './pendingActions.jsx'
import QuickLinks from './quicklinks.jsx'

import './dashboard.css'

const stats = [
  { title: 'Total Patients', value: 150, subtitle: 'Under your care' },
  { title: 'Appointments Today', value: 5, subtitle: 'Scheduled for today' },
  { title: 'New Messages', value: 7, subtitle: 'From patients & staff' },
  { title: 'Pending Tasks', value: 3, subtitle: 'Record updates, approvals' },
]

const appointments = [
  { name: 'John Doe', time: '10:00 AM', note: 'General Check-up' },
  { name: 'Jane Smith', time: '11:30 AM', note: 'Follow-up (Blood Pressure)' },
  {
    name: 'Michael Brown',
    time: '02:00 PM',
    note: 'New Patient Consultation',
  },
]

const actions = [
  {
    title: 'New Test Result for Sarah Davis',
    sub: 'Blood Panel - Needs Review',
    action: 'Review',
  },
  {
    title: 'Message from Patient Emily Chen',
    sub: 'Question about medication',
    action: 'Reply',
  },
  {
    title: 'Prescription Refill Request',
    sub: 'Patient David Lee - Medication Z',
    action: 'Approve',
  },
]

export default function ProfessionalDashboard() {
  return (
    <section className="dashboard-container">
      <ProfessionalHeader />
      <main className="dashboard-main">
        <div className="welcome-card">
          <h1>Welcome, Dr. Erica Browne</h1>
          <p>Your professional overview and quick actions.</p>
        </div>
        <section className="stats-grid">
          {stats.map((s) => (
            <StatCard key={s.title} {...s} />
          ))}
        </section>

        <section className="main-sections">
          <Appointments appointments={appointments} />
          <PendingActions actions={actions} />
        </section>

        <QuickLinks />
      </main>
      <Footer />
    </section>
  )
}
