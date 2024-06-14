import express from 'express';
import { callGeminiAPI } from '../controllers/gemini.js';
import Chat from '../models/chatModel.js';

const chatRouter = express.Router();

router.post('/processText', async (req, res) => {
  const { userId, text } = req.body;

  try {
    const aiResponse = await callGeminiAPI(text);

    const chat = await Chat.create({
      message: text,
      response: aiResponse,
      userId: userId
    });

    res.status(201).json(chat);
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get("/processText/getChats/:userId", async (req, res) => {
	const { userId } = req.params;

	try {
		const chats = await Chat.findAll({
			where: { userId },
			order: [["createdAt", "DESC"]],
		});

		res.status(200).json(chats);
	} catch (error) {
		console.error("Error retrieving chats:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

router.post("/processText/createChats", async (req, res) => {
	const { userId, message } = req.body;

	try {
		const chat = await Chat.create({ userId, message, response: "" });
		res.status(201).json(chat);
	} catch (error) {
		console.error("Error creating chat:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

router.post("/processText/deleteChat/:chatId", async (req, res) => {
	const { chatId } = req.params;

	try {
		const chat = await Chat.findByPk(chatId);
		if (chat) {
			await chat.destroy();
			res.status(200).json({ message: "Chat deleted successfully" });
		} else {
			res.status(404).json({ error: "Chat not found" });
		}
	} catch (error) {
		console.error("Error deleting chat:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

router.patch("/renameChat/:chatId", async (req, res) => {
	const { chatId } = req.params;
	const { newName } = req.body;

	try {
		const chat = await Chat.findByPk(chatId);
		if (chat) {
			chat.message = newName;
			await chat.save();
			res.status(200).json(chat);
		} else {
			res.status(404).json({ error: "Chat not found" });
		}
	} catch (error) {
		console.error("Error renaming chat:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

export default chatRouter;
