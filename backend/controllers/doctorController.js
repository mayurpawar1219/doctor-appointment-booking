// backend/controllers/doctorController.js
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

/**
 * Toggle doctor availability
 */
const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availability Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

/**
 * List doctors
 */
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

/**
 * Doctor login — returns JWT with doctor id
 */
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: "Doctor does not exist" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // include doctor id in token
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      success: true,
      token,
      doctor: { id: doctor._id, name: doctor.name },
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

/**
 * Get doctor's appointments (the middleware attaches doctor id as req.doctorId)
 */
const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.doctorId || req.body.docId;
    if (!docId) {
      return res
        .status(400)
        .json({ success: false, message: "Doctor ID missing" });
    }
    const appointments = await appointmentModel
      .find({ docId })
      .sort({ date: -1 });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// appointmentCancel
const appointmentCancel = async (req, res) => {
  try {
    const docId = req.doctorId; // <- use decoded token
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId.toString() === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      res.json({ success: true, message: "Appointment Cancelled" });
    } else {
      res.json({
        success: false,
        message: "Invalid Doctor ID or Appointment ID",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// appointmentComplete
const appointmentComplete = async (req, res) => {
  try {
    const docId = req.doctorId; // <- use decoded token
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId.toString() === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      res.json({ success: true, message: "Appointment marked as completed" });
    } else {
      res.json({
        success: false,
        message: "Invalid Doctor ID or Appointment ID",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
  try {
    const docId = req.doctorId; // <- fix: use token decoded ID directly

    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;
    appointments.forEach((item) => {
      if (item.isCompleted || item.payment) earnings += item.amount;
    });

    // get unique patients
    const patients = [...new Set(appointments.map((item) => item.userId))];

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.slice(-5).reverse(),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get doctor profile for Doctor panel
const doctorProfile = async (req, res) => {
  try {
    const docId = req.doctorId;

    const profileData = await doctorModel.findById(docId).select(["-password"]);

    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to update doctor profile for Doctor panel
// backend/controllers/doctorController.js

const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.doctorId;  // get from token, not req.body

    const {
      name,
      speciality,
      degree,
      experience,
      about,
      fee,       // frontend sends "fee"
      address,
      available,
    } = req.body;

    await doctorModel.findByIdAndUpdate(
      docId,
      {
        ...(name && { name }),
        ...(speciality && { speciality }),
        ...(degree && { degree }),
        ...(experience && { experience }),
        ...(about && { about }),
        ...(fee !== undefined && { fee }),   // keep field name consistent
        ...(address && { address }),
        ...(available !== undefined && { available }),
      },
      { new: true }
    );

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export {
  changeAvailablity,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
