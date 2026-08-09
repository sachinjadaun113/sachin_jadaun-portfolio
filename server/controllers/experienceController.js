import Experience from "../models/Experience.js";

// Get all experiences
export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      experiences,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single experience
export const getExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    res.status(200).json({
      success: true,
      experience,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create experience
export const createExperience = async (req, res) => {
  try {
    const experience = await Experience.create(req.body);

    res.status(201).json({
      success: true,
      message: "Experience created successfully",
      experience,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update experience
export const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      experience,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete experience
export const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};