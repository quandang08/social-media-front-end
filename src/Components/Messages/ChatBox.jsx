import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BsArrowLeft } from "react-icons/bs";
import { FaImage, FaPlus, FaSmile, FaTimes } from "react-icons/fa";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChatHistory,
  sendMessage,
  editMessage,
  deleteMessage,
  addNewMessage,
} from "../../Store/Auth/Action";
import { uploadToCloudinary } from "../../Utils/uploadToCloudnary";
import MessageItem from "./MessageItem";
import useChatSocket from "./useChatSocket";

const ChatBox = ({ user, onBack }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const messages = useSelector((state) => state.auth.messages) || [];

  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Xử lý tin nhắn realtime
  const handleNewMessage = useCallback((newMessage) => {
    dispatch({ type: "ADD_NEW_MESSAGE", payload: newMessage });
  }, [dispatch]);
  
  // Kết nối WebSocket
  const { sendMessage: sendSocketMessage } = useChatSocket(
    currentUser.id,
    handleNewMessage
  );

  const handleSelectImage = useCallback(async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Kích thước ảnh tối đa là 5MB");
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
    setShowEmojiPicker(false);
  }, []);

  const handleEmojiSelect = useCallback((emoji) => {
    setMessage((prev) => prev + emoji.native);
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!message.trim() && !selectedFile) return;

    try {
      let content = message;
      let type = "TEXT";

      if (selectedFile) {
        setUploadingImage(true);
        const imageUrl = await uploadToCloudinary(selectedFile);
        setUploadingImage(false);
        if (!imageUrl) return;
        content = imageUrl;
        type = "IMAGE";
      }

      sendSocketMessage({
        senderId: currentUser.id,
        receiverId: user.id,
        content,
        type,
      });

      await dispatch(sendMessage(currentUser.id, user.id, content, type));

      setMessage("");
      setSelectedFile(null);
      setPreviewImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      setUploadingImage(false);
      console.error("Lỗi gửi tin nhắn:", error);
    }
  }, [
    message,
    selectedFile,
    currentUser.id,
    user.id,
    dispatch,
    sendSocketMessage,
  ]);
  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const handleEdit = useCallback(
    (msg) => {
      const newContent = prompt("Nhập nội dung mới", msg.content);
      if (newContent && newContent.trim()) {
        dispatch(editMessage(msg.id, newContent.trim()));
      }
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    (msg) => {
      if (window.confirm("Bạn có chắc muốn xóa tin nhắn này?")) {
        dispatch(deleteMessage(msg.id));
      }
    },
    [dispatch]
  );

  // Scroll to bottom khi có tin nhắn mới
  const scrollToBottom = useCallback(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Auto focus input khi mở chat
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Lấy lịch sử chat
  useEffect(() => {
    dispatch(fetchChatHistory(currentUser.id, user.id));
  }, [dispatch, currentUser.id, user.id]);

  // Render messages với useMemo
  // Render messages
  const renderedMessages = useMemo(
    () =>
      messages.map((msg) => (
        <MessageItem
          key={msg.id}
          message={msg}
          isSender={msg.senderId === currentUser.id}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )),
    [messages, currentUser.id, handleEdit, handleDelete]
  );

  return (
    <div className="flex flex-col h-[70vh] w-full max-w-3xl rounded-lg overflow-hidden shadow bg-white relative">
      {/* Header */}
      <div className="flex items-center p-4 bg-gradient-to-r from-teal-400 to-teal-600 text-white">
        <button
          onClick={onBack}
          className="mr-4 hover:text-gray-200 transition-colors"
          aria-label="Quay lại"
        >
          <BsArrowLeft size={20} />
        </button>
        <img
          src={user.image || "/default-avatar.png"}
          alt={`Avatar của ${user.fullName}`}
          className="w-8 h-8 rounded-full mr-2 object-cover"
          loading="lazy"
        />
        <h2 className="font-semibold text-lg truncate max-w-[200px]">
          Chat với {user?.fullName}
        </h2>
      </div>

      {/* Khu vực tin nhắn */}
      <div
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3"
        style={{
          overflowY: "scroll",
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch", // Cho scroll mượt trên iOS
        }}
      >
        {renderedMessages}
      </div>

      {/* Thanh nhập tin nhắn */}
      <div className="p-3 bg-white border-t flex items-center space-x-2">
        <button
          className="text-gray-500 hover:text-teal-400 transition-colors"
          aria-label="Thêm"
        >
          <FaPlus size={20} />
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="text-gray-500 hover:text-teal-400 transition-colors"
          aria-label="Gửi ảnh"
        >
          <FaImage size={20} />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleSelectImage}
        />

        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="text-gray-500 hover:text-teal-400 transition-colors"
          aria-label="Biểu tượng cảm xúc"
        >
          <FaSmile size={20} />
        </button>

        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          ref={inputRef}
        />

        <button
          onClick={handleSendMessage}
          className="bg-gradient-to-r from-teal-400 to-teal-600 text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity disabled:opacity-70"
          disabled={uploadingImage || (!message.trim() && !selectedFile)}
          aria-label="Gửi tin nhắn"
        >
          {uploadingImage ? "Đang gửi..." : "Gửi"}
        </button>
      </div>

      {/* Preview ảnh */}
      {previewImage && (
        <div className="absolute bottom-20 left-4 p-2 bg-white border rounded-md shadow-lg z-10">
          <div className="relative">
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-[200px] max-h-[200px] object-contain"
              loading="lazy"
            />
            <button
              onClick={() => {
                setPreviewImage(null);
                setSelectedFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
              aria-label="Hủy ảnh"
            >
              <FaTimes size={12} />
            </button>
          </div>
        </div>
      )}

      {/* Emoji picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-20 right-4 z-10">
          <Picker
            data={data}
            onEmojiSelect={handleEmojiSelect}
            onClickOutside={() => setShowEmojiPicker(false)}
            previewPosition="none"
            skinTonePosition="none"
          />
        </div>
      )}
    </div>
  );
};

export default ChatBox;
