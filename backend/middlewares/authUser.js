import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
    // 👇 ADD THIS LINE — right before you check for "Bearer"
    console.log("🔹 Authorization header:", req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ No or invalid authorization header:", authHeader);
      return res.status(401).json({ success: false, message: "No or invalid authorization header" });
    }

    // Extract the token (everything after "Bearer ")
    const token = authHeader.split(" ")[1];
    console.log("🔹 Extracted token:", token);

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token verified. User ID:", decoded.id);

    // Attach userId to request for next controller
    req.userId = decoded.id;

    next();
  } catch (error) {
    console.error("❌ AuthUser Error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authUser;
