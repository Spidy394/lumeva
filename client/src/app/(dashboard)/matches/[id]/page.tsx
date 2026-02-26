"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

const mockConversations: Record<string, any> = {
  "1": {
    name: "Ayan",
    messages: [
      { from: "them", text: "Hey! Interested in building a SaaS?" },
      { from: "me", text: "Absolutely! What stack are you thinking?" },
    ],
  },
  "2": {
    name: "Riya",
    messages: [
      { from: "them", text: "Loved your profile!" },
      { from: "me", text: "Thank you! Would love to collaborate." },
    ],
  },
  "3": {
    name: "Dev",
    messages: [
      { from: "them", text: "AI startup idea?" },
      { from: "me", text: "Let's discuss 👀" },
    ],
  },
};

export default function ChatPage() {
  const params = useParams();
  const id = params?.id as string;

  const conversation = mockConversations[id];
  const [messages, setMessages] = useState(conversation?.messages || []);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { from: "me", text: input }]);
    setInput("");
  };

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        Conversation not found.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">

      {/* Header */}
      <div className="p-6 border-b bg-white">
        <h1 className="text-xl font-semibold">
          {conversation.name}
        </h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-xs px-4 py-2 rounded-2xl ${
              msg.from === "me"
                ? "bg-violet-600 text-white self-end ml-auto"
                : "bg-white text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-400"
        />
        <button
          onClick={sendMessage}
          className="bg-violet-600 text-white px-5 rounded-xl"
        >
          Send
        </button>
      </div>

    </div>
  );
}