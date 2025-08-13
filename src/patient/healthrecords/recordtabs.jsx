export default function RecordTabs({ activeTab }) {
  const tabs = [
    'All Records',
    'Test Results',
    'Prescriptions',
    'Medical History',
    'Immunizations',
  ]

  return (
    <div className="flex flex-wrap gap-6 pb-2 px-15 mt-15 mb-10">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`pb-1 border-b-2 ${
            activeTab === tab
              ? 'border-cyan-500 text-cyan-600 font-semibold'
              : 'border-transparent hover:text-cyan-500'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
