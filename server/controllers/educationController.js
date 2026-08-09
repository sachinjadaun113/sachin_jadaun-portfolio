import Education from "../models/Education.js";

// Get all education
export const getEducations = async (req, res) => {
  try {
    const educations = await Education.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      educations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single education
export const getEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found",
      });
    }

    res.status(200).json({
      success: true,
      education,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create education
export const createEducation = async (req, res) => {
  try {
    const education = await Education.create(req.body);

    res.status(201).json({
      success: true,
      message: "Education created successfully",
      education,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update education
export const updateEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Education updated successfully",
      education,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete education
export const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Education deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};