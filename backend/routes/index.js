import express from "express";
import { googleAuth } from "../controllers/authController.js";
import { callGeminiAPI } from "../controllers/gemini.js";

const router = express.Router();

router.post("/google-auth", googleAuth);
router.post("/process-text", callGeminiAPI);

export default router;
