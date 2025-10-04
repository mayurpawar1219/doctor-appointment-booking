import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="py-12 text-center">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Find by Speciality</h1>
      <p className="text-gray-600 mb-8 max-w-xl mx-auto">
        Simply browse through our extensive list of trusted doctors,
        schedule your appointment hassle-free.
      </p>

      {/* Specialities Grid */}
      <div className="flex flex-wrap justify-center gap-8">
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${encodeURIComponent(item.speciality)}`} // ✅ Correct dynamic path
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-100 shadow-md">
              <img src={item.image} alt={item.speciality} className="w-14 h-14" />
            </div>
            <p className="mt-3 text-sm font-medium text-gray-800">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
