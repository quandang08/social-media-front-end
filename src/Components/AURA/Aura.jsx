import React, { useState, useEffect, useRef } from "react";
import { FaComments, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchExplanation } from "../../Store/Auth/Action";
import ChatBubble from "./ChatBubble";

const Aura = () => {
  const dispatch = useDispatch();

  // Lấy dữ liệu từ Redux
  const { explanation, loading, error } = useSelector((state) => ({
    explanation: state.auth.explanation,
    loading: state.auth.loading,
    error: state.auth.error,
  }));

  // State
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMain, setInputMain] = useState("");   // <== Ô nhập ở hero
  const [inputBubble, setInputBubble] = useState(""); // <== Ô nhập ở bong bóng

  const messagesEndRef = useRef(null);

  // Khi có explanation mới
  useEffect(() => {
    if (explanation && !loading) {
      setMessages((prev) => [
        ...prev.filter((m) => !m.isTemp),
        { id: Date.now(), text: explanation.content || explanation, sender: "bot" },
      ]);
    }
  }, [explanation, loading]);

  // Khi có error
  useEffect(() => {
    if (error) {
      setMessages((prev) => [
        ...prev.filter((m) => !m.isTemp),
        { id: Date.now(), text: `Lỗi: ${error}`, sender: "bot", isError: true },
      ]);
    }
  }, [error]);

  // Cuộn xuống đáy khi có tin nhắn
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Gửi tin nhắn (chung cho hero & bubble)
  const sendMessage = async (text, isBubble) => {
    if (!text.trim() || loading) return;

    const userMsg = { id: Date.now(), text, sender: "user" };
    const tempMsg = {
      id: `temp-${Date.now()}`,
      text: "AURA đang suy nghĩ...",
      sender: "bot",
      isTemp: true,
    };

    setMessages((prev) => [...prev, userMsg, tempMsg]);

    // Reset input tương ứng
    if (isBubble) {
      setInputBubble("");
    } else {
      setInputMain("");
    }

    try {
      await dispatch(fetchExplanation(text));
    } catch (err) {
      // Lỗi đã xử lý trong useEffect
    }
  };

  return (
    <div className="w-full h-full bg-white relative overflow-hidden">
      {/* Nền mờ */}
      <div className="absolute inset-0 bg-teal-400/30 backdrop-blur-md -z-10" />

      {/* ========== HERO SECTION ========== */}
      <div className="relative z-10 w-full max-w-5xl mx-auto mt-16 px-6 md:px-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-teal-800 tracking-widest mb-3 drop-shadow-md">
            AURA AI
          </h1>
          <p className="text-teal-900/80 text-lg max-w-xl mx-auto">
            Experience a fresh and modern AI interface with a clean, bright look.
          </p>
        </div>

        {/* Card hero chứa danh sách tin nhắn + ô nhập */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl p-6 max-w-3xl mx-auto hover:bg-white/90 transition-all"
        >
          {/* Danh sách tin nhắn hero */}
          <div className="h-[300px] overflow-y-auto mb-4 p-3 border border-white/30 rounded-md">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-2 px-3 py-2 rounded-md w-fit max-w-[70%]
                  ${msg.sender === "user" ? "ml-auto bg-teal-100" : "bg-gray-100"}
                  ${msg.isError ? "bg-red-100 text-red-600" : ""}
                  ${msg.isTemp ? "opacity-75 italic" : ""}
                `}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Ô nhập hero */}
          <div className="flex items-center gap-3 bg-gray-100/50 px-4 py-2 rounded-full shadow-inner border border-white/20">
            <input
              type="text"
              placeholder="Enter your question..."
              className="bg-transparent flex-grow outline-none text-teal-900 placeholder-teal-600/60 text-base"
              value={inputMain}
              onChange={(e) => setInputMain(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(inputMain, false)}
              disabled={loading}
            />
            <button
              onClick={() => sendMessage(inputMain, false)}
              disabled={loading}
              className={`
                bg-teal-500/90 p-3 rounded-full transition-all shadow-md
                backdrop-blur-sm border border-white/20
                ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-teal-600"}
              `}
            >
              <FaPaperPlane size={16} className="text-white" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* ========== NÚT MỞ BONG BÓNG CHAT ========== */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="bg-white p-4 rounded-full text-teal-600 shadow-lg hover:bg-gray-100 transition-all"
          onClick={() => setChatOpen(!chatOpen)}
        >
          <FaComments size={24} />
        </button>
      </div>

      {/* ========== Bong bóng chat ========== */}
      <ChatBubble
        chatOpen={chatOpen}
        setChatOpen={setChatOpen}
        messages={messages}
        sendMessage={sendMessage}
        inputBubble={inputBubble}
        setInputBubble={setInputBubble}
        loading={loading}
        messagesEndRef={messagesEndRef}
      />
    </div>
  );
};

export default Aura;
