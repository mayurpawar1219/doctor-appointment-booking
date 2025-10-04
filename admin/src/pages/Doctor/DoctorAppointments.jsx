import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import clsx from "clsx"; // optional helper for conditional classNames

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  const [animatingIds, setAnimatingIds] = useState([]); // for animation tracking

  useEffect(() => {
    if (dToken) getAppointments();
  }, [dToken]);

  // Animate status change
  const handleComplete = async (id) => {
    setAnimatingIds((prev) => [...prev, id]);
    await completeAppointment(id);
    setAnimatingIds((prev) => prev.filter((a) => a !== id));
  };

  const handleCancel = async (id) => {
    setAnimatingIds((prev) => [...prev, id]);
    await cancelAppointment(id);
    setAnimatingIds((prev) => prev.filter((a) => a !== id));
  };

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-5 text-2xl font-semibold text-gray-700">All Appointments</p>

      <div className="space-y-4">
        {appointments.reverse().map((item, index) => {
          const isAnimating = animatingIds.includes(item._id);

          return (
            <div
              key={index}
              className={clsx(
                "bg-white shadow-sm rounded-lg p-4 transition-shadow duration-200 hover:shadow-md",
                "overflow-hidden",
                isAnimating ? "animate-pulse" : ""
              )}
            >
              {/* Desktop grid */}
              <div className="hidden md:grid md:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] md:items-center md:gap-4">
                <p className="font-medium text-gray-700">{index + 1}</p>

                <div className="flex items-center gap-3">
                  <img
                    src={item.userData.image}
                    alt={item.userData.name}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                  <p className="text-gray-800 font-medium">{item.userData.name}</p>
                </div>

                <p
                  className={`text-sm font-semibold px-2 py-1 rounded-full text-white text-center
                    ${item.payment ? "bg-green-500" : "bg-blue-500"}`}
                >
                  {item.payment ? "Online" : "Cash"}
                </p>

                <p className="text-gray-600">{calculateAge(item.userData.dob)}</p>
                <p className="text-gray-600">
                  {slotDateFormat(item.slotDate)}, {item.slotTime}
                </p>
                <p className="text-gray-700 font-semibold">
                  {currency}
                  {item.amount}
                </p>

                {item.cancelled ? (
                  <p className="text-red-500 font-semibold transition-colors duration-500">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-600 font-semibold transition-colors duration-500">Completed</p>
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
                      alt="Confirm"
                      className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                    />
                  </div>
                )}
              </div>

              {/* Mobile view */}
              <div className="md:hidden space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-700">Patient</p>
                  <div className="flex items-center gap-2">
                    <img
                      src={item.userData.image}
                      alt={item.userData.name}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    />
                    <p className="text-gray-800 font-medium">{item.userData.name}</p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <p className="text-gray-600">Payment</p>
                  <p
                    className={`text-sm font-semibold px-2 py-1 rounded-full text-white
                    ${item.payment ? "bg-green-500" : "bg-blue-500"}`}
                  >
                    {item.payment ? "Online" : "Cash"}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-gray-600">Age</p>
                  <p className="text-gray-700">{calculateAge(item.userData.dob)}</p>
                </div>

                <div className="flex justify-between">
                  <p className="text-gray-600">Date & Time</p>
                  <p className="text-gray-700">{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                </div>

                <div className="flex justify-between">
                  <p className="text-gray-600">Fees</p>
                  <p className="text-gray-700 font-semibold">{currency}{item.amount}</p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Status / Action</p>
                  {item.cancelled ? (
                    <p className="text-red-500 font-semibold transition-colors duration-500">Cancelled</p>
                  ) : item.isCompleted ? (
                    <p className="text-green-600 font-semibold transition-colors duration-500">Completed</p>
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
                        alt="Confirm"
                        className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DoctorAppointments;
