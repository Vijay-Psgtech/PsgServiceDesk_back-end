import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import RefreshToken from "../models/refreshToken.js";
import { createAccessToken, createRefreshAccessToken } from "../utils/token.js";

const cookieOptions = (maxAgeMs) => ({
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    sameSite: "Lax",
    maxAge: maxAgeMs
});

export const login = async (req, res) => {
    try {
        const { userName, password, rememberMe } = req.body;
        const user = await User.findOne({ userName }).populate("institution");
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if(!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const payload = {
            id: user._id,
            role: user.role,
            userName: user.userName,
            institution: user.institution,
        };
        const accessToken = createAccessToken(payload);

        const refreshExpiry = rememberMe ? process.env.REFRESH_TOKEN_EXPIRES : process.env.REFRESH_TOKEN_EXPIRES_SHORT;
        const refreshToken = createRefreshAccessToken(payload, refreshExpiry);

        const decoded = jwt.decode(refreshToken);
        const expiresAt = new Date(decoded.exp * 1000);
        await RefreshToken.create({ token: refreshToken, userId: user._id, expiresAt });

        const maxAgeMs = rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000; // 7 days or 1 day

        res.cookie("refreshToken", refreshToken, cookieOptions(maxAgeMs));

        res.status(200).json({ accessToken, user: payload });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const refresh = async (req, res) => {
    const token = req.cookies.refreshToken;
    if(!token) return res.status(401).json({ message: "No token provided" });

    const existingToken = await RefreshToken.findOne({ token }).populate("user");
    if(!existingToken) return res.status(401).json({ message: "Invalid token" });
    try {
        const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const newAccessToken = createAccessToken({
            id: payload.id,
            role: payload.role,
            userName: payload.userName,
            institution: payload.institution,
        });
        res.json({ accessToken: newAccessToken, user: payload });
    } catch (error) {
        await RefreshToken.deleteOne({ token }).catch(() => {});
        res.status(403).json({ message: "Refresh token expired" });
    }
};

export const logout = async (req, res) => {
    const token = req.cookies.refreshToken;
    if(token) {
        await RefreshToken.deleteOne({ token }).catch(() => {});
    }
    res.clearCookie("refreshToken", cookieOptions(0));
    res.status(200).json({ message: "Logged out successfully" });
};

export const logoutAll = async (req, res) => {
    const userId = req.user.id;
    await RefreshToken.deleteMany({ user: userId }).catch(() => {});
    res.clearCookie("refreshToken", cookieOptions(0));
    res.status(200).json({ message: "Logged out from all devices successfully" });
}