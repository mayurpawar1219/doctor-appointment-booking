import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '');
  const [dToken, setDToken] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData,setDashData] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch all doctors
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/all-doctors`,
        {
          headers: {
            Authorization: `Bearer ${aToken}`, // ✅ FIXED
          },
        }
      );

      if (data.success) {
        setDoctors(data.doctors);
        console.log("Doctors fetched successfully:", data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const changeAvailability = async (docId) => {
      try{
          const { data } = await axios.post(backendUrl + '/api/admin/change-availability',{docId},{
          headers: {
            Authorization: `Bearer ${aToken}`, // ✅ FIXED
          },
        });
        if(data.success){
            toast.success(data.message)
            getAllDoctors()
        }else{
          toast.error(data.message)
        }
      }catch(error){
        toast.error(error.message)
      }
  }

  const getAllAppointments = async () => {
    try{
      const { data } = await axios.get(backendUrl + '/api/admin/appointments',{headers:{Authorization: `Bearer ${aToken}`}})
      if(data.success){
        setAppointments(data.appointments)
        
      }else{
        toast.error(data.message)
      }

    }catch(error){
      toast.error(error.message)

    }
  }

  const cancelAppointment = async (appointmentId) => {
    try{
      const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment',{appointmentId},{headers:{Authorization: `Bearer ${aToken}`}})
      if(data.success){
        toast.success(data.message)
        getAllAppointments()
      }else{
        toast.error(data.message)
      }

    }catch(error){
      toast.error(error.message)
    }
  }

  const getDashData = async () => {
    try{
      const { data } = await axios.get(backendUrl + '/api/admin/dashboard',{headers:{Authorization: `Bearer ${aToken}`}})
      if(data.success){
        setDashData(data.dashData)
        console.log("Dashboard data fetched successfully:", data.dashData);
      }else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error(error.message)

    }
  }

  const value = { aToken, setAToken, dToken, setDToken, backendUrl, doctors, getAllDoctors,changeAvailability, appointments, setAppointments,getAllAppointments , cancelAppointment,dashData, getDashData };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
