import express from "express";
import upload from "../middleware/uploadMiddleware.js";

import {
  getPortfolio,
  createPortfolio,
  updatePortfolio,
} from "../controllers/portfolioController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get portfolio - Public
router.get("/", getPortfolio);

// Create portfolio - Owner only
router.post(
  "/",
  protect,
  upload.single("profileImage"),
  createPortfolio
);

// Update portfolio - Owner only
router.put(
  "/:id",
  protect,
  upload.single("profileImage"),
  updatePortfolio
);

export default router;