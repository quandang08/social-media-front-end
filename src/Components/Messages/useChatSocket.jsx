import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useCallback, useEffect, useRef, useState } from "react";

const createStompClient = (
  socket,
  userId,
  onMessageReceived,
  setIsConnected,
  stompClientRef
) => {
  return new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    onConnect: () => {
      console.log("🟢 WebSocket đã kết nối!");
      setIsConnected(true);

      const endpoint = `/queue/chat.${userId}`;
      const subscription = stompClientRef.current.subscribe(
        endpoint,
        (message) => {
          console.log("📨 Nhận tin nhắn realtime:", message);
          try {
            const data = JSON.parse(message.body);
            onMessageReceived(data);
          } catch (err) {
            console.error("❌ Lỗi parse tin nhắn:", err);
          }
        }
      );

      console.log("🔔 Đã subscribe vào kênh:", subscription.id);
    },
    onStompError: (frame) => {
      console.error("❌ Lỗi STOMP:", frame.headers.message);
    },
    onDisconnect: () => {
      console.log("🔴 Ngắt kết nối WebSocket");
      setIsConnected(false);
    },
  });
};

export default function useChatSocket(userId, onMessageReceived) {
  const stompClientRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!userId) return;

    console.log("🟡 Đang kết nối WebSocket...", userId);
    const socket = new SockJS("http://localhost:5454/ws");

    const stompClient = createStompClient(
      socket,
      userId,
      onMessageReceived,
      setIsConnected,
      stompClientRef
    );
    stompClientRef.current = stompClient;
    stompClient.activate();

    return () => {
      console.log("🧹 Dọn dẹp kết nối WebSocket");
      stompClient.deactivate();
    };
  }, [userId, onMessageReceived]);

  const sendMessage = useCallback(
    (message) => {
      if (!isConnected) {
        console.warn("⚠️ WebSocket chưa kết nối, không thể gửi");
        return false;
      }

      console.log("📤 Đang gửi tin nhắn:", message);
      stompClientRef.current.publish({
        destination: `/app/chat.sendMessage`,
        body: JSON.stringify(message),
        headers: { "content-type": "application/json" },
      });
      return true;
    },
    [isConnected]
  );

  const deleteMessage = useCallback(
    (message) => {
      if (!isConnected) {
        console.warn("⚠️ WebSocket chưa kết nối, không thể xóa");
        return false;
      }

      console.log("🗑️ Gửi yêu cầu xoá tin nhắn:", message);
      stompClientRef.current.publish({
        destination: `/app/chat.deleteMessage`,
        body: JSON.stringify(message),
        headers: { "content-type": "application/json" },
      });
      return true;
    },
    [isConnected]
  );

  return { sendMessage, deleteMessage, isConnected };
}
