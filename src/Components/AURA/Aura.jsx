import React, { useState } from "react";
import {
  FaComments,
  FaTimes,
  FaPaperPlane,
  FaPlus,
  FaSearch,
  FaRobot,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Aura = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I assist you today?", sender: "bot" },
    {
      id: 2,
      text: "AI is transforming the future. What do you think?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([
      ...messages,
      { id: messages.length + 1, text: input, sender: "user" },
    ]);
    setInput("");
  };

  return (
    <div className="min-h-[130vh] flex items-start justify-center p-6 pt-20">
      {/* Main Box */}
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl w-full relative z-50">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-3">
          AURA AI
        </h1>
        <p className="text-gray-600 text-center mb-5">
          Explore the future of AI with sleek design and smooth interactions.
        </p>

        {/* Input */}
        <div className="flex items-center bg-gray-900 text-white rounded-full px-4 py-2">
          {/* Buttons on the left */}
          <button className="text-gray-400 hover:text-white">
            <FaPlus size={18} />
          </button>
          <button className="ml-3 text-gray-400 hover:text-white">
            <FaSearch size={18} />
          </button>
          <button className="ml-3 text-gray-400 hover:text-white">
            <FaRobot size={18} />
          </button>

          {/* Input Field */}
          <input
            type="text"
            placeholder="Nhập nội dung..."
            className="bg-transparent flex-grow outline-none text-lg placeholder-gray-400 ml-3"
          />

          {/* Submit Button */}
          <button className="text-gray-400 hover:text-white">⬆</button>
        </div>
      </div>

      {/* Chat Bot */}
      <div className="fixed bottom-5 right-5">
        <button
          className="bg-blue-500 p-4 rounded-full text-white shadow-md hover:bg-blue-600 transition"
          onClick={() => setChatOpen(!chatOpen)}
        >
          <FaComments size={28} />
        </button>

        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-20 right-4 max-w-[90vw] w-80 bg-white shadow-2xl rounded-lg border border-gray-300 z-50 flex flex-col"
            >
              <div className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
                <span className="font-semibold">Aura AI Chat</span>
                <button
                  onClick={() => setChatOpen(false)}
                  className="focus:outline-none"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="h-60 overflow-y-auto p-4 space-y-2 flex flex-col">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-2 rounded-lg text-white ${
                      msg.sender === "user"
                        ? "bg-blue-500 self-end"
                        : "bg-gray-400 self-start"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-gray-300 flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type a message..."
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={sendMessage}
                  className="ml-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Aura;
