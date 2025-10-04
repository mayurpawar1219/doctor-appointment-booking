import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not authorized, login again" });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
      }

      req.admin = decoded; // Attach decoded admin data
      next();
    });
  } catch (error) {
    console.error("AuthAdmin Error:", error.message);
    res.status(500).json({ success: false, message: "Server error during authentication" });
  }
};

export default authAdmin;
