import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database";
import travelEntryRoutes from "./routes/travelEntryRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/entries", travelEntryRoutes);
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(
    `Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  );
});
