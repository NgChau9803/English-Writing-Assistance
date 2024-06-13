import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { callGeminiAPI } from './controllers/gemini.js';
// import { googleAuth } from './controllers/authController.js';

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// app.post('/auth/google', async (req, res) => {
//   try {
//     await googleAuth(req, res);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.post('/process-text', async (req, res) => {
  try {
    const responseText = await callGeminiAPI(req.body.text);
    res.json({ message: responseText, user: 'gemini' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
