import React, { useCallback, useRef, useState } from "react";
import { FaImage, FaPlus, FaSmile, FaTimes } from "react-icons/fa";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { uploadToCloudinary } from "../../../Utils/uploadToCloudnary";

const MessageInputBox = ({
  message,
  setMessage,
  handleSendMessage,
  uploadingImage,
  selectedFile,
  setSelectedFile,
  previewImage,
  setPreviewImage,
  showEmojiPicker,
  setShowEmojiPicker,
  fileInputRef,
  inputRef,
}) => {
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
  }, [setSelectedFile, setPreviewImage, setShowEmojiPicker]);

  const handleEmojiSelect = useCallback((emoji) => {
    setMessage((prev) => prev + emoji.native);
    inputRef.current?.focus();
  }, [setMessage, inputRef]);

  return (
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

export default MessageInputBox;
