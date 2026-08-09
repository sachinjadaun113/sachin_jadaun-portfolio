import express from "express";

import {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all skills - Public
router.get("/", getSkills);

// Get single skill - Public
router.get("/:id", getSkill);

// Create skill - Owner only
router.post("/", protect, createSkill);

// Update skill - Owner only
router.put("/:id", protect, updateSkill);

// Delete skill - Owner only
router.delete("/:id", protect, deleteSkill);

export default router;