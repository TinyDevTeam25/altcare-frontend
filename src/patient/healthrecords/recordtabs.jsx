// export default function RecordTabs({ activeTab }) {
//   const tabs = [
//     'All Records',
//     'Test Results',
//     'Prescriptions',
//     'Medical History',
//     'Immunizations',
//   ]

//   return (
//     <div className="flex flex-wrap gap-6 pb-2 px-15 mt-15 mb-10">
//       {tabs.map((tab) => (
//         <button
//           key={tab}
//           className={`pb-1 border-b-2 ${
//             activeTab === tab
//               ? 'border-[#38B2AC] text-[#38B2AC] font-semibold'
//               : 'border-transparent hover:text-[#38B2AC]'
//           }`}
//         >
//           {tab}
//         </button>
//       ))}
//     </div>
//   )
// }
