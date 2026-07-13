import { useState, useEffect, useRef } from "react";
import "./App.css";
import Button from "./common/Button";
import { useWebSocket } from "./hooks/useWebSocket";
import ShoppingView from "./components/ShoppingView";
import EntranceScreen from "./components/EntranceScreen";
// TODO: Import your components here as you build them
// import { MenuScreen } from "./components/MenuScreen";
// import { WaitingScreen } from "./components/WaitingScreen";
// import { EntranceScreen } from "./components/EntranceScreen";

function App() {
  const { queue } = useWebSocket("ws://localhost:5001");
  const sessionId = localStorage.getItem("user");
  const currentUser = queue.find((person) => person.sessionId === sessionId);
  const isAtFrontOfLine = queue[0]?.sessionId === currentUser?.sessionId;

  const [hasEntered, setHasEntered] = useState(false);

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

  function handleEnterShop() {
    setHasEntered(true);
  }

  function handleLeaveShop() {
    setHasEntered(false);
  }

  return (
    <div className="app">
      {/* ── Left panel: queue sidebar ── */}
      <aside className="sidebar">
        <h2 className="sidebar__title">☕ Current Queue</h2>

        {queue.length === 0 ? (
          <p className="sidebar__empty">No one in line — walk right in!</p>
        ) : (
          <ul className="queue-list">
            {queue.map((person, index) => (
              <li
                key={person.sessionId}
                className={`queue-item ${
                  index === 0 ? "queue-item--active" : ""
                }`}
              >
                <span className="queue-item__position">#{index + 1}</span>
                <span className="queue-item__name">{person.name}</span>
              </li>
            ))}
          </ul>
        )}
      </aside>

      <main className="main">
        {!hasEntered && (
          <EntranceScreen
            onEnter={handleEnterShop}
            queueCount={queue.length}
            isAtFrontOfLine={isAtFrontOfLine}
          />
        )}

        {hasEntered && !isAtFrontOfLine && (
          <div className="waiting">
            <p>
              You are #{queue.findIndex((p) => p.sessionId === sessionId) + 1}
              in line
            </p>
            <p>Please wait your turn</p>
          </div>
        )}

        {hasEntered && isAtFrontOfLine && (
          <ShoppingView
            currentUser={currentUser}
            isFrontOfLine={isAtFrontOfLine}
            onLeaveShop={handleLeaveShop}
          />
        )}
      </main>
    </div>
  );
}

export default App;
