import React, { useState, useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Image Not Selected");
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", fees);
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      //console log formData
      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      const { data } = await axios.post(
  backendUrl + "/api/admin/add-doctor",
  formData,
  {
    headers: {
      Authorization: `Bearer ${aToken}`, // ✅ Correct way
      "Content-Type": "multipart/form-data",
    },
  }
);


      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [uploadedImage, setUploadedImage] = useState(null);

  // Handle file drop
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      setDocImg(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    multiple: false,
  });

  return (
    <form
      className="max-w-6xl mx-auto mt-20 p-8 bg-white shadow-lg rounded-xl space-y-8"
      onSubmit={onSubmitHandler}
    >
      <h2 className="text-3xl font-semibold text-gray-800 border-b pb-3">
        Add Doctor
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Upload Section */}
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer transition
            ${
              isDragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-blue-500 hover:bg-gray-50"
            }`}
        >
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            {...getInputProps()}
          />
          {uploadedImage ? (
            <img
              src={uploadedImage}
              alt="Uploaded Doctor"
              className="w-32 h-32 object-cover rounded-full mb-3 shadow"
            />
          ) : (
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload Icon"
              className="w-16 h-16 mb-3 opacity-80"
            />
          )}
          <p className="text-gray-600 text-sm">
            {isDragActive
              ? "Drop the image here..."
              : "Drag & Drop or Click to Upload"}
          </p>
          <p className="text-gray-400 text-xs">
            Only JPEG, JPG, PNG files allowed
          </p>
        </div>

        {/* Doctor Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Doctor Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Enter doctor's name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Doctor Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter doctor's email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter password"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Experience
            </label>
            <select
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Experience</option>
              {[...Array(10)].map((_, i) => (
                <option key={i} value={`${i + 1} Year`}>
                  {i + 1} Year{i > 0 ? "s" : ""}
                </option>
              ))}
              <option value="10+ Years">10+ Years</option>
            </select>
          </div>
        </div>
      </div>

      {/* Fees, Speciality, Education */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Consultation Fees
          </label>
          <input
            onChange={(e) => setFees(e.target.value)}
            value={fees}
            type="number"
            placeholder="Enter fees"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Speciality
          </label>
          <select
            onChange={(e) => setSpeciality(e.target.value)}
            value={speciality}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Speciality</option>
            <option value="General Physician">General Physician</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Orthopedic">Orthopedic</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Gynaecologist">Gynaecologist</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Education
          </label>
          <input
            onChange={(e) => setDegree(e.target.value)}
            value={degree}
            type="text"
            placeholder="e.g. MBBS, MD, MS"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Address Section */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Address</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            onChange={(e) => setAddress1(e.target.value)}
            value={address1}
            type="text"
            placeholder="Address Line 1"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            onChange={(e) => setAddress2(e.target.value)}
            value={address2}
            type="text"
            placeholder="Address Line 2"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* About Doctor */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          About Doctor
        </label>
        <textarea
          onChange={(e) => setAbout(e.target.value)}
          value={about}
          placeholder="Write about the doctor..."
          rows={4}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
