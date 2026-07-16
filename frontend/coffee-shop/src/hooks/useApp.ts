import { useState, useEffect } from "react";
import { useWebSocket } from "./useWebSocket";
import type { Person } from "../interface/person";

export function useApp() {
  const { queue, isQueueLoading } = useWebSocket("ws://localhost:5001");
  const sessionId = localStorage.getItem("user");
  const currentUser = queue.find(
    (person: Person) => person.sessionId === sessionId
  );
  const [hasEntered, setHasEntered] = useState(false);
  const isAtFrontOfLine = queue.length > 0 && 
    queue[0]?.sessionId === currentUser?.sessionId

  useEffect(() => {
    const existingSessionId = localStorage.getItem("user");
    if (existingSessionId) return;

    const newSessionId = crypto.randomUUID();
    localStorage.setItem("user", newSessionId);

    fetch("http://localhost:5001/api/queue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: newSessionId }),
    });
}, []);

  function handleEnterShop(): void {
    setHasEntered(true);
  }

  async function handleLeaveShop(): Promise<void> {
    const newSessionId = crypto.randomUUID()
    localStorage.setItem("user", newSessionId)

    await fetch("http://localhost:5001/api/queue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: newSessionId }),
    })

    setHasEntered(false)
}

  return {
    isQueueLoading,
    queue,
    sessionId,
    currentUser,
    isAtFrontOfLine,
    hasEntered,
    setHasEntered,
    handleEnterShop,
    handleLeaveShop,
  };
}
