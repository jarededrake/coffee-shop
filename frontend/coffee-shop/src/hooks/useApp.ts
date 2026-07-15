import { useState, useEffect } from "react";
import { useWebSocket } from "./useWebSocket";
import type { Person } from "../interface/person";

export function useApp() {
  const { queue, isQueueLoading } = useWebSocket("ws://localhost:5001");
  const sessionId = localStorage.getItem("user");
  const currentUser = queue.find(
    (person: Person) => person.sessionId === sessionId
  );
  const isAtFrontOfLine = queue[0]?.sessionId === currentUser?.sessionId;
  const [hasEntered, setHasEntered] = useState(false);
  const [queueIsLoading, setQueueIsLoading] = useState(false);

  useEffect(() => {
    try {
      setQueueIsLoading(true)
      const existingSessionId = localStorage.getItem("user");
      if (existingSessionId) return;

      const newSessionId = crypto.randomUUID();
      localStorage.setItem("user", newSessionId);

      fetch("http://localhost:5001/api/queue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: newSessionId }),
      });

    } catch (error) {
      setQueueIsLoading(false)
    } finally {
      setQueueIsLoading(false)
    }
  }, []);

  function handleEnterShop(): void {
    setHasEntered(true);
  }

  function handleLeaveShop(): void {
    setHasEntered(false);
    window.location.href = "http://localhost:5173/";
  }

  return {
    isQueueLoading,
    queue,
    sessionId,
    currentUser,
    isAtFrontOfLine,
    hasEntered,
    queueIsLoading,
    handleEnterShop,
    handleLeaveShop,
  };
}
