import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const secureRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token from "Bearer <token>"

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password"); // current logged-in user
    if (!user) {
      return res.status(401).json({ error: "No user found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in secureRoute:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default secureRoute;
