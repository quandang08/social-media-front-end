import React, { useEffect, useRef } from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useChatStore from "./useChatStore";
import { useDispatch } from "react-redux";
import { fetchExplanation } from "../../Store/Auth/Action";

const ChatBubble = () => {
  const {
    chatOpen,
    messages,
    inputBubble,
    loading,
    setChatOpen,
    sendMessage,
    setInputBubble,
    finalizeMessage
  } = useChatStore();
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const question = await sendMessage(inputBubble, true);
    if (question) dispatch(fetchExplanation(question));
  };

  return (
    <AnimatePresence>
      {chatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 25 }}
          className="fixed bottom-20 right-6 w-80 max-w-[90vw] bg-white shadow-xl border border-gray-200 rounded-xl flex flex-col z-50 overflow-hidden"
          style={{ height: "500px" }}
        >
          <div className="bg-teal-500 text-white p-3 flex justify-between items-center">
            <span className="font-bold">AURA AI Chat</span>
            <button onClick={() => setChatOpen(false)} className="hover:opacity-80 transition">
              <FaTimes />
            </button>
          </div>

          <div className="flex-grow p-3 space-y-3 overflow-y-auto bg-white">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`px-3 py-2 rounded-lg w-fit max-w-[80%] border border-gray-100 shadow-sm
                  ${msg.sender === "user" ? "ml-auto bg-teal-100" : "bg-gray-100"}
                  ${msg.isError ? "bg-red-100 text-red-600" : ""}
                `}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-gray-200 flex items-center bg-white">
            <input
              type="text"
              value={inputBubble}
              onChange={(e) => setInputBubble(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-grow px-3 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className={`ml-2 p-3 rounded-full text-white ${loading ? "bg-gray-400" : "bg-teal-500 hover:bg-teal-600"}`}
            >
              <FaPaperPlane size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatBubble;