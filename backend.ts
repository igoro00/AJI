import { GoogleGenAI, Type } from "@google/genai";
import express from "express";
import bodyParser from "body-parser";

const app = express();

const ai = new GoogleGenAI({});

app.use(express.static("public"));
app.use(bodyParser.json());

app.post("/ai", async (req, res) => {
    console.log("Received request:", req.body);
	const response = await ai.models.generateContent({
		model: "gemini-2.5-flash",
		contents: `Categorize the following todo:\n\n${JSON.stringify(req.body)}`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.STRING
            }
        }
    });
    console.log("AI response:", response.text);
	res.send(response.text);
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});