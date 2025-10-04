import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)

  return (
    <div className='min-h-screen bg-white border-r w-56 md:w-64 lg:w-72 shadow-lg'>
      {aToken && (
        <ul className='text-[#515151] mt-5 space-y-3'>
          {/* Dashboard */}
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200
               cursor-pointer text-base font-medium
               ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-primary' : 'hover:bg-gray-100'}`
            }
            to={'/admin-dashboard'}
          >
            <img src={assets.home_icon} alt="Dashboard Icon" className='w-5 h-5' />
            <p>Dashboard</p>
          </NavLink>

          {/* Appointments */}
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200
               cursor-pointer text-base font-medium
               ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-primary' : 'hover:bg-gray-100'}`
            }
            to={'/all-appointments'}
          >
            <img src={assets.appointment_icon} alt="Appointments Icon" className='w-5 h-5' />
            <p>Appointments</p>
          </NavLink>

          {/* Add Doctor */}
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200
               cursor-pointer text-base font-medium
               ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-primary' : 'hover:bg-gray-100'}`
            }
            to={'/add-doctor'}
          >
            <img src={assets.add_icon} alt="Add Doctor Icon" className='w-5 h-5' />
            <p>Add Doctor</p>
          </NavLink>

          {/* Doctors List */}
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200
               cursor-pointer text-base font-medium
               ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-primary' : 'hover:bg-gray-100'}`
            }
            to={'/doctor-list'}
          >
            <img src={assets.people_icon} alt="Doctors List Icon" className='w-5 h-5' />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      )}   


      {dToken && (
        <ul className='text-[#515151] mt-5 space-y-3'>
          {/* Dashboard */}
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200
               cursor-pointer text-base font-medium
               ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-primary' : 'hover:bg-gray-100'}`
            }
            to={'/doctor-dashboard'}
          >
            <img src={assets.home_icon} alt="Dashboard Icon" className='w-5 h-5' />
            <p>Dashboard</p>
          </NavLink>

          {/* Appointments */}
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200
               cursor-pointer text-base font-medium
               ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-primary' : 'hover:bg-gray-100'}`
            }
            to={'/doctor-appointments'}
          >
            <img src={assets.appointment_icon} alt="Appointments Icon" className='w-5 h-5' />
            <p>Appointments</p>
          </NavLink>

          

          {/* Doctors List */}
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200
               cursor-pointer text-base font-medium
               ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-primary' : 'hover:bg-gray-100'}`
            }
            to={'/doctor-profile'}
          >
            <img src={assets.people_icon} alt="Doctors List Icon" className='w-5 h-5' />
            <p>Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  )
}

export default Sidebar
