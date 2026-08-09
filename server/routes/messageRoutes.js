import express from "express";

import {
  createMessage,
  getMessages,
  getMessage,
  updateMessage,
  deleteMessage,
} from "../controllers/messageController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Visitor can send a message
router.post("/", createMessage);

// Owner only
router.get("/", protect, getMessages);
router.get("/:id", protect, getMessage);
router.put("/:id", protect, updateMessage);
router.delete("/:id", protect, deleteMessage);

export default router;