import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import RefreshToken from "../models/refreshToken.js";
import { createAccessToken, createRefreshToken } from "../utils/token.js";

const cookieOptions = (maxAgeMs) => ({
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    sameSite: "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});