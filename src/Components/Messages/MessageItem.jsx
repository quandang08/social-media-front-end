import React, { useState, useRef } from "react";
import "./MessageItem.css";

function EditModal({ message, onClose, onSave }) {
  const [newContent, setNewContent] = useState(message.content);

  const handleSave = () => {
    onSave(newContent);
    onClose();
  };

  return (
    // Overlay mờ và blur nền phía sau
    <div
      className="
        fixed inset-0
        flex items-center justify-center
        z-50
        bg-black/30
        backdrop-blur-sm
        animate-fadeInOverlay
      "
    >
      {/* Khu vực overlay (bấm ra ngoài để đóng) */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Hộp modal chính */}
      <div
        className="
          relative
          w-96
          bg-white/80
          border border-white/40
          backdrop-blur-md
          rounded-xl
          shadow-2xl
          p-5
          animate-scaleUp
        "
      >
        {/* Nút đóng ở góc trên phải */}
        <button
          className="
            absolute
            top-4
            right-4
            text-gray-600
            hover:text-gray-900
            transition-colors
          "
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10
                8.586l4.293-4.293a1 1 0 111.414
                1.414L11.414 10l4.293 4.293a1
                1 0 01-1.414 1.414L10 11.414l-4.293
                4.293a1 1 0 01-1.414-1.414L8.586
                10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Tiêu đề modal */}
        <h2 className="text-2xl font-bold text-gray-800 mb-5">
          Sửa {message.messageType === "IMAGE" ? "hình ảnh" : "nội dung"}
        </h2>

        {/* Nội dung sửa text / ảnh */}
        {message.messageType === "TEXT" && (
          <input
            type="text"
            className="
              border border-gray-300
              w-full px-3 py-2
              rounded
              focus:outline-none
              focus:ring-2
              focus:ring-blue-400
            "
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
        )}

        {message.messageType === "IMAGE" && (
          <div className="flex flex-col space-y-3">
            {/* Upload file input */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  // Tạo URL tạm để xem trước
                  const tempURL = URL.createObjectURL(file);
                  setNewContent(tempURL);
                }
              }}
            />
            {/* Hoặc nhập URL ảnh */}
            <input
              type="text"
              placeholder="Nhập URL ảnh mới"
              className="
                border border-gray-300
                w-full px-3 py-2
                rounded
                focus:outline-none
                focus:ring-2
                focus:ring-blue-400
              "
              onChange={(e) => setNewContent(e.target.value)}
            />
            {/* Preview ảnh mới */}
            {newContent && (
              <img
                src={newContent}
                alt="Preview"
                className="
                  max-w-full max-h-60
                  rounded
                  border border-gray-300
                  shadow-sm
                "
              />
            )}
          </div>
        )}

        {/* Nút hành động */}
        <div className="flex justify-end mt-6 space-x-3">
          <button
            className="
              bg-gray-300
              hover:bg-gray-400
              text-gray-700
              px-4 py-2
              rounded
              transition-colors
            "
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="
              bg-blue-500
              hover:bg-blue-600
              text-white
              px-4 py-2
              rounded
              transition-transform
              transform hover:scale-105
            "
            onClick={handleSave}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MessageItem({ message, isSender, onEdit, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const pressTimerRef = useRef(null);
  const bubbleClass = isSender ? "bubble-right" : "bubble-left";
  const handlePressStart = () => {
    if (!isSender) return;
    pressTimerRef.current = setTimeout(() => {
      setShowModal(true);
    }, 500);
  };

  const handlePressEnd = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEditClick = () => {
    setShowModal(false);
    setShowEditModal(true);
  };

  const handleSaveEdit = (newContent) => {
    onEdit({
      ...message,
      content: newContent,
    });
    setShowEditModal(false);
  };

  const handleDeleteClick = () => {
    setShowModal(false);
    onDelete(message);
  };

  const bubbleStyle = isSender
    ? "bg-lime-400 text-white self-end"
    : "bg-gray-200 text-gray-800 self-start";

  return (
    <>
      <div
        className={`flex w-full ${isSender ? "justify-end" : "justify-start"}`}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
      >
        <div
          className={`
            relative
            ${bubbleStyle}
            px-4 py-2
            rounded-2xl
            max-w-xs
            shadow-md
            mb-2
          `}
          style={{ wordWrap: "break-word" }}
        >
          {message.messageType === "IMAGE" ? (
            <img
              src={message.content}
              alt="img"
              className="max-w-full h-auto rounded-md"
            />
          ) : (
            message.content
          )}
        </div>
      </div>

      {/* Modal "Chọn thao tác" chỉ hiển thị cho người gửi */}
      {isSender && showModal && (
        <div
          className="
            fixed inset-0
            flex items-center justify-center
            bg-black/30
            backdrop-blur-sm
            z-50
            animate-fadeInOverlay
          "
        >
          <div className="absolute inset-0" onClick={handleCloseModal}></div>
          <div
            className="
              relative
              w-72
              bg-white/80
              border border-white/40
              backdrop-blur-md
              rounded-xl
              shadow-2xl
              overflow-hidden
              animate-scaleUp
            "
          >
            <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 rounded-t-xl">
              <h2 className="text-lg font-semibold">Chọn thao tác</h2>
            </div>
            <div className="p-4">
              <div className="flex flex-col space-y-3">
                <button
                  className="
                    w-full
                    text-left
                    px-3 py-2
                    rounded
                    bg-green-500
                    text-white
                    hover:bg-green-600
                    transition-transform
                    transform hover:scale-[1.03]
                  "
                  onClick={handleEditClick}
                >
                  Sửa
                </button>
                <button
                  className="
                    w-full
                    text-left
                    px-3 py-2
                    rounded
                    bg-red-500
                    text-white
                    hover:bg-red-600
                    transition-transform
                    transform hover:scale-[1.03]
                  "
                  onClick={handleDeleteClick}
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal sửa nội dung */}
      {showEditModal && (
        <EditModal
          message={message}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveEdit}
        />
      )}
    </>
  );
}
