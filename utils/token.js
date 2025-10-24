import jwt from "jsonwebtoken";

export const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "15m",
  });
};

export const createRefreshAccessToken = (payload, expiresIn) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn });
};
