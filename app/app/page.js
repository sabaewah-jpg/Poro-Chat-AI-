'use client';

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "🇵🇬 Poro Chat is live! Ask me anything about Papua New Guinea." }
  ]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();

      setMessages([...newMessages, { role: "ai", text: data.reply }]);
    } catch (err) {
      setMessages([...newMessages, { role: "ai", text: "Error connecting to AI." }]);
    }

    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
      <h1>🇵🇬 Poro Chat</h1>

      <div style={{ border: "1px solid #ddd", padding: 10, height: 400, overflowY: "auto" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <b>{m.role === "user" ? "You" : "Poro Chat"}:</b> {m.text}
          </div>
        ))}
        {loading && <p>Thinking...</p>}
      </div>

      <div style={{ display: "flex", marginTop: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about PNG..."
          style={{ flex: 1, padding: 10 }}
        />
        <button onClick={sendMessage} style={{ padding: 10 }}>
          Send
        </button>
      </div>
    </div>
  );
                                    }
