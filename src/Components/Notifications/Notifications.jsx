import React from "react";
import { Heart, UserPlus, MessageCircle } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "like",
    user: "Nguyễn Văn A",
    avatar: "https://i.pravatar.cc/40?img=1",
    time: "5 phút trước",
    read: false,
  },
  {
    id: 2,
    type: "follow",
    user: "Trần Thị B",
    avatar: "https://i.pravatar.cc/40?img=2",
    time: "10 phút trước",
    read: false,
  },
  {
    id: 3,
    type: "comment",
    user: "Lê Văn C",
    avatar: "https://i.pravatar.cc/40?img=3",
    content: "Hay quá!",
    time: "15 phút trước",
    read: true,
  },
];

const NotificationItem = ({ notification }) => {
  return (
    <div
      className={`flex items-center justify-start p-4 rounded-2xl shadow-md border w-[700px]
      ${notification.read ? "bg-gray-100" : "bg-white hover:bg-blue-50"}`}
    >
      {/* Avatar */}
      <img
        src={notification.avatar}
        alt="Avatar"
        className="w-12 h-12 rounded-full border"
      />

      {/* Nội dung */}
      <div className="flex-1 px-3 text-left">
        <p className="font-semibold text-gray-800">
          {notification.user}{" "}
          {notification.type === "like" && (
            <>
              đã thích bài viết của bạn{" "}
              <Heart className="inline text-red-500 w-4 h-4" />
            </>
          )}
          {notification.type === "follow" && (
            <>
              đã theo dõi bạn{" "}
              <UserPlus className="inline text-blue-500 w-4 h-4" />
            </>
          )}
          {notification.type === "comment" && (
            <>
              đã bình luận:{" "}
              <span className="italic">"{notification.content}"</span>{" "}
              <MessageCircle className="inline text-green-500 w-4 h-4" />
            </>
          )}
        </p>
        <p className="text-xs text-gray-500">{notification.time}</p>
      </div>

      {/* Nút Follow nếu là thông báo follow */}
      {notification.type === "follow" && (
        <button className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600">
          Follow
        </button>
      )}
    </div>
  );
};

const Notifications = () => {
  return (
    <div className="p-6 space-y-4 ml-6">
      <h1 className="text-2xl font-bold mb-4 text-left">🔔 Notification</h1>
      {notifications.map((notif) => (
        <NotificationItem key={notif.id} notification={notif} />
      ))}
    </div>
  );
};

export default Notifications;
