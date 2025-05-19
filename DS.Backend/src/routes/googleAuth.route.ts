import express from "express";
import { googleAuthLogin } from "../controllers/googleAuthController";

const router = express.Router();

router.post("/google-login", googleAuthLogin);

export default router;
