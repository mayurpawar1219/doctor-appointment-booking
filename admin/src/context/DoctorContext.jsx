// frontend/src/context/DoctorContext.jsx
import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Use empty string '' as default so header won't become "Bearer false"
  const [dToken, setDTokenState] = useState(
    localStorage.getItem("dToken") || ""
  );
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfiledata] = useState(false);

  // helper to set token both in state and localStorage
  const saveDoctorToken = (token) => {
    if (!token) {
      localStorage.removeItem("dToken");
      setDTokenState("");
      console.log("Doctor token cleared");
      return;
    }
    localStorage.setItem("dToken", token);
    setDTokenState(token);
    console.log("Doctor token saved:", token);
  };

  const getAppointments = async () => {
    try {
      if (!dToken) {
        console.warn("getAppointments called without token");
        return;
      }

      console.log("Fetching appointments with token:", dToken);

      const { data } = await axios.get(
        `${backendUrl}/api/doctor/appointments`,
        {
          headers: { Authorization: `Bearer ${dToken}` },
        }
      );

      console.log("Doctor appointments response:", data);

      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message || "Failed to fetch appointments");
      }
    } catch (error) {
      console.error(
        "Error fetching appointments:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${dToken}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(
        "Complete Appointment Error:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${dToken}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(
        "Cancel Appointment Error:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || error.message);
    }
  };


  const getDashData = async () => {
    try{
      const { data } = await axios.get(backendUrl + '/api/doctor/dashboard',{headers:{Authorization: `Bearer ${dToken}`}})
      if(data.success){
        setDashData(data.dashData)
        console.log("Dashboard data fetched successfully:", data.dashData);
      }else{
        toast.error(data.message)
      }

    }catch(error){
      console.error(error)
      toast.error(error.message)

    }
  }

  const getProfileData = async () => {
    try{
      const { data } = await axios.get(backendUrl + '/api/doctor/profile',{headers:{Authorization: `Bearer ${dToken}`}})
      if(data.success){
        setProfiledata(data.profileData)
        console.log("Profile data fetched successfully:", data.profileData);
      }else{
        toast.error(data.message)
      }

    }catch(error){
      console.error(error)
      toast.error(error.message)

    }

  }

  const value = {
    dToken,
    setDToken: saveDoctorToken, // expose setter that also writes storage
    backendUrl,
    getAppointments,
    appointments,
    setAppointments,
    saveDoctorToken,
    completeAppointment,
    cancelAppointment,
    getDashData,
    dashData,
    setDashData,
    getProfileData,
    profileData,
    setProfiledata,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
