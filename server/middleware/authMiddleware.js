import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please login.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const owner = await User.findById(decoded.id).select("-password");

    if (!owner) {
      return res.status(401).json({
        success: false,
        message: "Owner not found.",
      });
    }

    if (owner.role !== "owner") {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    req.owner = owner;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};