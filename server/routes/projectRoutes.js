import express from "express";

import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

// Get all projects
router.get("/", getProjects);

// Get single project
router.get("/:id", getProject);

// Create project
router.post("/", createProject);

// Update project
router.put("/:id", updateProject);

// Delete project
router.delete("/:id", deleteProject);

export default router;