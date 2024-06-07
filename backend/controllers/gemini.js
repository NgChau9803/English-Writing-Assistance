import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI("AIzaSyDA_EghEhY9i0mPwY-QXTCUwpcfaR1UbFQ");

export const callGeminiAPI = async (res, req) => {
	try {
		const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
		const prompt = req.body.text;
		const result = await model.generateContent(prompt);
		const response = await result.response;
		const text = response.text();
		console.log(text);
	} catch (error) {
		console.error(error);
	}
};
