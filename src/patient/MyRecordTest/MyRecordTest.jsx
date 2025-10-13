// import React, { useState, useEffect } from 'react';

// const MyRecordTest = () => {
//     // =================================================================================
//     // I. STATE MANAGEMENT & DATA FETCHING
//     // =================================================================================
//     // This section handles the component's data.
//     // `patientData` will store the information from the API.
//     // `loading` tracks whether we are currently fetching data.
//     // `error` will hold any error messages if the fetch fails.
//     // =================================================================================
    
//     const [patientData, setPatientData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // The `useEffect` hook is used to perform the data fetch when the component
//     // first loads. The empty array `[]` at the end ensures it only runs once.
//     useEffect(() => {
//         const fetchPatientData = async () => {
//             try {
//                 // To fetch private data, an authentication token is required.
//                 // We'll retrieve it from the browser's local storage.
//                 // IMPORTANT: Ensure you are storing your token with the key 'authToken' after login.
//                 const token = localStorage.getItem('authToken');

//                 if (!token) {
//                     throw new Error("Authentication token not found. Please log in.");
//                 }

//                 // We send a GET request to the API endpoint.
//                 // The 'Authorization' header is added, with the token, to prove we have permission
//                 // to view the data.
//                 const response = await fetch('https://altcare-backend-production.up.railway.app/api/patient/profile', {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json'
//                     }
//                 });
                
//                 // If the server responds with a 401 status, it means our token is invalid or expired.
//                 if (response.status === 401) {
//                      throw new Error("Your session has expired. Please log in again.");
//                 }

//                 // If the response is not successful for any other reason, we throw an error.
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
                
//                 // If successful, we parse the JSON data from the response...
//                 const data = await response.json();
//                 // ...and update our component's state with it.
//                 setPatientData(data); 

//             } catch (e) {
//                 // If any step in the `try` block fails, we catch the error here.
//                 setError(e.message);
//                 console.error("Error fetching patient data:", e);
//             } finally {
//                 // This block runs regardless of success or failure.
//                 // We set loading to false because the fetch process is complete.
//                 setLoading(false);
//             }
//         };

//         fetchPatientData();
//     }, []); 

//     // =================================================================================
//     // II. STYLES (CSS)
//     // =================================================================================
//     // To keep this component self-contained and avoid errors, all the CSS styles
//     // are defined here as a string and applied using a <style> tag in the JSX.
//     // =================================================================================

//     const styles = `
//         .my-record-container {
//             font-family: 'Inter', sans-serif;
//             background-color: #f8f9fa;
//             padding: 2rem;
//             max-width: 1200px;
//             margin: 2rem auto;
//             border-radius: 12px;
//             box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
//         }
//         .record-header {
//             display: flex;
//             align-items: center;
//             margin-bottom: 2rem;
//             padding-bottom: 1.5rem;
//             border-bottom: 1px solid #dee2e6;
//         }
//         .patient-avatar {
//             width: 100px;
//             height: 100px;
//             border-radius: 50%;
//             margin-right: 1.5rem;
//             object-fit: cover;
//             border: 3px solid #007bff;
//         }
//         .patient-info h2 {
//             margin: 0;
//             font-size: 2rem;
//             font-weight: 600;
//             color: #343a40;
//         }
//         .patient-info p {
//             margin: 0.25rem 0 0;
//             font-size: 1rem;
//             color: #6c757d;
//         }
//         .record-grid {
//             display: grid;
//             grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//             gap: 1.5rem;
//         }
//         .record-card {
//             background-color: #ffffff;
//             padding: 1.5rem;
//             border-radius: 8px;
//             box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
//             transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
//         }
//         .record-card:hover {
//             transform: translateY(-5px);
//             box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
//         }
//         .card-header {
//             font-size: 1.25rem;
//             font-weight: 600;
//             color: #007bff;
//             margin-top: 0;
//             margin-bottom: 1rem;
//             padding-bottom: 0.5rem;
//             border-bottom: 1px solid #e9ecef;
//         }
//         .info-item {
//             display: flex;
//             justify-content: space-between;
//             padding: 0.75rem 0;
//             border-bottom: 1px solid #f1f3f5;
//         }
//         .info-item:last-child {
//             border-bottom: none;
//         }
//         .info-item strong {
//             color: #495057;
//             font-weight: 500;
//         }
//         .info-item span {
//             color: #6c757d;
//             text-align: right;
//         }
//         .loading-message, .error-message {
//             text-align: center;
//             font-size: 1.2rem;
//             padding: 3rem;
//             color: #6c757d;
//         }
//         .error-message {
//             color: #dc3545;
//         }
//     `;

//     // =================================================================================
//     // III. COMPONENT RENDER (JSX)
//     // =================================================================================
//     // This section determines what gets displayed on the screen.
//     // =================================================================================

//     // First, we handle the loading state. While fetching data, we show a message.
//     if (loading) {
//         return <div className="loading-message">Loading patient records...</div>;
//     }

//     // Next, we handle the error state. If fetching failed, we show the error.
//     if (error) {
//         return <div className="error-message">Error: {error}</div>;
//     }
    
//     // If there's no data for any other reason, show a message.
//     if (!patientData) {
//         return <div className="loading-message">No patient data found.</div>;
//     }

//     // If data has been successfully fetched, we render the main component layout.
//     return (
//         <>
//             {/* The <style> tag applies all the CSS we defined above */}
//             <style>{styles}</style>
//             <div className="my-record-container">
//                 <header className="record-header">
//                     <img 
//                         src={`https://i.pravatar.cc/100?u=${patientData.email}`} 
//                         alt="Patient Avatar" 
//                         className="patient-avatar" 
//                         onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x100/007BFF/FFFFFF?text=P'; }}
//                     />
//                     <div className="patient-info">
//                         <h2>{patientData.firstName || 'N/A'} {patientData.lastName || ''}</h2>
//                         <p>{patientData.email || 'No email provided'}</p>
//                     </div>
//                 </header>

//                 <main className="record-grid">
//                     <div className="record-card">
//                         <h3 className="card-header">Personal Information</h3>
//                         <div className="info-item">
//                             <strong>Date of Birth:</strong>
//                             <span>{patientData.dateOfBirth ? new Date(patientData.dateOfBirth).toLocaleDateString() : 'N/A'}</span>
//                         </div>
//                         <div className="info-item">
//                             <strong>Phone Number:</strong>
//                             <span>{patientData.phoneNumber || 'N/A'}</span>
//                         </div>
//                         <div className="info-item">
//                             <strong>Address:</strong>
//                             <span>{patientData.address || 'N/A'}</span>
//                         </div>
//                     </div>

//                     <div className="record-card">
//                         <h3 className="card-header">Medical Information</h3>
//                         <div className="info-item">
//                             <strong>Blood Group:</strong>
//                             <span>{patientData.bloodGroup || 'N/A'}</span>
//                         </div>
//                         <div className="info-item">
//                             <strong>Genotype:</strong>
//                             <span>{patientData.genotype || 'N/A'}</span>
//                         </div>
//                         <div className="info-item">
//                             <strong>Height:</strong>
//                             <span>{patientData.height || 'N/A'}</span>
//                         </div>
//                          <div className="info-item">
//                             <strong>Weight:</strong>
//                             <span>{patientData.weight || 'N/A'}</span>
//                         </div>
//                         <div className="info-item">
//                             <strong>Allergies:</strong>
//                             <span>{Array.isArray(patientData.allergies) ? patientData.allergies.join(', ') : 'None'}</span>
//                         </div>
//                     </div>

//                     <div className="record-card">
//                         <h3 className="card-header">Emergency Contact</h3>
//                         <div className="info-item">
//                             <strong>Name:</strong>
//                             <span>{patientData.emergencyContact?.name || 'N/A'}</span>
//                         </div>
//                         <div className="info-item">
//                             <strong>Relationship:</strong>
//                             <span>{patientData.emergencyContact?.relationship || 'N/A'}</span>
//                         </div>
//                         <div className="info-item">
//                             <strong>Phone Number:</strong>
//                             <span>{patientData.emergencyContact?.phoneNumber || 'N/A'}</span>
//                         </div>
//                     </div>
//                 </main>
//             </div>
//         </>
//     );
// };

// export default MyRecordTest;



import React from "react";
import { Link } from "react-router-dom";
import "./MyRecordTest.css";
import Card2 from "../../components/PeterComponents/Card2/Card2.jsx";
import Card3 from "../../components/PeterComponents/Card3/Card3.jsx";
import Document from "../../assets/document-text.png";
import book from "../../assets/book.png";
import Recordheader from "../../components/PeterComponents/Recordheader/Recordheader.jsx";

// This component is now simpler. It represents the "All Records" view by default.
// The state logic has been removed because the router now handles which page is shown.
function MyRecordTest() {
  const bookAltText =
    "Open book icon representing medical history highlights section";

  return (
    <main className="dashboard">
      <Card2
        Headline="My Health Records"
        Textline="Access your comprehensive medical history, test results, and prescriptions."
      />

      {/* The Recordheader component now handles its own active state via routing */}
      <Recordheader />

      {/* This section always shows the content for the "All Records" tab */}
      <>
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

        <div className="resultss-container">
          <Card3
            pix={Document}
            topic="Current Prescriptions"
            tn="MEDICATION"
            da="DOSAGE"
            re="REFILLS LEFT"
            pr="PRESCRIBED BY"
            cbc="Medication x"
            date1="10mg, once daily"
            nor1="3"
            Dr1="Dr. Emily White"
            vd1="Request Refill"
            vd2="Contact Prescriber"
            cp="Medication y"
            date2="250mg, twice daily"
            ldl="0"
            Dr2="Dr. Robert Green"
            color1="#008000"
            color2="#FFA500"
            color3="#0000FF"
            vw="View All prescriptions"
            arrow="→"
          />
        </div>
        <div className="containerRecord">
          <div className="Recordcontainer">
            <div className="Record-header">
              <img src={book} alt={bookAltText} />
              <p>Medical History Highlights</p>
            </div>
            <ul className="Record-list">
              <li className="Record-item">
                <span className="dot green"></span>
                Diagnosed with Type 2 Diabetes (2020)
              </li>
              <li className="Record-item">
                <span className="dot red"></span>
                Appendectomy surgery (2018)
              </li>
              <li className="Record-item">
                <span className="dot blue"></span>
                Allergy to Penicillin (Severe)
              </li>
              <li className="Record-item">
                <span className="dot brown"></span>
                Annual Physicals completed regularly
              </li>
            </ul>
            <Link to="/patient/records/history" className="view-History">
              View Full Medical History &rarr;
            </Link>
          </div>
        </div>
      </>
    </main>
  );
}
export default MyRecordTest;
