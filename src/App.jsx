import React from 'react'
import { Routes, Route } from 'react-router-dom'







// COMBINED IMPORTS from both branches
import LandingPage from './LandingPage.jsx'

import ProfessionalAppointmentDetailsPage from './professional/appointment-details/AppointmentDetailsPage.jsx'

import PatientAppointmentDetailsPage from './patient/appointment-details/PatientAppointmentDetailsPage.jsx'

import SecureMessagesPage from './patient/messaging/SecureMessagesPage.jsx'

import PatientDashboardPage from './patient/patientdashboard/Dashboard.jsx'

import MyAppointmentsPage from './patient/my-appointments/MyAppointmentsPage.jsx'

import MyRecordTest from './patient/MyRecordTest/MyRecordTest.jsx'

import HealthRecords from './patient/healthrecords/healthrecords.jsx'

import PrescriptionRecords from './patient/prescriptionrecords/prescriptionrecords.jsx'
import ActivityLog from './patient/activitylog/ActivityLog.jsx'

import Recordheader from "./patient/TestResult/result.jsx"; 

function App() {
  return(
    <div>
      <h1>help</h1>
    </div>
  )
 

}

export default App


 //   <Routes>
      

     

  //     {/* --- CORE PUBLIC ROUTE --- */}
  //     <Route path="/" element={<LandingPage />} />
      
  //     {/* This is the route for the professional page */}
  //     <Route
  //       path="/professional/appointment-details/AppointmentDetailsPage"
  //       element={<ProfessionalAppointmentDetailsPage />}
  //     />

  //     {/* --- PATIENT ROUTES --- */}
  //     <Route path="/patient/appointments" element={<MyAppointmentsPage />} />

  //     <Route path="/patient/TestResult/result" element={<Recordheader />} />  

  //     <Route
  //       path="/patient/appointment-details"
  //       element={<PatientAppointmentDetailsPage />}
  //     /> 
      
  //     <Route path="/patient/messages" element={<SecureMessagesPage />} />

  //     <Route path="/patient/dashboard" element={<PatientDashboardPage />} />

  //     <Route
  //       path="/patient/records/test-results" // Using a cleaner URL is a good practice
  //       element={<MyRecordTest />}
  //     />

     

  //     <Route path="/patient/healthrecords" element={<HealthRecords />}/>
      

  //     <Route
  //       path="/patient/prescriptionrecords"
  //       element={<PrescriptionRecords />}
  //     />

  //     {/* Patient - activity route */}
  //     <Route path="/patient/activitylog" element={<ActivityLog />} />
  //   </Routes>
  // )


