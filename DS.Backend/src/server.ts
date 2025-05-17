import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRouter from "./routes/auth.route"; 
import userRouter from "./routes/user.route"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  "https://jayychaniyara.github.io",
  "http://localhost:8080"
];

app.use(
  cors({
    origin: allowedOrigins,
    // credentials: true,
  })
);

app.use(express.json());


connectDB();

app.use('/api/users', userRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
