import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center my-10">
      <div className="w-[92%] max-w-[1200px] bg-[#5a6ff0] rounded-2xl px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between shadow-md relative">
        
        {/* Left Content */}
        <div className="text-center md:text-left max-w-[550px] z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-snug">
            Book Appointment
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-6 leading-snug">
            With 100+ Trusted Doctors
          </h2>
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-gray-800 rounded-full px-8 py-3 text-lg md:text-xl font-medium hover:bg-gray-100 transition-all duration-300 shadow-md"
          >
            Create account
          </button>
        </div>

        {/* Right Image */}
        <div className="mt-6 md:mt-0 md:ml-10 flex justify-center">
          <img
            src={assets.appointment_img}
            alt="Doctor"
            className="w-[300px] md:w-[360px] lg:w-[400px] object-contain -mt-12 drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
