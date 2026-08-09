import Skill from "../models/Skill.js";

// Get all skills
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      skills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single skill
export const getSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.status(200).json({
      success: true,
      skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create skill
export const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);

    res.status(201).json({
      success: true,
      message: "Skill created successfully",
      skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update skill
export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete skill
export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};