import { Router } from "express";
import {
  register,
  login,
  refreshToken,
  logout,
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

export default router;
