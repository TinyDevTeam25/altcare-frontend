import RecordTabs from "../healthrecords/recordtabs.jsx";
// import Footer from "../../components/headfoot/Footer.jsx";
// import PatientHeader from "../../components/headfoot/PatientHeader.jsx";
import PrescriptionTable from "./prescriptiontable.jsx";

import PrescriptionIcon from "../../assets/task-square.png";

export default function PrescriptionRecords() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <PatientHeader activePage="records" /> */}

      <main className="flex-grow px-4 md:px-12 py-8 max-w-5xl mx-auto mb-50">
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h1 className="text-xl md:text-2xl font-semibold mb-2">
            My Health Records
          </h1>
          <p>
            Access your comprehensive medical history, test results, and
            prescriptions.
          </p>
        </section>

        <RecordTabs activeTab="Prescriptions" />

        <section className="mt-8 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span>
              <img
                src={PrescriptionIcon}
                alt="prescription avatar"
                className="w-5"
              />
            </span>
            Current Prescription
          </h2>

          <PrescriptionTable />

          <div className="mt-4">
            <a
              href="#"
              className="text-[#38B2AC] font-medium inline-flex items-center gap-1 hover:underline"
            >
              View All Prescriptions
              <span className="text-xl">→</span>
            </a>
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
