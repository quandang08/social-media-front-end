import React, { useEffect, useCallback, useMemo, useRef } from "react";
import { FaComments, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchExplanation } from "../../Store/Auth/Action";
import useChatStore from "./useChatStore";
import ChatBubble from "./ChatBubble";

const Aura = () => {
  const dispatch = useDispatch();
  const { explanation, loading: reduxLoading, error } = useSelector(
    state => ({
      explanation: state.auth.explanation,
      loading: state.auth.loading,
      error: state.auth.error
    }),
    shallowEqual
  );

  const {
    messages,
    inputMain,
    chatOpen,
    sendMessage,
    finalizeMessage,
    setInput,
    setChatOpen
  } = useChatStore();

  const renderedMessages = useMemo(() => messages, [messages]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (explanation && !reduxLoading) {
      finalizeMessage(explanation.content || explanation);
    }
  }, [explanation, reduxLoading, finalizeMessage]);

  useEffect(() => {
    if (error) finalizeMessage(error, true);
  }, [error, finalizeMessage]);

   //effect xử lý cuộn tự động
   useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "nearest"
    });
  }, [messages]);

  const handleSend = useCallback(async () => {
    const question = await sendMessage(inputMain, false);
    question && dispatch(fetchExplanation(question));
  }, [inputMain, sendMessage, dispatch]);

  const handleInputChange = useCallback(
    (e) => setInput('Main', e.target.value),
    [setInput]
  );

  const toggleChat = useCallback(() => setChatOpen(!chatOpen), [chatOpen, setChatOpen]);

  return (
    <div className="w-full h-full bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-teal-400/30 backdrop-blur-md -z-10" />

      <div className="relative z-10 max-w-5xl mx-auto mt-16 px-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-teal-800 mb-3">AURA AI</h1>
          <p className="text-teal-900/80">
            Experience a fresh and modern AI interface
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-md border shadow-xl 
          rounded-2xl p-6 max-w-3xl mx-auto"
        >
          <div className="h-[300px] overflow-y-auto mb-4">
            {renderedMessages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-2 px-3 py-2 rounded-lg w-fit max-w-[70%]
                  ${msg.sender === "user" ? "ml-auto bg-teal-100" : "bg-gray-100"}
                `}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center gap-3 bg-gray-100/50 p-2 rounded-full">
            <input
              type="text"
              value={inputMain}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask something..."
              className="flex-grow bg-transparent outline-none px-3"
              disabled={reduxLoading}
            />
            <button
              onClick={handleSend}
              disabled={reduxLoading}
              className={`p-2 rounded-full ${reduxLoading ? "bg-gray-400" : "bg-teal-500"} text-white`}
            >
              <FaPaperPlane size={16} />
            </button>
          </div>
        </motion.div>
      </div>

      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-white p-3 
        rounded-full shadow-lg text-teal-600"
        aria-label={chatOpen ? "Close chat" : "Open chat"}
      >
        <FaComments size={20} />
      </button>

      <ChatBubble />
    </div>
  );
};

export default Aura;