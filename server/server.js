import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

// importing router
import authRoutes from "./routes/authRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import educationRoutes from "./routes/educationRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";


dotenv.config();

await connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// using routes
app.use("/api/auth", authRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/ratings", ratingRoutes);


app.get("/", (req, res) => {
  res.send("Portfolio Backend Running Successfully ");
});

app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});