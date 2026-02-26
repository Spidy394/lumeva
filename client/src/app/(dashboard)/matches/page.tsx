"use client";

import { useState } from "react";

type Match = {
  id: number;
  name: string;
  lastMessage: string;
};

const mockMatches: Match[] = [
  { id: 1, name: "Ayan", lastMessage: "Let's build something cool 🚀" },
  { id: 2, name: "Riya", lastMessage: "Loved your profile!" },
  { id: 3, name: "Dev", lastMessage: "AI collab?" },
];

const mockMessages: Record<number, { from: string; text: string }[]> = {
  1: [
    { from: "them", text: "Hey! Interested in building SaaS?" },
    { from: "me", text: "Absolutely." },
  ],
  2: [{ from: "them", text: "We should collaborate." }],
  3: [{ from: "them", text: "AI startup idea?" }],
};

export default function MatchesPage() {
  const [activeId, setActiveId] = useState<number>(1);
  const [messages, setMessages] = useState(
    mockMessages[1] || []
  );
  const [input, setInput] = useState("");

  const activeMatch = mockMatches.find(
    (m) => m.id === activeId
  );

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMsg = { from: "me", text: input };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  return (
    <div className="h-full flex">

      {/* LEFT PANEL */}
      <div className="hidden md:block w-80 border-r bg-white overflow-y-auto">
        <div className="p-6 font-semibold text-lg border-b">
          Matches
        </div>

        {mockMatches.map((match) => (
          <div
            key={match.id}
            onClick={() => {
              setActiveId(match.id);
              setMessages(
                mockMessages[match.id] || []
              );
            }}
            className={`cursor-pointer px-6 py-4 hover:bg-gray-50 transition ${
              activeId === match.id
                ? "bg-violet-50"
                : ""
            }`}
          >
            <div className="font-medium">
              {match.name}
            </div>
            <div className="text-sm text-gray-500 truncate">
              {match.lastMessage}
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex flex-col h-full">

        {/* HEADER */}
        <div className="shrink-0 border-b bg-white px-6 py-4 font-semibold">
          {activeMatch?.name}
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto bg-gray-50 px-6 py-6 flex flex-col justify-end space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-xs px-4 py-2 rounded-2xl ${
                msg.from === "me"
                  ? "ml-auto bg-gradient-to-r from-violet-600 to-purple-600 text-white"
                  : "bg-white shadow-sm"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div className="shrink-0 border-t bg-white px-4 py-4 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-400"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="px-5 bg-violet-600 text-white rounded-xl"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}