import React, { useState, useEffect, useMemo } from "react";
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
  const [usersList, setUsersList] = useState([]);
  const dispatch = useDispatch();

  // Lấy thông tin người dùng đang đăng nhập từ Redux
  const currentUser = useSelector((state) => state.auth.user);
  const allUsers = useSelector((state) => state.auth.allUsers) || [];

  // Load danh sách user khi component mount
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Khi allUsers thay đổi, lưu vào state cục bộ
  useEffect(() => {
    setUsersList(allUsers);
  }, [allUsers]);

  // Sắp xếp danh sách user dựa trên lastMessageTime giảm dần (mới nhất lên trên)
  const sortedUsers = useMemo(() => {
    return usersList
      .filter((otherUser) => otherUser.id !== currentUser?.id)
      .sort(
        (a, b) =>
          new Date(b.lastMessageTime || 0) - new Date(a.lastMessageTime || 0)
      );
  }, [usersList, currentUser]);

  // Hàm xử lý khi chọn user để chat
  const handleSelectUser = (otherUser) => {
    // Cập nhật lại lastMessageTime cho user vừa chat thành thời gian hiện tại
    const updatedUsers = usersList.map((userItem) =>
      userItem.id === otherUser.id
        ? { ...userItem, lastMessageTime: new Date().toISOString() }
        : userItem
    );
    setUsersList(updatedUsers);
    setSelectedUser(otherUser);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-20 bg-white shadow-md flex flex-col justify-between py-4 items-center">
        <div className="text-[#14B8A6] text-2xl font-bold">
          <FaComments />
        </div>
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
        <div className="w-10 h-10 rounded-full bg-gray-300" />
      </aside>

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

            {/* Chat List: Hiển thị tất cả user */}
            <div className="bg-white shadow-md rounded-lg p-4 h-[70vh] overflow-y-auto">
              {sortedUsers.length > 0 ? (
                sortedUsers.map((otherUser) => (
                  <div
                    key={otherUser.id}
                    className="flex items-center justify-between py-3 border-b last:border-0 cursor-pointer"
                    onClick={() => handleSelectUser(otherUser)}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={otherUser.image || "/default-avatar.png"}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <div>
                        <h2 className="font-semibold text-lg">
                          Chat với {otherUser.fullName || "Người dùng"}
                        </h2>
                        <p className="text-sm text-gray-500">
                          Last message preview...
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">
                      {otherUser.lastMessageTime
                        ? new Date(otherUser.lastMessageTime).toLocaleTimeString()
                        : ""}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Không có user nào.</p>
              )}
            </div>
          </>
        )}
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 bg-[#14B8A6] text-white p-4 rounded-full shadow-lg hover:opacity-90">
        <IoIosSend className="text-2xl" />
      </button>
    </div>
  );
};

export default Messages;
