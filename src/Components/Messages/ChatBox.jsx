import React, { useEffect, useRef, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { FaPlus, FaImage, FaSmile } from "react-icons/fa";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessage, editMessage, fetchChatHistory, sendMessage } from "../../Store/Auth/Action";
import { uploadToCloudinary } from "../../Utils/uploadToCloudnary";
import MessageItem from "./MessageItem";

export default function ChatBox({ user, onBack }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const [message, setMessage] = useState("");
  const messages = useSelector((state) => state.auth.messages) || [];

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  // Chọn ảnh => Lưu file & tạo preview
  const handleSelectImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };

  // Chọn emoji
  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  // Gửi tin nhắn (text hoặc ảnh)
  const handleSendMessage = async () => {
    if (!message.trim() && !selectedFile) return;
    try {
      if (selectedFile) {
        setUploadingImage(true);
        const imageUrl = await uploadToCloudinary(selectedFile);
        if (imageUrl) {
          dispatch(sendMessage(currentUser.id, user.id, imageUrl, "IMAGE"));
        }
      } else {
        dispatch(sendMessage(currentUser.id, user.id, message, "TEXT"));
      }
    } catch (error) {
      console.error("Lỗi gửi tin nhắn:", error);
    } finally {
      setMessage("");
      setSelectedFile(null);
      setPreviewImage(null);
      setUploadingImage(false);
    }
  };

  // Callback edit tin nhắn
  const handleEdit = (msg) => {
    const newContent = prompt("Nhập nội dung mới", msg.content);
    if (newContent && newContent.trim()) {
      dispatch(editMessage(msg.id, newContent.trim()));
    }
  };

  // Callback xóa tin nhắn
  const handleDelete = (msg) => {
    if (window.confirm("Bạn có chắc muốn xóa tin nhắn này?")) {
      dispatch(deleteMessage(msg.id));
    }
  };

  useEffect(() => {
    dispatch(fetchChatHistory(currentUser.id, user.id));
  }, [dispatch, currentUser.id, user.id]);

  return (
    <div className="flex flex-col h-[70vh] w-full max-w-3xl rounded-lg overflow-hidden shadow bg-white relative">
      {/* Header */}
      <div className="flex items-center p-4 bg-gradient-to-r from-teal-400 to-teal-600 text-white">
        <button onClick={onBack} className="mr-4 hover:text-gray-200">
          <BsArrowLeft size={20} />
        </button>
        <img
          src={user.image || "/default-avatar.png"}
          alt="Buddy Avatar"
          className="w-8 h-8 rounded-full mr-2"
        />
        <h2 className="font-semibold text-lg">Chat với {user?.fullName}</h2>
      </div>

      {/* Khu vực tin nhắn */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
        {messages.map((msg) => {
          const isSender = msg.senderId === currentUser.id;
          return (
            <MessageItem
              key={msg.id}
              message={msg}
              isSender={isSender}
              currentUser={currentUser}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          );
        })}
      </div>

      {/* Thanh nhập tin nhắn */}
      <div className="p-3 bg-white border-t flex items-center space-x-2">
        <button className="text-gray-500 hover:text-teal-400">
          <FaPlus size={20} />
        </button>
        {/* Chọn ảnh */}
        <button
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          className="text-gray-500 hover:text-teal-400"
        >
          <FaImage size={20} />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleSelectImage}
        />
        {/* Chọn emoji */}
        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="text-gray-500 hover:text-teal-400"
        >
          <FaSmile size={20} />
        </button>
        {/* Input nhập tin nhắn */}
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {/* Nút gửi */}
        <button
          onClick={handleSendMessage}
          className="bg-gradient-to-r from-teal-400 to-teal-600 text-white px-4 py-2 rounded-full hover:opacity-90"
          disabled={uploadingImage}
        >
          {uploadingImage ? "Đang gửi..." : "Gửi"}
        </button>
      </div>

      {/* Preview ảnh */}
      {previewImage && (
        <div className="absolute bottom-20 left-4 p-2 bg-white border rounded-md shadow">
          <img
            src={previewImage}
            alt="Preview"
            className="max-w-[200px] max-h-[200px] object-contain"
          />
        </div>
      )}

      {/* Emoji picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-20 right-4">
          <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        </div>
      )}
    </div>
  );
}
