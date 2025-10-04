import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null); // ✅ Use null instead of false for cleaner checks

  // ✅ Update User Profile
  // ✅ Update User Profile
const updateUserProfileData = async () => {
  try {
    if (!userData) return;

    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('phone', userData.phone);
    formData.append('address', JSON.stringify(userData.address));
    formData.append('gender', userData.gender);
    formData.append('dob', userData.dob);

    if (image) {
      formData.append('image', image);
    }

    const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Add Bearer here
        'Content-Type': 'multipart/form-data',
      },
    });

    if (data.success) {
      toast.success(data.message);
      await loadUserProfileData(); // Reload profile data after update
      setIsEdit(false);
      setImage(null);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error('Update Profile Error:', error);
    toast.error(error.response?.data?.message || error.message);
  }
};


  // ✅ Handle general field changes
  const handleChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ✅ Handle nested address field changes
  const handleAddressChange = (line, value) => {
    setUserData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [line]: value,
      },
    }));
  };

  // ✅ Don't render if userData is not loaded yet
  if (!userData) return null;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl mb-20">
      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-6">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <div>
                <img
                  className="w-36 h-36 rounded opacity-75 object-cover"
                  src={image ? URL.createObjectURL(image) : userData.image || assets.default_user_icon}
                  alt="Profile Preview"
                />
                {!image && (
                  <img
                    className="w-10 absolute bottom-12 right-12"
                    src={assets.upload_icon}
                    alt="Upload Icon"
                  />
                )}
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </div>
          </label>
        ) : (
          <img
            src={userData.image || assets.default_user_icon}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md"
          />
        )}
      </div>

      {/* Name Section */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium">Full Name:</label>
        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mt-1"
          />
        ) : (
          <p className="mt-1 text-gray-800">{userData.name}</p>
        )}
      </div>

      <hr className="my-4" />

      {/* Email Section */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Email ID:</label>
        {isEdit ? (
          <input
            type="email"
            value={userData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mt-1"
          />
        ) : (
          <a
            href={`mailto:${userData.email}`}
            className="mt-1 text-blue-600 hover:text-blue-800 transition duration-300 underline block"
          >
            {userData.email}
          </a>
        )}
      </div>

      {/* Phone Section */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Phone:</label>
        {isEdit ? (
          <input
            type="text"
            value={userData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mt-1"
          />
        ) : (
          <a
            href={`tel:${userData.phone}`}
            className="mt-1 text-blue-600 hover:text-blue-800 transition duration-300 underline block"
          >
            {userData.phone}
          </a>
        )}
      </div>

      {/* Gender Section */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Gender:</label>
        {isEdit ? (
          <select
            value={userData.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mt-1"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        ) : (
          <p className="mt-1 text-gray-800">{userData.gender}</p>
        )}
      </div>

      {/* DOB Section */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Date of Birth:</label>
        {isEdit ? (
          <input
            type="date"
            value={userData.dob}
            onChange={(e) => handleChange('dob', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mt-1"
          />
        ) : (
          <p className="mt-1 text-gray-800">
            {userData.dob
              ? new Date(userData.dob).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'Not Provided'}
          </p>
        )}
      </div>

      {/* Address Section */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Address:</label>
        {isEdit ? (
          <div className="space-y-2 mt-1">
            <input
              type="text"
              value={userData.address?.line1 || ''}
              onChange={(e) => handleAddressChange('line1', e.target.value)}
              placeholder="Address Line 1"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="text"
              value={userData.address?.line2 || ''}
              onChange={(e) => handleAddressChange('line2', e.target.value)}
              placeholder="Address Line 2"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        ) : (
          <p className="mt-1 text-gray-800">
            {userData.address?.line1 || 'N/A'}
            <br />
            {userData.address?.line2 || ''}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setIsEdit(!isEdit)}
          className={`px-6 py-2 rounded-lg text-white font-medium transition ${
            isEdit ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isEdit ? 'Cancel' : 'Edit'}
        </button>

        {isEdit && (
          <button
            onClick={updateUserProfileData}
            className="px-6 py-2 rounded-lg text-white font-medium transition bg-green-600 hover:bg-green-700"
          >
            Save Information
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
