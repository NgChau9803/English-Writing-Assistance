import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
// Access your API key as an environment variable (see "Set up your API key" above)

const API_KEY = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

async function api() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = "Write a story about a magic backpack."

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

export default api;

