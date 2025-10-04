// frontend/src/pages/MyAppointments.jsx
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const location = useLocation();

  const slotDateFormat = (slotDate) => {
    if (!slotDate) return "";
    const [day, month, year] = slotDate.split("_");
    const months = [
      "",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${day} ${months[Number(month)]}, ${year}`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message || "Failed to fetch appointments");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handlePayment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/make-payment`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` }}
      );

      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.message || "Payment failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token]);

  useEffect(() => {
    if (location.state?.refresh) getUserAppointments();
  }, [location.state]);

  return (
    <div className="pb-10">
      <p className="text-2xl font-bold mb-6 text-gray-800">My Appointments</p>

      {appointments.length === 0 ? (
        <p className="text-gray-500">You have no appointments yet.</p>
      ) : (
        <div>
          {appointments.map((item, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow-md mb-6 bg-white"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.docData.image || "/placeholder.png"}
                  alt={item.docData.name}
                  className="w-20 h-20 object-cover rounded-full border border-gray-300"
                />
                <div>
                  <p className="font-bold text-lg">{item.docData.name}</p>
                  <p className="text-gray-600">{item.docData.speciality}</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="mt-2 font-medium">Address:</p>
                <p>{item.docData.address.line1}</p>
                <p>{item.docData.address.line2}</p>
                <p className="mt-2">
                  <span className="font-semibold">Date & Time: </span>
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
                <p className="mt-2">
                  <span className="font-semibold">Amount: </span>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(item.amount)}
                </p>
              </div>

              {/* ✅ Buttons Section */}
              <div className="mt-6 flex gap-4">
                {item.cancelled ? (
                  <button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg">
                    Appointment Cancelled
                  </button>
                ) : item.isCompleted ? (
                  <button className="px-4 py-2 border border-gray-500 text-gray-700 rounded-lg bg-gray-100">
                    Completed
                  </button>
                ) : item.paymentStatus === "paid" ? (
                  <>
                    <button className="px-4 py-2 border border-green-500 text-green-500 rounded-lg">
                      Paid
                    </button>
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Cancel Appointment
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handlePayment(item._id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      Pay Online
                    </button>
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Cancel Appointment
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
