import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency, userData } = useContext(AppContext);

  useEffect(() => {
    if (aToken) getAllAppointments();
  }, [aToken]);

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fee</p>
          <p>Actions</p>
        </div>

        {appointments.map((item, index) => {
          // ✅ Use latest userData if available, fallback to appointment snapshot
          const user = userData && userData._id === item.userData?._id ? userData : item.userData || {};
          const doctor = item.docData || {};

          const userAge = user.dob && !isNaN(new Date(user.dob).getTime())
            ? calculateAge(user.dob)
            : '-';

          return (
            <div
              className='flex flex-wrap justify-between max-sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'
              key={item._id}
            >
              <p className='max-sm:hidden'>{index + 1}</p>

              {/* Patient */}
              <div className='flex items-center gap-2'>
                <img
                  src={user.image || "/placeholder.png"}
                  alt={user.name || "User"}
                  className='w-10 h-10 object-cover rounded-full bg-gray-200'
                />
                <p>{user.name || "-"}</p>
              </div>

              {/* Age */}
              <p className='max-sm:hidden'>{userAge}</p>

              {/* Date & Time */}
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

              {/* Doctor */}
              <div className='flex items-center gap-2'>
                <img
                  src={doctor.image || "/placeholder.png"}
                  alt={doctor.name || "Doctor"}
                  className='w-10 h-10 object-cover rounded-full bg-gray-200'
                />
                <p>{doctor.name || "-"}</p>
              </div>

              {/* Fee */}
              <p>{currency}{item.amount ?? '-'}</p>

              {/* Actions */}
              <div className='flex items-center gap-2'>
                {item.cancelled ? (
                  <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                ) : item.isCompleted ? (
                  <p className='text-green-400 text-xs font-medium'>Completed</p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className='w-10 cursor-pointer'
                    src={assets.cancel_icon}
                    alt='cancel'
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllAppointments;
