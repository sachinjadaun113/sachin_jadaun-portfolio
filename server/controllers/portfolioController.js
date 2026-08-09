import Portfolio from "../models/Portfolio.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

// Get portfolio
export const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    res.status(200).json({
      success: true,
      portfolio,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create portfolio
export const createPortfolio = async (req, res) => {
  try {
    const existingPortfolio = await Portfolio.findOne();

    if (existingPortfolio) {
      return res.status(400).json({
        success: false,
        message: "Portfolio already exists",
      });
    }

    let profileImage = "";

    // Upload profile image to Cloudinary
    if (req.file) {
      const result = await uploadToCloudinary(
        req.file.buffer,
        "portfolio/profile"
      );

      profileImage = result.secure_url;
    }

    const portfolio = await Portfolio.create({
      ...req.body,
      profileImage,
    });

    res.status(201).json({
      success: true,
      message: "Portfolio created successfully",
      portfolio,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update portfolio
export const updatePortfolio = async (req, res) => {
  try {
    const { id } = req.params;

    const portfolio = await Portfolio.findById(id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    // Upload new profile image if provided
    if (req.file) {
      const result = await uploadToCloudinary(
        req.file.buffer,
        "portfolio/profile"
      );

      portfolio.profileImage = result.secure_url;
    }

    // Update other portfolio fields
    Object.keys(req.body).forEach((key) => {
      portfolio[key] = req.body[key];
    });

    await portfolio.save();

    res.status(200).json({
      success: true,
      message: "Portfolio updated successfully",
      portfolio,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};