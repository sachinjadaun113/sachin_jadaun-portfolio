import express from "express";

import {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
} from "../controllers/documentController.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getDocuments);

router.get("/:id", getDocument);

// Protected routes
router.post(
  "/",
  protect,
  upload.single("document"),
  createDocument
);

router.put(
  "/:id",
  protect,
  upload.single("document"),
  updateDocument
);

router.delete(
  "/:id",
  protect,
  deleteDocument
);

export default router;