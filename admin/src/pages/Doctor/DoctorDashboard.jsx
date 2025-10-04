import React, { useEffect, useContext, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { slotDateFormat } = useContext(AppContext);
  const [animatingIds, setAnimatingIds] = useState([]);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  if (!dashData) return null;

  const handleCancel = async (id) => {
    setAnimatingIds((prev) => [...prev, id]);
    await cancelAppointment(id);
    await getDashData();
    setAnimatingIds((prev) => prev.filter((a) => a !== id));
  };

  const handleComplete = async (id) => {
    setAnimatingIds((prev) => [...prev, id]);
    await completeAppointment(id);
    await getDashData();
    setAnimatingIds((prev) => prev.filter((a) => a !== id));
  };

  return (
    <div className="m-5">
      {/* Stats Cards */}
      <div className="flex flex-wrap gap-6">
        {[
          { icon: assets.appointments_icon, label: "Appointments", value: dashData.appointments || 0 },
          { icon: assets.patients_icon, label: "Patients", value: dashData.patients || 0 },
          { icon: assets.earning_icon, label: "Earnings", value: `$${dashData.earnings || 0}` },
        ].map((card, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-white p-4 w-[220px] rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform"
          >
            <img className="w-12 h-12" src={card.icon} alt={card.label} />
            <div>
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-gray-500">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Appointments */}
      <div className="bg-white mt-10 rounded-lg shadow-md">
        <div className="flex items-center gap-2 px-5 py-3 border-b">
          <img src={assets.list_icon} alt="Latest Appointments" />
          <p className="font-semibold text-gray-700 text-lg">Latest Appointments</p>
        </div>

        <div className="divide-y">
          {dashData.latestAppointments.length ? (
            dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors`}
              >
                <img
                  className="rounded-full w-12 h-12 object-cover"
                  src={item.userData?.image || assets.doctor_icon}
                  alt={item.userData?.name || "Patient"}
                />
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">{item.userData?.name || "Unknown"}</p>
                  <p className="text-gray-500 text-sm">
                    Booking on {slotDateFormat(item.slotDate)} at {item.slotTime}
                  </p>
                </div>

                {/* Status / Actions */}
                {item.cancelled ? (
                  <p className="text-red-500 font-semibold text-sm transition-colors duration-500">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-600 font-semibold text-sm transition-colors duration-500">Completed</p>
                ) : (
                  <div className="flex gap-2">
                    <img
                      onClick={() => handleCancel(item._id)}
                      src={assets.cancel_icon}
                      alt="Cancel"
                      className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                    />
                    <img
                      onClick={() => handleComplete(item._id)}
                      src={assets.tick_icon}
                      alt="Complete"
                      className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center py-5">No recent appointments</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
