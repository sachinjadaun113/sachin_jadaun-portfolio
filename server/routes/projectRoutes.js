import express from "express";

import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public
router.get("/", getProjects);

router.get("/:id", getProject);

// Owner only
router.post(
  "/",
  protect,
  upload.array("media", 10),
  createProject
);

router.put(
  "/:id",
  protect,
  upload.array("media", 10),
  updateProject
);

router.delete(
  "/:id",
  protect,
  deleteProject
);

export default router;