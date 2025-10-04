// backend/resetPassword.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import doctorModel from "./models/doctorModel.js"; // Adjust path if needed

dotenv.config();

// Use the exact name from your .env
const mongoUri = process.env.MONGODB_URI;

const resetPassword = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // TODO: Replace with the doctor's email you want to reset
    const doctorEmail = "sarah@prescripto.com";

    // New password
    const newPassword = "12345678";

    // Hash the password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update doctor password
    const doctor = await doctorModel.findOneAndUpdate(
      { email: doctorEmail },
      { password: hashedPassword },
      { new: true }
    );

    if (doctor) {
      console.log(`✅ Password updated successfully for ${doctorEmail}`);
    } else {
      console.log(`⚠️ Doctor with email ${doctorEmail} not found`);
    }

    // Close connection
    await mongoose.disconnect();
    console.log("MongoDB connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error resetting password:", error.message);
    process.exit(1);
  }
};

resetPassword();
