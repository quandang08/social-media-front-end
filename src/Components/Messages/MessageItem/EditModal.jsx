import React, { useState } from "react";

function EditModal({ message, onClose, onSave }) {
  const [newContent, setNewContent] = useState(message.content);

  const handleSave = () => {
    onSave(newContent);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm animate-fadeInOverlay">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative w-96 bg-white/80 border border-white/40 backdrop-blur-md rounded-xl shadow-2xl p-5 animate-scaleUp">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-5">
          Sửa {message.messageType === "IMAGE" ? "hình ảnh" : "nội dung"}
        </h2>

        {message.messageType === "TEXT" && (
          <input
            type="text"
            className="border border-gray-300 w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
        )}

        {message.messageType === "IMAGE" && (
          <div className="flex flex-col space-y-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const tempURL = URL.createObjectURL(file);
                  setNewContent(tempURL);
                }
              }}
            />
            <input
              type="text"
              placeholder="Nhập URL ảnh mới"
              className="border border-gray-300 w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setNewContent(e.target.value)}
            />
            {newContent && (
              <img
                src={newContent}
                alt="Preview"
                className="max-w-full max-h-60 rounded border border-gray-300 shadow-sm"
              />
            )}
          </div>
        )}

        <div className="flex justify-end mt-6 space-x-3">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded transition-colors"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-transform transform hover:scale-105"
            onClick={handleSave}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
