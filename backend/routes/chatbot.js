import express from "express";
const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

router.post("/", async (req, res) => {
  const { query } = req.body;

  try {
    // Constructing a more detailed prompt
    const fullQuery = `You are a helpful and empathetic healthcare assistant. Your goal is to provide accurate, general health information and guidance, but always advise users to consult with a qualified medical professional for diagnosis and treatment. Respond to the following query in short:\n\n${query}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: fullQuery, // Send the engineered prompt
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    // extract text content
    const output =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    console.log("Gemini API response:", output);
    res.status(200).json({ output });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to get response from Gemini API" });
  }
});

export default router;
