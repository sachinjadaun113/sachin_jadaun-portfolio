import express from "express";
import { loginOwner, registerOwner } from "../controllers/authController.js";

const router = express.Router();

router.post("/register-owner", registerOwner);
router.post("/login", loginOwner);

export default router;