import React from "react";
import {
  FaSearch,
  FaEllipsisV,
  FaComments,
  FaUserFriends,
} from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

const Messages = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-20 bg-white shadow-md flex flex-col justify-between py-4 items-center">
        {/* Logo / Icon chính */}
        <div className="text-[#14B8A6] text-2xl font-bold">
          <FaComments />
        </div>

        {/* Các icon menu (mở rộng tuỳ ý) */}
        <div className="flex flex-col gap-6">
          <button className="text-gray-400 hover:text-[#14B8A6]">
            <FaUserFriends size={20} />
          </button>
          <button className="text-gray-400 hover:text-[#14B8A6]">
            <FaSearch size={20} />
          </button>
          <button className="text-gray-400 hover:text-[#14B8A6]">
            <FaEllipsisV size={20} />
          </button>
        </div>

        {/* Avatar user */}
        <div className="w-10 h-10 rounded-full bg-gray-300" />
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">
            Hello, <span className="text-[#14B8A6]">Akamu</span>
          </h1>
          <div className="flex items-center gap-3 text-gray-500">
            <FaSearch className="cursor-pointer" />
            <FaEllipsisV className="cursor-pointer" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 mb-4">
          <button className="px-4 py-2 bg-[#14B8A6] text-white rounded-full shadow">
            All Chats
          </button>
          <button className="px-4 py-2 text-gray-600 hover:text-[#14B8A6]">
            Groups
          </button>
          <button className="px-4 py-2 text-gray-600 hover:text-[#14B8A6]">
            Contacts
          </button>
        </div>

        {/* Chat List Container */}
        <div className="bg-white shadow-md rounded-lg p-4 h-[70vh] overflow-y-auto">
          {[1, 2, 3, 4, 5, 6].map((user, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-3 border-b last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-300" />
                <div>
                  <h2 className="font-semibold">User {user}</h2>
                  <p className="text-sm text-gray-500">
                    Last message preview...
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-400">09:38 AM</span>
            </div>
          ))}
        </div>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 bg-[#14B8A6] text-white p-4 rounded-full shadow-lg hover:opacity-90">
        <IoIosSend className="text-2xl" />
      </button>
    </div>
  );
};

export default Messages;
