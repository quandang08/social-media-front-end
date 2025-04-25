import React from "react";
import { BsArrowLeft } from "react-icons/bs";

const ChatHeader = ({ user, onBack }) => {
  return (
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
  );
};

export default ChatHeader;
