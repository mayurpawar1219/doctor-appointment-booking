import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './Doctors.css';

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);

  const specialities = [
    'All Doctors',
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist',
  ];

  const applyFilter = () => {
    if (!speciality || speciality.toLowerCase() === 'all doctors') {
      setFilterDoc(doctors);
    } else {
      setFilterDoc(
        doctors.filter(
          (doc) => doc.speciality.toLowerCase() === speciality.toLowerCase()
        )
      );
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="doctors-page p-4">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Browse through the doctors specialist
      </h1>

      {/* Filter Button */}
      <div className="mb-4">
        <button
          className={`py-2 px-4 border rounded-lg text-sm font-medium transition-all shadow-sm ${
            showFilter ? 'bg-[#5f6FFF] text-white' : 'bg-gray-100 text-gray-800'
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
      </div>

      {/* Speciality Buttons */}
      {showFilter && (
        <div className="speciality-buttons flex flex-wrap gap-2 mb-6">
          {specialities.map((spec, index) => (
            <button
              key={index}
              className={`py-1 px-3 rounded-full border text-sm font-medium transition-all ${
                speciality === spec || (!speciality && spec === 'All Doctors')
                  ? 'bg-[#5f6FFF] text-white'
                  : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
              }`}
              onClick={() =>
                navigate(
                  `/doctors/${encodeURIComponent(
                    spec === 'All Doctors' ? '' : spec
                  )}`
                )
              }
            >
              {spec}
            </button>
          ))}
        </div>
      )}

      {/* Doctors Grid */}
      <div className="doctors-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filterDoc.length === 0 ? (
          <p className="no-doctors text-gray-500 col-span-full text-center">
            No doctors found for this speciality.
          </p>
        ) : (
          filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => { if(item.available) navigate(`/appointment/${item._id}`); }}
              className={`doctor-card border rounded-xl p-4 text-center shadow-sm transition-all hover:shadow-md ${
                index < 5 ? 'border-[#5f6FFF]' : 'border-gray-200'
              } ${!item.available ? 'unavailable-card' : ''}`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="doctor-image w-24 h-24 mx-auto rounded-full object-cover mb-3"
              />
              <div className={`availability ${item.available ? "available" : "unavailable"}`}>
                <span className="dot"></span> {item.available ? "Available" : "Unavailable"}
              </div>
              <p className="doctor-name text-lg font-semibold text-gray-800">{item.name}</p>
              <p className="doctor-speciality text-sm text-gray-600">{item.speciality}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Doctors;
