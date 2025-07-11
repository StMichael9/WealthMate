import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import users from "./Models/user.js"; // your signup/login router
import { authenticate } from "./Auth/auth.js"; // your JWT-check middleware
import plaidRouter from "./Plaid/PlaidRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: FRONTEND_URL || "http://localhost:5173", // replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // <-- allow cookies
  })
);

// Public health-check
app.get("/", (req, res) => {
  res.send("WeathMate!");
});

// Mount your signup/login routes under /auth
// • POST /auth/signup
// • POST /auth/login
app.use("/auth", users);

// A protected route to verify token + fetch current user
// GET /auth/me
app.get("/auth/me", authenticate, (req, res) => {
  res.json({
    message: "Authorized",
    user: req.user,
  });
});

app.use("/api", plaidRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
