// frontend/src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Admin"); // Admin or Doctor
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const endpoint = state === "Admin" ? "/api/admin/login" : "/api/doctor/login";
      const { data } = await axios.post(backendUrl + endpoint, { email, password });

      if (data.success) {
        if (state === "Admin") {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
        } else {
          // doctor
          setDToken(data.token); // this function saves to localStorage as well (DoctorContext)
        }

        // Log token for debugging
        console.log(`${state} Token:`, data.token);

        toast.success(`${state} logged in successfully!`);

        // Redirect to home/dashboard after login
        if (state === "Admin") navigate("/admin-dashboard");
        else navigate("/doctor-dashboard");
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-[#5F6fff]">{state}</span> Login
        </p>

        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-[#5F6fff] text-white w-full py-2 rounded-md text-base ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#4e5ae6]"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm mt-2">
          {state === "Admin" ? "Doctor Login?" : "Admin Login?"}{" "}
          <span
            className="text-[#5F6fff] underline cursor-pointer"
            onClick={() => setState(state === "Admin" ? "Doctor" : "Admin")}
          >
            Click here
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
