import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useEffect } from 'react';

const SOCKET_URL = "http://localhost:5454/ws";

export default function useNotifications(userId, onNotificationReceived) {
  useEffect(() => {
    const socket = new SockJS(SOCKET_URL);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("WebSocket connected");
        stompClient.subscribe(`/topic/notifications/${userId}`, (message) => {
          if (message.body) {
            const notification = JSON.parse(message.body);
            console.log("Received notification:", notification);
            onNotificationReceived(notification);
          }
        });
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame);
      },
    });

    stompClient.activate(); // Kết nối

    return () => {
      stompClient.deactivate(); // Ngắt kết nối
    };
  }, [userId, onNotificationReceived]);
}
