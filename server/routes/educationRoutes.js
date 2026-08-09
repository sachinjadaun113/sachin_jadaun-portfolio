import express from "express";

import {
  getEducations,
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../controllers/educationController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all education - Public
router.get("/", getEducations);

// Get single education - Public
router.get("/:id", getEducation);

// Create education - Owner only
router.post("/", protect, createEducation);

// Update education - Owner only
router.put("/:id", protect, updateEducation);

// Delete education - Owner only
router.delete("/:id", protect, deleteEducation);

export default router;