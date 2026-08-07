import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

// importing router
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

await connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// using routes
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("Portfolio Backend Running Successfully ");
});

app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});