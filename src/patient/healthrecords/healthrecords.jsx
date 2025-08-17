import RecordCard from "./recordcard";
import RecordTabs from "./recordtabs";
import Footer from "../../components/headfoot/Footer";
import PatientHeader from "../../components/headfoot/PatientHeader";

import Icon1 from "../../assets/book.png";
import Icon2 from "../../assets/book (1).png";
import Icon3 from "../../assets/book (2).png";
import Icon4 from "../../assets/book (3).png";
import Icon5 from "../../assets/book (4).png";

export default function HealthRecords() {
  return (
    <div className="min-h-screen flex flex-col">
      <PatientHeader />

      <main className="flex-grow px-4 md:px-12 py-2 max-w-5xl mx-auto mt-10 mb-20">
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h1 className="text-xl md:text-2xl font-semibold mb-2">
            My Health Records
          </h1>
          <p>
            Access your comprehensive medical history, test results, and
            prescriptions.
          </p>
        </section>

        <RecordTabs activeTab="Medical History" />

        <div className="space-y-6 mt-6">
          <RecordCard
            title="Chronic Conditions"
            items={[
              "Hypertension (Diagnosed 2023-09-01) – Managed with medication.",
              "Type 2 Diabetes (Diagnosed 2022-07-01) – Diet and exercise controlled.",
              "Asthma (Diagnosed 2005) – Controlled with inhaler as needed.",
            ]}
            icon={Icon1}
          />
          <RecordCard
            title="Past Surgeries"
            items={[
              "Appendectomy (Date: 2018-08-20) – No complications.",
              "Tonsillectomy (Date: 2009-10-13) – Childhood procedure.",
            ]}
            icon={Icon2}
          />
          <RecordCard
            title="Allergies"
            items={[
              "Penicillin (Severely Severe) – Reaction: Anaphylaxis",
              "Dust Mites (Severity: Mild) – Reaction: sneezing, watery eyes.",
              "Pollen (Severity: Moderate) – Seasonal allergies.",
            ]}
            icon={Icon3}
          />
          <RecordCard
            title="Family History"
            items={[
              "Father: Heart Disease, Age 65",
              "Mother: Type 2 Diabetes, Age 70",
              "Paternal Grandfather: Hypertension",
            ]}
            icon={Icon4}
          />
          <RecordCard
            title="Immunizations"
            items={[
              "COVID-19 Vaccine (2 doses, Last: 2023-09-10)",
              "Influenza Vaccine (Annual, Last: 2024-01-01)",
              "Tetanus, Diphtheria, Pertussis (Last: 2023-09-20)",
              "Measles, Mumps, Rubella (MMR) (Last: 2008-08-01)",
            ]}
            icon={Icon5}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
