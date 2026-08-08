import express from "express";
import {
  loginOwner,
  registerOwner,
  logoutOwner,
  changePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// One-time development setup only
router.post("/register-owner", registerOwner);
router.post("/login", loginOwner);
router.post("/logout", logoutOwner);
router.put("/change-password", protect, changePassword);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

router.get("/me", protect, (req, res) => {
  res.status(200).json({
    success: true,
    owner: req.owner,
  });
});

export default router;