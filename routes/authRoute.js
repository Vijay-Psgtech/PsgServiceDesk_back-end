import express from "express";
import { login, refresh, logout, logoutAll } from "../controllers/authController.js";

const router = express.Router();

// Login route
router.post("/login", login);
// Refresh token route
router.post("/refresh", refresh);
// Logout route
router.post("/logout", logout);
// Logout from all sessions route
router.post("/logoutAll", logoutAll);

export default router;