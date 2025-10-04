// frontend/src/pages/DoctorProfile.jsx
import React, { useEffect, useContext, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, getProfileData, profileData, setProfiledata, backendUrl } =
    useContext(DoctorContext);

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    if (!isEdit) {
      setIsEdit(true);
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        {
          name: profileData.name,
          speciality: profileData.speciality,
          degree: profileData.degree,
          experience: profileData.experience,
          about: profileData.about,
          fee: profileData.fee,
          address: profileData.address,
          available: profileData.available,
        },
        {
          headers: { Authorization: `Bearer ${dToken}` },
        }
      );

      if (data.success) {
        toast.success(data.message || "Profile updated successfully");
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);

  if (!profileData) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row gap-6">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={profileData.image || "/default-profile.png"}
            alt={profileData.name}
            className="w-40 h-40 rounded-full object-cover border-4 border-indigo-500"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 flex flex-col justify-between">
          {/* Name */}
          <div>
            {isEdit ? (
              <input
                type="text"
                value={profileData.name}
                onChange={(e) =>
                  setProfiledata((prev) => ({ ...prev, name: e.target.value }))
                }
                className="border rounded px-2 py-1 w-full text-2xl font-bold text-gray-800"
              />
            ) : (
              <h1 className="text-3xl font-bold text-gray-800">
                {profileData.name}
              </h1>
            )}

            {/* Degree + Speciality */}
            <p className="text-gray-600 mt-1">
              {isEdit ? (
                <>
                  <input
                    type="text"
                    value={profileData.degree}
                    onChange={(e) =>
                      setProfiledata((prev) => ({
                        ...prev,
                        degree: e.target.value,
                      }))
                    }
                    className="border rounded px-2 py-1 mr-2"
                  />
                  <input
                    type="text"
                    value={profileData.speciality}
                    onChange={(e) =>
                      setProfiledata((prev) => ({
                        ...prev,
                        speciality: e.target.value,
                      }))
                    }
                    className="border rounded px-2 py-1"
                  />
                </>
              ) : (
                `${profileData.degree} - ${profileData.speciality}`
              )}
            </p>
          </div>

          {/* Experience */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700">Experience</h2>
            {isEdit ? (
              <input
                type="number"
                value={profileData.experience}
                onChange={(e) =>
                  setProfiledata((prev) => ({
                    ...prev,
                    experience: e.target.value,
                  }))
                }
                className="border rounded px-2 py-1 w-28"
              />
            ) : (
              <p className="text-gray-600 mt-1">
                {profileData.experience} yrs
              </p>
            )}
          </div>

          {/* About */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700">About</h2>
            {isEdit ? (
              <textarea
                value={profileData.about}
                onChange={(e) =>
                  setProfiledata((prev) => ({ ...prev, about: e.target.value }))
                }
                className="border rounded px-2 py-1 w-full"
              />
            ) : (
              <p className="text-gray-600 mt-1 leading-relaxed">
                {profileData.about}
              </p>
            )}
          </div>

          {/* Appointment Fee */}
          <div className="mt-4">
            <p className="text-gray-700 font-semibold">
              Appointment Fee:{" "}
              <span className="text-indigo-600">
                {isEdit ? (
                  <input
                    type="number"
                    value={profileData.fee}
                    onChange={(e) =>
                      setProfiledata((prev) => ({
                        ...prev,
                        fee: e.target.value,
                      }))
                    }
                    className="border rounded px-2 py-1 w-24"
                  />
                ) : (
                  `$${profileData.fee}`
                )}
              </span>
            </p>
          </div>

          {/* Address */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700">Address</h2>
            {isEdit ? (
              <>
                <input
                  type="text"
                  value={profileData.address?.line1 || ""}
                  onChange={(e) =>
                    setProfiledata((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  className="border rounded px-2 py-1 w-full mb-1"
                />
                <input
                  type="text"
                  value={profileData.address?.line2 || ""}
                  onChange={(e) =>
                    setProfiledata((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  className="border rounded px-2 py-1 w-full"
                />
              </>
            ) : (
              <p className="text-gray-600 mt-1 leading-relaxed">
                {profileData.address?.line1 || "N/A"}
                <br />
                {profileData.address?.line2 || ""}
              </p>
            )}
          </div>

          {/* Availability */}
          <div className="mt-4 flex items-center gap-2">
            <input
              type="checkbox"
              checked={profileData.available}
              disabled={!isEdit}
              onChange={(e) =>
                setProfiledata((prev) => ({
                  ...prev,
                  available: e.target.checked,
                }))
              }
              className="w-5 h-5 accent-indigo-500"
            />
            <label className="text-gray-700 font-medium">Available</label>
          </div>

          {/* Edit / Save Button */}
          <div className="mt-6">
            <button
              onClick={updateProfile}
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all"
            >
              {isEdit ? "Save" : "Edit Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
