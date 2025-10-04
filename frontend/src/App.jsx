import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Importing all pages correctly
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Doctors from './pages/Doctors.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import MyProfile from './pages/MyProfile.jsx';
import MyAppointments from './pages/MyAppointments.jsx';
import Appointment from './pages/Appointment.jsx';
import PaymentSuccess from './pages/PaymentSuccess.jsx';  // <-- Added here
import Navbar from './components/navbar.jsx';
import Footer from './components/Footer.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        
        {/* ✅ Added PaymentSuccess route */}
        <Route path='/payment-success' element={<PaymentSuccess />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
