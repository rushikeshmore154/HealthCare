// components/Chatbot.jsx
import React, { useState } from "react";
import axios from "axios";
import UserLayout from "./userLayout";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:5000/api/chatbot", {
        query: input,
      });

      if (res.data && res.data.output) {
        const botReply = { sender: "bot", text: res.data.output };
        setMessages((prev) => [...prev, botReply]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "⚠️ Invalid response format from server." },
        ]);
      }
    } catch (error) {
      console.error("Request error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Error: No response from server." },
      ]);
    }
  };

  return (
    <UserLayout>
      <div className="h-screen bg-gray-100 flex flex-col">
        <header className="bg-blue-600 text-white text-xl font-semibold p-4 shadow">
          AI Health Assistant
        </header>

        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm shadow ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800 border"
                }`}
                dangerouslySetInnerHTML={{ __html: formatMarkdown(msg.text) }}
              />
            </div>
          ))}
        </main>

        <footer className="p-4 bg-white border-t flex gap-2">
          <input
            className="flex-1 p-2 border rounded-lg focus:outline-none"
            placeholder="Ask something about health..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </footer>
      </div>
    </UserLayout>
  );
}

// Markdown-style formatting function
function formatMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
    .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italic
    .replace(/•/g, "🔹") // Bullets
    .replace(/\n/g, "<br/>"); // Line breaks
}
