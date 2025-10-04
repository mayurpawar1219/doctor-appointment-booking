import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from './context/AdminContext'
import { DoctorContext } from './context/DoctorContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes, Navigate } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard'
import AllAppointments from './pages/Admin/AllAppointments'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorsList from './pages/Admin/DoctorsList'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorProfile from './pages/Doctor/DoctorProfile'

const App = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)  // ✅ FIX: get doctor token from DoctorContext

  // If logged in as Admin or Doctor → show app
  return aToken || dToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* Default redirect to dashboard/home */}
          <Route path="/" element={<Navigate to="/admin-dashboard" />} />
          
          {/* Admin routes */}
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllAppointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorsList />} />

          {/* Later we can add Doctor routes here */}
          <Route path = '/doctor-dashboard' element={<DoctorDashboard />} />
          <Route path = '/doctor-appointments' element={<DoctorAppointments />} />
          <Route path = '/doctor-profile' element={<DoctorProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App


