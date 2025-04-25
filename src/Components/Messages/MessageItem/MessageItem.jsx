import React, { useState, useRef } from "react";
import "./MessageItem.css";
import useChatSocket from "../useChatSocket";
import EditModal from "./EditModal";

function MessageItem({ message, isSender, onEdit, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const pressTimerRef = useRef(null);
  const { deleteMessage: deleteMessageSocket } = useChatSocket();

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
    onEdit({ ...message, content: newContent });
    setShowEditModal(false);
  };

  const handleDeleteClick = () => {
    setShowModal(false);
    deleteMessageSocket(message);
    if (typeof onDelete === "function") {
      onDelete(message.id);
    }
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
          className={`relative ${bubbleStyle} px-4 py-2 rounded-2xl max-w-xs shadow-md mb-2`}
          style={{ wordWrap: "break-word" }}
        >
          {message.messageType === "IMAGE" ? (
            <img src={message.content} alt="img" className="max-w-full h-auto rounded-md" />
          ) : (
            message.content
          )}
        </div>
      </div>

      {isSender && showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50 animate-fadeInOverlay">
          <div className="absolute inset-0" onClick={handleCloseModal}></div>
          <div className="relative w-72 bg-white/80 border border-white/40 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden animate-scaleUp">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 rounded-t-xl">
              <h2 className="text-lg font-semibold">Chọn thao tác</h2>
            </div>
            <div className="p-4">
              <div className="flex flex-col space-y-3">
                <button
                  className="w-full text-left px-3 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition-transform transform hover:scale-[1.03]"
                  onClick={handleEditClick}
                >
                  Sửa
                </button>
                <button
                  className="w-full text-left px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-transform transform hover:scale-[1.03]"
                  onClick={handleDeleteClick}
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

export default MessageItem;
