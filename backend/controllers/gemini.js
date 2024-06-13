import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI("AIzaSyDA_EghEhY9i0mPwY-QXTCUwpcfaR1UbFQ");

export const callGeminiAPI = async (prompt) => {
	try {
		const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
		const result = await model.generateContent(prompt);
		const response = await result.response;
		const text = await response.text();
    return text;
	} catch (error) {
		console.error(error);
    throw new Error('Failed to generate content');
	}
};
