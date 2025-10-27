import express from "express";
import { login, refresh } from "../controllers/authController.js";

const router = express.Router();

// Login route
router.post("/login", login);
// Refresh token route
router.post("/refresh", refresh);

export default router;