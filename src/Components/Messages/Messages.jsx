import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  FaSearch,
  FaEllipsisV,
  FaComments,
  FaUserFriends,
} from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import ChatBox from "./ChatBox";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Store/Auth/Action";

const Messages = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();

  // Lấy thông tin từ Redux
  const currentUser = useSelector((state) => state.auth.user);
  const allUsers = useSelector((state) => state.auth.allUsers) || [];

  // Sắp xếp danh sách user với useMemo để tránh tính toán lại không cần thiết
  const sortedUsers = useMemo(() => {
    return allUsers
      .filter((otherUser) => otherUser.id !== currentUser?.id)
      .sort(
        (a, b) =>
          new Date(b.lastMessageTime || 0) - new Date(a.lastMessageTime || 0)
      );
  }, [allUsers, currentUser]);

  // Load danh sách user khi component mount
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Sử dụng useCallback để tránh tạo lại hàm mỗi lần render
  const handleSelectUser = useCallback((otherUser) => {
    setSelectedUser(otherUser);
  }, []);

  // Render một user item
  const renderUserItem = useCallback((otherUser) => (
    <div
      key={otherUser.id}
      className="flex items-center justify-between py-3 border-b last:border-0 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => handleSelectUser(otherUser)}
    >
      <div className="flex items-center gap-3">
        <img
          src={otherUser.image || "/default-avatar.png"}
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <h2 className="font-semibold text-lg">
            Chat với {otherUser.fullName || "Người dùng"}
          </h2>
          <p className="text-sm text-gray-500 truncate max-w-xs">
            Last message preview...
          </p>
        </div>
      </div>
      <span className="text-xs text-gray-400 whitespace-nowrap">
        {otherUser.lastMessageTime
          ? new Date(otherUser.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : ""}
      </span>
    </div>
  ), [handleSelectUser]);

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6 relative">
        {selectedUser ? (
          <ChatBox user={selectedUser} onBack={() => setSelectedUser(null)} />
        ) : (
          <>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">
                Hello,{" "}
                <span className="text-[#14B8A6]">
                  {currentUser?.fullName}
                </span>
              </h1>
              <div className="flex items-center gap-3 text-gray-500">
                <FaSearch className="cursor-pointer hover:text-[#14B8A6] transition-colors" />
                <FaEllipsisV className="cursor-pointer hover:text-[#14B8A6] transition-colors" />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-4 mb-4">
              <button className="px-4 py-2 bg-[#14B8A6] text-white rounded-full shadow hover:bg-teal-600 transition-colors">
                All Chats
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-[#14B8A6] transition-colors">
                Groups
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-[#14B8A6] transition-colors">
                Contacts
              </button>
            </div>

            {/* Chat List */}
            <div className="bg-white shadow-md rounded-lg p-4 h-[70vh] overflow-y-auto">
              {sortedUsers.length > 0 ? (
                sortedUsers.map(renderUserItem)
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Không có cuộc trò chuyện nào
                </p>
              )}
            </div>
          </>
        )}
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 bg-[#14B8A6] text-white p-4 rounded-full shadow-lg hover:opacity-90 transition-opacity">
        <IoIosSend className="text-2xl" />
      </button>
    </div>
  );
};

export default React.memo(Messages);