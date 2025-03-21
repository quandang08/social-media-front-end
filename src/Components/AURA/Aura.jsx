import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([
      ...messages,
      { id: messages.length + 1, text: input, sender: "user" },
    ]);
    setInput("");
  };

  return (
    <div className="w-full h-full bg-white flex flex-col items-center relative overflow-hidden">
      {/* Hero Section với hiệu ứng glass */}
      <div className="w-full h-[100vh] bg-teal-400/30 backdrop-blur-md absolute top-0 left-0 z-0" />

      {/* Nội dung chính */}
      <div className="relative z-10 w-full max-w-5xl mt-16 px-6 md:px-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-teal-800 tracking-widest mb-3 drop-shadow-md">
            AURA AI
          </h1>
          <p className="text-teal-900/80 text-lg max-w-xl mx-auto">
            Experience a fresh and modern AI interface with a clean, bright look.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="
            bg-white/80
            backdrop-blur-md
            border border-white/20
            shadow-xl
            rounded-2xl
            p-6
            max-w-3xl
            mx-auto
            flex flex-col
            items-center
            hover:bg-white/90
            transition-all
          "
        >
          <h2 className="text-2xl font-bold text-teal-700 mb-4 tracking-tight drop-shadow-sm">
            Ask anything about the future of AI
          </h2>
          <div
            className="
              w-full
              bg-gray-100/50
              backdrop-blur-sm
              rounded-full
              px-4 py-2
              flex items-center
              gap-3
              shadow-inner
              border border-white/20
            "
          >
            <button className="text-teal-600/80 hover:text-teal-700 transition-colors">
              <FaPlus size={18} />
            </button>
            <button className="text-teal-600/80 hover:text-teal-700 transition-colors">
              <FaSearch size={18} />
            </button>
            <button className="text-teal-600/80 hover:text-teal-700 transition-colors">
              <FaRobot size={18} />
            </button>

            <input
              type="text"
              placeholder="Enter your question..."
              className="bg-transparent flex-grow outline-none text-teal-900 placeholder-teal-600/60 text-base"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="
                bg-teal-500/90
                hover:bg-teal-600
                text-white
                p-3
                rounded-full
                transition-all
                shadow-md
                backdrop-blur-sm
                border border-white/20
              "
            >
              <FaPaperPlane size={16} />
            </button>
          </div>
        </motion.div>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="
            bg-white/80
            backdrop-blur-md
            border border-white/20
            p-4
            rounded-full
            text-teal-600
            shadow-lg
            hover:bg-white/90
            hover:shadow-xl
            transition-all
          "
          onClick={() => setChatOpen(!chatOpen)}
        >
          <FaComments size={24} />
        </button>
      </div>

      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 25 }}
            transition={{ duration: 0.4 }}
            className="
              fixed
              bottom-20
              right-6
              w-80
              max-w-[90vw]
              bg-white/80
              backdrop-blur-lg
              border border-white/20
              shadow-2xl
              rounded-2xl
              flex flex-col
              z-50
              overflow-hidden
              hover:bg-white/90
              transition-all
            "
          >
            <div className="bg-gradient-to-r from-teal-400/70 to-teal-500/70 backdrop-blur-md text-white p-4 flex justify-between items-center">
              <span className="font-bold drop-shadow-sm">AURA AI Chat</span>
              <button
                onClick={() => setChatOpen(false)}
                className="focus:outline-none hover:opacity-80 transition"
              >
                <FaTimes size={18} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-white/30">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`
                    px-3 py-2
                    rounded-lg
                    backdrop-blur-sm
                    w-fit
                    max-w-[70%]
                    border border-white/20
                    ${
                      msg.sender === "user"
                        ? "bg-teal-100/80 text-teal-900 ml-auto"
                        : "bg-gray-100/80 text-gray-900"
                    }
                  `}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-white/20 flex items-center bg-white/30">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="
                  flex-grow
                  px-3 py-2
                  rounded-full
                  bg-white/80
                  backdrop-blur-sm
                  border border-white/20
                  text-teal-900
                  placeholder-teal-600/60
                  focus:outline-none
                  focus:ring-2
                  focus:ring-teal-400/50
                "
              />
              <button
                onClick={sendMessage}
                className="
                  ml-2
                  bg-teal-500/90
                  hover:bg-teal-600
                  text-white
                  p-3
                  rounded-full
                  transition-all
                  shadow
                  backdrop-blur-sm
                  border border-white/20
                "
              >
                <FaPaperPlane size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Aura;