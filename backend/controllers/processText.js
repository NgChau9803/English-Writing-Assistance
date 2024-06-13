import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { callGeminiAPI } from "./gemini.js";
import checkPlagiarism from "./checkPlagiarism.js";

export const processText = async (req, res) => {
		const { text, task } = req.body;
		let result;
		let prompt;

		switch (task) {
			case "grammar check":
				prompt = `Check the following text for grammar and spelling errors and provide corrections: ${text}`;
				result = await callGeminiAPI(prompt);
				break;
			case "text completion":
				prompt = `Complete the following text: ${text}`;
				result = await callGeminiAPI(prompt);
				break;
			case "paraphrasing":
				prompt = `Paraphrase the following text: ${text}`;
				result = await callGeminiAPI(prompt);
				break;
			case "plagiarism check":
				result = await checkPlagiarism(text);
				break;
			default:
				result = { error: "Invalid task" };
		}

		res.json(result);
	};
