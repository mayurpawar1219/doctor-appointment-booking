import React, { useContext } from "react";
import "./TopDoctors.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="top-doctors-container">
      {/* Heading */}
      <h1 className="top-doctors-title">Top Doctors to Book</h1>
      <p className="top-doctors-subtitle">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Doctors Grid */}
      <div className="doctors-grid">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => navigate(`/appointment/${item._id}`)}
            key={index}
            className={`doctor-card ${index < 5 ? "highlight-border" : ""}`}
          >
            <img src={item.image} alt={item.name} className="doctor-image" />
            <div
              className={`availability ${item.available ? "available" : "unavailable"}`}
            >
              <span className="dot"></span>
              {item.available ? "Available" : "Unavailable"}
            </div>
            <p className="doctor-name">{item.name}</p>
            <p className="doctor-speciality">{item.speciality}</p>
          </div>
        ))}
      </div>

      {/* More Button */}
      <div className="more-btn-wrapper">
        <button
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="more-btn"
        >
          more
        </button>
      </div>
    </div>
  );
};

export default TopDoctors;
