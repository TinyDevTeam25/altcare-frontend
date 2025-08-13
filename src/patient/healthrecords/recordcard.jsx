export default function RecordCard({ title, items = [], icon }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className={`font-semibold text-lg flex items-center gap-2 mb-2`}>
        <img src={icon} className="w-5" alt="record avatar" /> {title}
      </h2>
      <ul className="list-disc list-inside space-y-1">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
