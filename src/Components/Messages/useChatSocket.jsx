import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useCallback, useEffect, useRef, useState } from "react";

export default function useChatSocket(userId, onMessageReceived) {
  const stompClientRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!userId) return;

    console.log("🟡 Đang kết nối WebSocket...", userId);
    const socket = new SockJS("http://localhost:5454/ws");

    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("🟢 WebSocket đã kết nối!");
        setIsConnected(true);

        // Subscribe to the topic for receiving messages
        var subcribe_chat_endpoint = `/queue/chat.${userId}`
        const subscription = stompClient.subscribe(
          subcribe_chat_endpoint,
          (message) => {
            console.log("📨 Nhận tin nhắn realtime:", message);
            if (message.body) {
              try {
                const receivedMessage = JSON.parse(message.body);
                onMessageReceived(receivedMessage);
              } catch (error) {
                console.error("❌ Lỗi parse tin nhắn:", error);
              }
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

    stompClientRef.current = stompClient;
    stompClient.activate();

    // Cleanup on unmount or userId change
    return () => {
      console.log("🧹 Dọn dẹp kết nối WebSocket");
      stompClient.deactivate();
    };
  }, [userId, onMessageReceived]);

  const sendMessage = useCallback((message) => {
    if (!stompClientRef.current?.connected) {
      console.warn("⚠️ WebSocket chưa kết nối, không thể gửi");
      return false;
    }

    console.log("📤 Đang gửi tin nhắn qua WebSocket:", message);
    stompClientRef.current.publish({
      destination: `/app/chat.sendMessage`,
      body: JSON.stringify(message),
      headers: { "content-type": "application/json" },
    });
    return true;
  }, []);

  return { sendMessage, isConnected };
}
