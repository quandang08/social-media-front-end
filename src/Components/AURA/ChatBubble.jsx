import React, { useEffect, useRef, useCallback } from "react";
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
    setInput
  } = useChatStore();
  
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = useCallback(async () => {
    const question = await sendMessage(inputBubble, true);
    question && dispatch(fetchExplanation(question));
  }, [inputBubble, sendMessage, dispatch]);

  const handleInputChange = useCallback(
    (e) => setInput('Bubble', e.target.value),
    [setInput]
  );

  return (
    <AnimatePresence>
      {chatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 25 }}
          transition={{ type: "spring", damping: 25 }}
          className="fixed bottom-20 right-6 w-80 max-w-[90vw] bg-white shadow-xl rounded-xl flex flex-col"
          style={{ height: "500px" }}
        >
          <div className="bg-teal-500 text-white p-3 flex justify-between items-center">
            <span className="font-bold">AURA AI Chat</span>
            <button 
              onClick={() => setChatOpen(false)} 
              className="hover:opacity-80 transition"
              aria-label="Close chat"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex-grow p-3 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-2 px-3 py-2 rounded-lg w-fit max-w-[80%] 
                  ${msg.sender === "user" ? "ml-auto bg-teal-100" : "bg-gray-100"}
                  ${msg.isError ? "bg-red-100 text-red-600" : ""}
                `}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputBubble}
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-grow px-3 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className={`p-2 rounded-full ${loading ? "bg-gray-400" : "bg-teal-500 hover:bg-teal-600"} text-white`}
              >
                <FaPaperPlane size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(ChatBubble);