import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Routes import karein
import jobRoutes from "./routes/jobs-routes.js";
import agentRoutes from "./routes/Agents-routes.js";
import orchestrateRoutes from "./routes/Orchestrate.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection Add karein
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('🍃 MongoDB successfully connected!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes setup karein
app.use('/api/jobs', jobRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/orchestrate', orchestrateRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AGENTRA Backend Running 🚀"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});