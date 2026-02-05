import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// API versioning
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", profileRoutes);
app.use("/api/v1/tasks", taskRoutes);

export default app;
