import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connectDb } from "./db.js";
import mainRouter from "./routes/index.js";
import chatbotRoutes from "./routes/chatbot.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Allow only your frontend's origin, and enable credentials
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend's origin
    credentials: true, // allow cookies/headers
  })
);

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/chatbot", chatbotRoutes);
app.use("/api", mainRouter);

const start = async () => {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();
