const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// ...

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// ...
async function generateContent() {
	const prompt = "A beautiful sunset over the ocean.";

	const result = await model.generateContent(prompt);
	const response = await result.response;
	const text = response.text();
	console.log(text);
}

generateContent();