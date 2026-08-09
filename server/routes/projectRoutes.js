import express from "express";

import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all projects - Public
router.get("/", getProjects);

// Get single project - Public
router.get("/:id", getProject);

// Create project - Owner only
router.post("/", protect, createProject);

// Update project - Owner only
router.put("/:id", protect, updateProject);

// Delete project - Owner only
router.delete("/:id", protect, deleteProject);

export default router;