import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoute.js";
import institutionRoutes from "./routes/institutionRoute.js";

dotenv.config();

// Connect to the database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Rooutes API
app.use("/api/users", userRoutes);
app.use("/api/institutions", institutionRoutes);

// Start the server
app.listen(process.env.PORT || 5000, () => {
  console.log(`✅ Server is runnning on port ${process.env.PORT || 5000}`);
});
