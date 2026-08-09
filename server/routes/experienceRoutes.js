import express from "express";

import {
  getExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all experiences - Public
router.get("/", getExperiences);

// Get single experience - Public
router.get("/:id", getExperience);

// Create experience - Owner only
router.post("/", protect, createExperience);

// Update experience - Owner only
router.put("/:id", protect, updateExperience);

// Delete experience - Owner only
router.delete("/:id", protect, deleteExperience);

export default router;