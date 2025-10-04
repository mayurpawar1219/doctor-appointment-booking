import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  const handleScroll = (e) => {
    e.preventDefault();
    const section = document.getElementById('speciality');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#5f6FFF] rounded-xl px-6 md:px-12 lg:px-16 py-10 flex flex-col md:flex-row items-center justify-between text-white">
      
      {/* LEFT SECTION */}
      <div className="text-center md:text-left md:w-1/2">
        {/* Heading */}
        <p className="text-3xl md:text-5xl font-bold leading-snug mb-4">
          Book Appointment <br /> With Trusted Doctors
        </p>

        {/* Group of profiles + Description */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-6">
          <img 
            src={assets.group_profiles} 
            alt="group_profiles" 
            className="w-24 h-12 object-contain"
          />
          <p className="text-sm text-gray-100 max-w-sm">
            Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free.
          </p>
        </div>

        {/* Book Appointment Button */}
        <button
          onClick={handleScroll}
          className="inline-flex items-center gap-2 bg-white text-[#5f6FFF] font-medium px-6 py-3 rounded-full hover:bg-gray-100 transition"
        >
          Book appointment
          <img 
            src={assets.arrow_icon} 
            alt="arrow_icon" 
            className="w-4 h-4"
          />
        </button>
      </div>

      {/* RIGHT SECTION - Doctors Image */}
      <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
        <img 
          src={assets.header_img} 
          alt="Doctors" 
          className="max-w-xs md:max-w-md lg:max-w-lg object-contain"
        />
      </div>
    </div>
  );
};

export default Header;
