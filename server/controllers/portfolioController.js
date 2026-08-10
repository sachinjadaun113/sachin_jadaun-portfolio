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
    let resumeUrl = "";
    let cvUrl = "";

    // Upload profile image
    if (req.files?.profileImage?.[0]) {
      const file = req.files.profileImage[0];

      const result = await uploadToCloudinary(
        file.buffer,
        "portfolio/profile",
        "image"
      );

      profileImage = result.secure_url;
    }

    // Upload resume PDF
    if (req.files?.resume?.[0]) {
      const file = req.files.resume[0];

      if (file.mimetype !== "application/pdf") {
        return res.status(400).json({
          success: false,
          message: "Resume must be a PDF file",
        });
      }

      const result = await uploadToCloudinary(
        file.buffer,
        "portfolio/resume",
        "raw"
      );

      resumeUrl = result.secure_url;
    }

    // Upload CV PDF
    if (req.files?.cv?.[0]) {
      const file = req.files.cv[0];

      if (file.mimetype !== "application/pdf") {
        return res.status(400).json({
          success: false,
          message: "CV must be a PDF file",
        });
      }

      const result = await uploadToCloudinary(
        file.buffer,
        "portfolio/cv",
        "raw"
      );

      cvUrl = result.secure_url;
    }

    const portfolio = await Portfolio.create({
      ...req.body,
      profileImage,
      resumeUrl,
      cvUrl,
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

    // Upload new profile image
    if (req.files?.profileImage?.[0]) {
      const file = req.files.profileImage[0];

      const result = await uploadToCloudinary(
        file.buffer,
        "portfolio/profile",
        "image"
      );

      portfolio.profileImage = result.secure_url;
    }

    // Upload new resume
    if (req.files?.resume?.[0]) {
      const file = req.files.resume[0];

      if (file.mimetype !== "application/pdf") {
        return res.status(400).json({
          success: false,
          message: "Resume must be a PDF file",
        });
      }

      const result = await uploadToCloudinary(
        file.buffer,
        "portfolio/resume",
        "raw"
      );

      portfolio.resumeUrl = result.secure_url;
    }

    // Upload new CV
    if (req.files?.cv?.[0]) {
      const file = req.files.cv[0];

      if (file.mimetype !== "application/pdf") {
        return res.status(400).json({
          success: false,
          message: "CV must be a PDF file",
        });
      }

      const result = await uploadToCloudinary(
        file.buffer,
        "portfolio/cv",
        "raw"
      );

      portfolio.cvUrl = result.secure_url;
    }

    // Update normal fields
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