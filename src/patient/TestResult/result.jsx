import React from "react";
import "../MyRecordTest/MyRecordTest.css";
// import PatientHeader from "../../components/headfoot/PatientHeader";
import Card2 from "../../components/PeterComponents/Card2/Card2.jsx";
import Card3 from "../../components/PeterComponents/Card3/Card3.jsx";
import Document from "../../assets/document-text.png";
import Footer2 from "../../components/PeterComponents/Footer2/Footer2.jsx";
import Recordheader from "../../components/PeterComponents/Recordheader/Recordheader.jsx";
import "./result.css"; // Assuming you have a CSS file for styling
function result() {
  return (
    <>
      {/* <PatientHeader activePage="records" /> */}
      <main className="dashboard">
        <Card2
          Headline="My Health Records"
          Textline="Access your comprehensive medical history, test results, and prescriptions."
        />

        <Recordheader />
        <div className="resultss-container">
          <Card3
            pix={Document}
            topic="Test Results"
            tn="TEST NAME"
            da="DATE"
            re="RESULT"
            pr="PROVIDER"
            cbc="Complete Blood Count (CBC)"
            date1="2025-06-28"
            nor1="Normal"
            nor2="Normal"
            Dr1="Dr. Emily White"
            vd1="View Details"
            vd2="View Details"
            vd3="View Details"
            cp="Cholesterol Panel"
            date2="2025-05-10"
            ldl="Elevated LDL"
            Dr2="Dr. Robert Green"
            Dr3="Dr. Emily White"
            color1="#008000"
            color2="#FFA500"
            color3="#0000FF"
            ur="Urinalysis"
            date3="2025-04-01"
            vw="View All Results"
            arrow="→"
          />
        </div>
      </main>
      <Footer2 />
    </>
  );
}
export default result;
