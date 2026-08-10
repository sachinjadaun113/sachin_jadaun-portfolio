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
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
    { name: "cv", maxCount: 1 },
  ]),
  createPortfolio
);

// Update portfolio - Owner only
router.put(
  "/:id",
  protect,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
    { name: "cv", maxCount: 1 },
  ]),
  updatePortfolio
);

export default router;