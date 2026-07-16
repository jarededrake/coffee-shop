import { useState, useEffect, useRef, useCallback } from "react";
import type { Person } from "../interface/person";

export const useWebSocket = (url: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [queue, setQueue] = useState<Person[]>([]);
  const [isQueueLoading, setIsQueueLoading] = useState(true); // ← starts true

  const socketRef = useRef(null);

  useEffect(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) return;

    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
      console.log("WebSocket connection opened");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "QUEUE_UPDATED") {
        setQueue(data.queue);
        setIsQueueLoading(false)
      }
    };

    socket.onclose = () => {
      setIsConnected(false);
      console.log("WebSocket connection closed");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error observed:", error);
    };

    return () => {
      socket.close();
    };
  }, [url]);

  const sendMessage = useCallback((message: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    } else {
      console.warn("WebSocket is not open. Cannot send message.");
    }
  }, []);

  return { isQueueLoading, setIsQueueLoading, isConnected, sendMessage, queue };
};
