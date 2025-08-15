export default function PrescriptionTable() {
  const prescriptions = [
    {
      medication: 'Medication X',
      dosage: '10mg, once daily',
      refillsLeft: 3,
      prescribedBy: 'Dr. Emily White',
      action: 'Request Refill',
    },
    {
      medication: 'Medication Y',
      dosage: '250mg, twice daily',
      refillsLeft: 0,
      prescribedBy: 'Dr. Robert Green',
      action: 'Contact Prescriber',
    },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm md:text-base">
        <thead>
          <tr className="text-left border-b uppercase">
            <th className="py-2 pr-4">Medication</th>
            <th className="py-2 pr-4">Dosage</th>
            <th className="py-2 pr-4">Refills Left</th>
            <th className="py-2 pr-4">Prescribed By</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((pres, idx) => (
            <tr key={idx} className="border-b last:border-0">
              <td className="py-3 pr-4">{pres.medication}</td>
              <td className="py-3 pr-4">{pres.dosage}</td>
              <td
                className={`py-3 pr-4 font-medium ${
                  pres.refillsLeft === 0 ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {pres.refillsLeft}
              </td>
              <td className="py-3 pr-4">{pres.prescribedBy}</td>
              <td className="py-3">
                <a
                  href="#"
                  className="text-blue-600 hover:underline font-medium"
                >
                  {pres.action}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
