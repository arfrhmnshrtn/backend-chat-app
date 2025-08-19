import express from "express";

import {
  sendMessage,
  getAllMessages,
} from "../controllers/messageController.js";

import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post("/send", authMiddleware, sendMessage);
router.get("/all-message", authMiddleware, getAllMessages);

export default router;
