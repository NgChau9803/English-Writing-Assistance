import axios from "axios";
import dotenv from "dotenv";
const plagiarismCheckerAPIKey = "YOUR_PLAGIARISM_CHECKER_API_KEY";
const plagiarismCheckerURL = "YOUR_PLAGIARISM_CHECKER_API_URL";

const checkPlagiarism = async (text) => {
	const response = await axios.post(plagiarismCheckerURL, {
		key: plagiarismCheckerAPIKey,
		text: text,
	});
	return response.data;
};

export default checkPlagiarism;
