import express from "express";
import User from "../models/user.js";
import Chat from "../models/chat.js";
import Chatbox from "../models/chatbox.js";
import callGeminiAPI from "../controllers/gemini.js";
import authenticateJWT from "../controllers/authMiddleware.js";

const chatRouter = express.Router();

chatRouter.get("/getChats", authenticateJWT, (req, res) => {
    Chatbox.findAll({ where: { userId: req.user.id } }).then((chatboxes) => {
        res.json(chatboxes);
    });
});

chatRouter.post("/createChats", authenticateJWT, (req, res) => {
    const { userId,chatboxId } = req.body;
    Chatbox.create({ userId: req.user.id, name: "New Chat" }).then((chatbox) => {
        res.json({ id: chatbox.id });
    });
});

chatRouter.post("/deleteChat/:id", authenticateJWT, (req, res) => {
    Chatbox.destroy({ where: { id: req.params.id, userId: req.user.id } }).then(() => {
        res.status(204).send();
    });
});

chatRouter.patch("/renameChat/:id", authenticateJWT, (req, res) => {
    const { newName } = req.body;
    Chatbox.update({ name: newName }, { where: { id: req.params.id, userId: req.user.id } }).then(
        () => {
            res.status(204).send();
        }
    );
});

chatRouter.post("/", authenticateJWT, async (req, res) => {
    const { chatboxId, text } = req.body;
    const aiResponse = await callGeminiAPI(text);
    const chat = await Chat.create({
        chatboxId,
        message: text,
        response: aiResponse,
    });
    res.json({ response: aiResponse });
});

export default chatRouter;
