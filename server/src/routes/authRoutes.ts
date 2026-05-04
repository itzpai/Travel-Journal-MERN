import { Router } from "express";
import {
  register,
  login,
  refreshToken,
  logout,
  requestOTP,
  verifyOTP,
  resetPassword,
} from "../controllers/authController";

const router = Router();

// Register a new user
router.post("/register", register);
// Login user
router.post("/login", login);
// Refresh access token
router.post("/refresh-token", refreshToken);
// Logout user
router.post("/logout", logout);

// Forgot Password Flow
router.post("/forgot-password", requestOTP);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

export default router;
