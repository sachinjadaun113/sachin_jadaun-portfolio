import express from "express";

import {
  createRating,
  getRatings,
  getRating,
  deleteRating,
} from "../controllers/ratingController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.post("/", createRating);

// Public - used to show average rating and reviews
router.get("/", getRatings);

// Owner only
router.get("/:id", protect, getRating);

router.delete("/:id", protect, deleteRating);

export default router;  