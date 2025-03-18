import React from "react";
import { Heart, UserPlus, MessageCircle, CheckCircle, Trash2 } from "lucide-react";

function NotificationItem({ notification, fallbackAvatar, onMarkAsRead, onDelete }) {
  const { id, type, user, content, time, read ,image} = notification;
  const displayAvatar = image || fallbackAvatar || "/default-avatar.png";

  return (
    <div
      className={`
        flex items-center gap-3 p-4 rounded-r-2xl shadow-md border transition w-[700px]
        ${read ? "bg-gray-100" : "bg-white border-l-4 border-l-blue-500 hover:bg-blue-50"}
      `}
    >
      <img
        src={displayAvatar}
        alt="avatar"
        className="w-12 h-12 rounded-full border"
      />
      <div className="flex-1 text-left">
        <p className="font-semibold text-gray-800">
          {user}{" "}
          {type === "like" && (
            <>
              đã thích bài viết của bạn{" "}
              <Heart className="inline text-red-500 w-4 h-4" />
            </>
          )}
          {type === "follow" && (
            <>
              đã theo dõi bạn{" "}
              <UserPlus className="inline text-blue-500 w-4 h-4" />
            </>
          )}
          {type === "comment" && (
            <>
              đã bình luận:{" "}
              <span className="italic">"{content}"</span>{" "}
              <MessageCircle className="inline text-green-500 w-4 h-4" />
            </>
          )}
        </p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>

      <div className="flex gap-2 ml-auto">
        {!read && (
          <button
            onClick={() => onMarkAsRead(id)}
            className="
              px-3 py-1
              rounded-md
              bg-gradient-to-r
              from-lime-400
              to-green-500
              hover:from-lime-500
              hover:to-green-600
              text-white
              font-medium
              flex
              items-center
              gap-1
              transition-colors
              duration-200
              focus:outline-none
              shadow-sm
            "
          >
            <CheckCircle className="w-4 h-4" /> Đã đọc
          </button>
        )}

        <button
          onClick={() => onDelete(id)}
          className="
            px-3 py-1
            rounded-md
            bg-gradient-to-r
            from-rose-400
            to-pink-500
            hover:from-rose-500
            hover:to-pink-600
            text-white
            font-medium
            flex
            items-center
            gap-1
            transition-colors
            duration-200
            focus:outline-none
            shadow-sm
          "
        >
          <Trash2 className="w-4 h-4" /> Xóa
        </button>
      </div>
    </div>
  );
}

export default NotificationItem;
