import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import "./RelatedDoctors.css";

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDocs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDocs(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="top-doctors-container">
      {/* Heading */}
      <h1 className="top-doctors-title">Top Doctors to Book</h1>
      <p className="top-doctors-subtitle">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Doctors Grid */}
      <div className="doctors-grid">
        {relDoc.slice(0, 5).map((item, index) => (
          <div
            key={index}
            onClick={() => { if(item.available) { navigate(`/appointment/${item._id}`); scrollTo(0,0) } }}
            className={`doctor-card ${index < 5 ? "highlight-border" : ""} ${!item.available ? "unavailable-card" : ""}`}
          >
            <img src={item.image} alt={item.name} className="doctor-image" />
            <div className={`availability ${item.available ? "available" : "unavailable"}`}>
              <span className="dot"></span> {item.available ? "Available" : "Unavailable"}
            </div>
            <p className="doctor-name">{item.name}</p>
            <p className="doctor-speciality">{item.speciality}</p>
          </div>
        ))}
      </div>

      {/* More Button */}
      <div className="more-btn-wrapper">
        <button onClick={()=>{navigate('/doctors'); scrollTo(0,0) }} className="more-btn">more</button>
      </div>
    </div>
  );
};

export default RelatedDoctors;
