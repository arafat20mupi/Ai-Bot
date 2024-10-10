// index.js
const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config(); // For loading API key from .env

const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors({ origin: '*' }));
app.use(express.json()); // For parsing JSON bodies

const apiKey = process.env.GEMINI_API_KEY; // Set this in your .env file
if (!apiKey) {
    console.error("API Key is missing. Please set GEMINI_API_KEY in your .env file.");
    process.exit(1); // Exit the process if API key is not set
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

// Handle chat messages from the frontend
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    console.log(userMessage)

    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [], // Add conversation history here for continuity
        });

        const result = await chatSession.sendMessage(userMessage);
        res.json({ response: result.response.text() });
    } catch (error) {
        console.error("Error communicating with AI: ", error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
