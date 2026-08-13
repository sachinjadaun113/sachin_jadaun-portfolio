import express from "express";

import {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
  downloadDocument,
} from "../controllers/documentController.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// =========================
// PUBLIC
// =========================

router.get("/", getDocuments);

router.get(
  "/:id/download",
  downloadDocument
);

router.get("/:id", getDocument);

// =========================
// PROTECTED
// =========================

// Add document
router.post(
  "/",
  protect,
  upload.single("document"),
  createDocument
);

// Update document / replace file
router.put(
  "/:id",
  protect,
  upload.single("document"),
  updateDocument
);

// Delete document
router.delete(
  "/:id",
  protect,
  deleteDocument
);

export default router;