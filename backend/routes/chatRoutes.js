import express from "express";
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

chatRouter.get("/getChat/:id", authenticateJWT, async (req, res) => {
    try {
        const chatbox = await Chatbox.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!chatbox) {
            return res.status(404).send("Chatbox not found");
        }
        const chats = await Chat.findAll({ where: { chatboxId: chatbox.id } });
        res.json({ ...chatbox.toJSON(), chats });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

chatRouter.post("/createChats", authenticateJWT, (req, res) => {
    Chatbox.create({ userId: req.user.id, name: "New Chat" }).then((chatbox) => {
        res.json({ id: chatbox.id });
    });
});

chatRouter.post("/deleteChat/:id", authenticateJWT, async (req, res) => {
    try {
        await Chat.destroy({ where: { chatboxId: req.params.id } });
        await Chatbox.destroy({ where: { id: req.params.id, userId: req.user.id } });
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
});

chatRouter.patch("/renameChat/:id", authenticateJWT, (req, res) => {
    Chatbox.update({ name: req.body.newName }, { where: { id: req.params.id, userId: req.user.id } })
        .then(() => {
            res.send("Chatbox renamed");
        })
        .catch(err => {
            res.status(500).send(err.message);
        });
});

chatRouter.post("/", authenticateJWT, async (req, res) => {
    const { chatboxId, text } = req.body;
    const chatbox = await Chatbox.findByPk(chatboxId);

    if (!chatbox) {
        return res.status(404).send("Chatbox not found");
    }

    try {
        const userMessage = await Chat.create({ chatboxId, message: text, user: "user" });
        const geminiResponse = await callGeminiAPI(text);
        const geminiMessage = await Chat.create({ chatboxId, message: geminiResponse, user: "gemini" });
        Chatbox.create({ me})
        res.json({ response: geminiMessage.message });
    } catch (error) {
        res.status(500).send("Error processing text");
    }
});

export default chatRouter;