import express from "express";
import {
  getPortfolio,
  createPortfolio,
  updatePortfolio,
} from "../controllers/portfolioController.js";

import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", getPortfolio);
router.post("/", protect, createPortfolio);
router.put("/:id", protect, updatePortfolio);

export default router;