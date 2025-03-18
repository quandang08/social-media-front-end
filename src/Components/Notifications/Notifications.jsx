import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications, markNotificationAsRead, deleteNotification } from "../../Store/Auth/Action";
import NotificationItem from "./NotificationItem";
import useNotifications from "../../Components/Notifications/useNotifications";

export default function Notifications() {
  const dispatch = useDispatch();
  
  // Lấy danh sách notifications từ state.auth.notifications
  const notifications = useSelector((state) => state.auth.notifications);
  const fallbackAvatar = useSelector((state) => state.auth.user?.image);
  const user = useSelector((state) => state.auth.user);
  const [localNotifs, setLocalNotifs] = useState([]);
  console.log("localNotifs:", localNotifs);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    if (notifications) {
      setLocalNotifs(notifications);
    }
  }, [notifications]);

  // Handler khi đánh dấu đã đọc
  const handleMarkAsRead = (id) => {
    dispatch(markNotificationAsRead(id));
  };

  // Handler khi xóa thông báo
  const handleDelete = (id) => {
    dispatch(deleteNotification(id));
    setLocalNotifs((prev) => prev.filter((notif) => notif.id !== id));
  };

  useNotifications(user?.id, (newNotification) => {
    setLocalNotifs((prev) => [newNotification, ...prev]);
  });
  return (
    <div className="p-6 space-y-4 ml-6">
      <h1 className="text-2xl font-bold mb-4 text-left">🔔 Notifications</h1>
      {localNotifs && localNotifs.length > 0 ? (
        localNotifs.map((notif) => (
          <NotificationItem
            key={notif.id}
            notification={notif}
            fallbackAvatar={fallbackAvatar}
            onMarkAsRead={handleMarkAsRead}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p className="text-gray-600 text-sm">No notifications</p>
      )}
    </div>
  );
}
