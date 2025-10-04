// backend/middlewares/authDoctor.js
import jwt from "jsonwebtoken";

const authDoctor = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.token || req.query.token;

    if (!authHeader) {
      return res.status(401).json({ success: false, message: "Not Authorized. No token provided." });
    }

    // If header starts with "Bearer ", strip it
    const token = typeof authHeader === "string" && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach doctor id to request as a dedicated property (don't rely on body)
    req.doctorId = decoded.id;

    // optional debug:
    // console.log("authDoctor decoded:", decoded);

    next();
  } catch (error) {
    console.error("AuthDoctor Error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authDoctor;
