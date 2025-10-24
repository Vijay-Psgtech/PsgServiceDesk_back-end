import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Connect to the database
connectDB();

app.listen(process.env.PORT || 5000, () => {
    console.log(`✅ Server is runnning on port ${process.env.PORT || 5000}`);
});


