import express from "express";
import { login, refresh, logout } from "../controllers/authController.js";

const router = express.Router();

// Login route
router.post("/login", login);
// Refresh token route
router.post("/refresh", refresh);
// Logout route
router.post("/logout", logout);

export default router;