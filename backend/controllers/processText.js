import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import checkPlagiarism from "./checkPlagiarism.js";

export const processText = async (req, res) => {
	const text = req.body.text;

	try {
		const grammarPrompt = `Check the following text for grammar and spelling errors and provide corrections: ${text}`;
		const grammarResult = await callGeminiAPI(grammarPrompt);

		const completionPrompt = `Complete the following text: ${text}`;
		const completionResult = await callGeminiAPI(completionPrompt);

		const paraphrasePrompt = `Paraphrase the following text: ${text}`;
		const paraphraseResult = await callGeminiAPI(paraphrasePrompt);

		const plagiarismResult = await checkPlagiarism(text);

		res.json({
			grammar: grammarResult,
			completion: completionResult,
			paraphrasing: paraphraseResult,
			plagiarism: plagiarismResult,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error processing text" });
	}
};

