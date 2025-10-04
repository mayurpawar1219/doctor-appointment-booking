import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';

// ========================== ADD DOCTOR ==========================
const addDoctor = async (req, res) => {
  try {
    console.log("Incoming Request Body:", req.body);  
    console.log("Incoming File:", req.file);          

    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fee,
      address
    } = req.body;

    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fee || !address) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" });
    }

    if (isNaN(fee) || Number(fee) <= 0) {
      console.log("Invalid Fee Value:", fee); 
      return res.json({ success: false, message: "Doctor fee is missing or invalid" });
    }

    let parsedAddress;
    try {
      parsedAddress = typeof address === 'string' ? JSON.parse(address) : address;
    } catch (err) {
      return res.json({ success: false, message: "Invalid address format" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (!req.file) {
      return res.json({ success: false, message: "Profile image is required" });
    }

    const imageUpload = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
    });

    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience: Number(experience),
      about,
      fee: Number(fee),
      image: imageUrl,
      address: parsedAddress,
      available: true,
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor added successfully", doctor: newDoctor });
  } catch (error) {
    console.error("Add Doctor Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// ========================== ADMIN LOGIN ==========================
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Admin Login Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// ========================== GET ALL DOCTORS ==========================
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select('-password');
    res.json({ success: true, doctors });
  } catch (error) {
    console.error("Fetch Doctors Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// ========================== GET ALL APPOINTMENTS ==========================
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({}).sort({ date: -1 });
    // userData and docData already exist in each appointment
    res.json({ success: true, appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// ========================== CANCEL APPOINTMENT ==========================
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked || {};
    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    return res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error("Cancel Appointment Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
  try{
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments : appointments.reverse().slice(0, 5)
    }

    res.json({ success: true,dashData });

  }catch(error){
    console.error("Admin Dashboard Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }

}





// ✅ Single clean export
export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel , adminDashboard };
