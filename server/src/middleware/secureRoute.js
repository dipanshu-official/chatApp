import  jwt  from "jsonwebtoken";
import User from "../models/userModel.js";

const secureRoute = async (req, res, next) => {

  try {
    const authHeader = req.headers.authorization;
    console.log("AuthHeader:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token);

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    console.log("Decoded JWT:", decoded);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("User not found in DB for ID:", decoded._Id);
      return res.status(401).json({ error: "No user found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in secureRoute:", error);
    res.status(500).json({ error: "Internal server error secure" });
  }
};
  export default secureRoute