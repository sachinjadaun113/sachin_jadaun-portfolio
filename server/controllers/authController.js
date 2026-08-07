import bcrypt from "bcryptjs";
import User from "../models/User.js";


export const registerOwner = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingOwner = await User.findOne({ email });

    if (existingOwner) {
      return res.status(400).json({
        success: false,
        message: "Owner already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const owner = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const ownerResponse = {
      _id: owner._id,
      fullName: owner.fullName,
      email: owner.email,
      role: owner.role,
    };

    res.status(201).json({
      success: true,
     message: "Owner created successfully",
     owner: ownerResponse,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


export const loginOwner = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Login API Working",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};